const session = require("express-session");
const connect_ensure_login = require("connect-ensure-login");
const MongoStore = require("connect-mongo");
const {
  db,
  User,
  getNextSequenceVal,
  Global,
  ERRORS,
  NO_ERROR,
  TransactionLogs,
} = require("./models.js");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const express = require("express");
const validator = require("email-validator");
const cors = require("cors");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { format, transports, createLogger } = require("winston");
require("winston-mongodb");

require("dotenv").config();

const ensureLogIn = connect_ensure_login.ensureLoggedIn;

const ensureLoggedIn = passport.authenticate("jwt", { session: false });

const app = express();

const port = 5000;

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;
options.issuer = process.env.JWT_ISSUER;
options.audience = process.env.JWT_AUDIENCE;

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(bodyParser.json());

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, cb) => {
      try {
        const user = await User.findOne({ email }).exec();
        const isAuthenticated = user
          ? await user.verifyPasswordSync(password, user.password)
          : false;
        cb(
          null,
          isAuthenticated
            ? { id: user._id, email: user.email, name: user.name }
            : false,
          { message: "Invalid username or password" }
        );
      } catch (error) {
        return cb(error);
      }
    }
  )
);

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.id);
      return user
        ? done(null, user)
        : done(null, false, { message: "User not found" });
    } catch (error) {
      return done(error);
    }
  })
);

app.use(passport.initialize());

const checkPIN = async (req, res, next) => {
  try {
    if (!req.body || !req.body.pin) {
      res.status(400);
      return res.json({
        success: false,
        error: "Bad request",
      });
    }
    const user = await User.findById(req.user.id).exec();

    const result = await user.verifyPinSync(req.body.pin, user.pin);

    if (!result) {
      res.status(400);
      return res.json({
        success: false,
        message: "Invalid PIN",
      });
    }
    next();
  } catch (error) {
    res.status(400);
    return res.json({
      success: false,
      error: error.stack,
    });
  }
};

const logTransaction = (info) => {
  const msg = info.message;
  delete info.message;
  info.timestamp = new Date();

  if (info.status === "failed") {
    log.error(msg, info);
  } else {
    log.info(msg, info);
  }
  io.emit("transaction", info);
};

const transportOptions = {
  db,
  collection: "transaction_logs",
  options: {
    useUnifiedTopology: true,
  },
  format: format.combine(
    // Convert logs to a json format
    format.json(),
    format.metadata({ fillExcept: ["message", "level", "label"] })
  ),
};

//Logger
const log = createLogger({
  transports: [new transports.MongoDB(transportOptions)],
});
// Send email
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected`);
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.get("/", (req, res) => {
  if (req.user) {
    res.send({ message: `Welcome ${req.user.name}` });
  } else {
    res.send({ message: "Not Logged In!" });
  }
});

app.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ success: false, message: "Login failed" });
      }

      const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
        expiresIn: 1000000,
        issuer: options.issuer,
        audience: options.audience,
      });
      return res.json({
        success: true,
        message: `${req.user.name}, you have been logged in successfully`,
        token,
      });

      // TODO: Send email upon login
    } catch (error) {
      res.json({
        success: false,
        error,
      });
    }
  }
);

app.post("/signup", async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      pin: req.body.pin, // TODO: Check to make sure pin is 4 digits
    });

    const result = await user.save();

    const token = jwt.sign({ id: result.id }, process.env.JWT_SECRET, {
      expiresIn: 1000000,
      issuer: options.issuer,
      audience: options.audience,
    });

    res.send({ success: true, data: result, token });
    // TODO: Send email upon successful account creation
  } catch (error) {
    res.send({
      success: false,
      error,
      message: "Sign up failed",
    });
  }
});

app.post("/deposit", ensureLoggedIn, checkPIN, async (req, res) => {
  /** TODO:   *
   * Transactions should be logged unto bank-atm-interface in real time
   *
   *
   */
  try {
    if (!req.body || !req.body.amount || isNaN(req.body.amount)) {
      res.status(400);
      return res.json({
        success: false,
        error: "Invalid request body!",
      });
    }

    const user = await User.findById(req.user.id);
    const globalVars = await Global.findById("globalVars").exec();
    if (
      globalVars.currentError !== NO_ERROR &&
      ERRORS[globalVars.currentError]
    ) {
      const err = globalVars.currentError
        .split("_")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");

      logTransaction({
        message: "Deposit failed",
        transactionId: await getNextSequenceVal("sequence"),
        accountNumber: user.accountNumber,
        type: "deposit",
        amount: req.body.amount,
        status: "failed",
        description: err,
      });

      res.status(500);
      return res.json({
        success: false,
        error: err,
      });
    }
    user.accountBalance = +user.accountBalance + +req.body.amount;
    const result = await user.save();

    globalVars.atmBalance = +globalVars.atmBalance + +req.body.amount;

    await globalVars.save();

    logTransaction({
      message: "Deposit successful",
      transactionId: await getNextSequenceVal("sequence"),
      accountNumber: user.accountNumber,
      type: "deposit",
      amount: req.body.amount,
      status: "completed",
      description: "Operation complete",
    });

    res.send({ success: true, data: { currentBalance: user.accountBalance } });
  } catch (error) {
    const user = await User.findById(req.user.id);
    logTransaction({
      message: "Deposit failed",
      transactionId: await getNextSequenceVal("sequence"),
      accountNumber: user.accountNumber,
      type: "deposit",
      amount: req.body.amount,
      status: "failed",
      description: error.message ? error.message : "Internal Server Error",
    });

    res.json({
      success: false,
      error,
    });
  }
});

app.post("/withdraw", ensureLoggedIn, checkPIN, async (req, res) => {
  try {
    if (
      !req.body ||
      !req.body.amount ||
      isNaN(req.body.amount) ||
      +req.body.amount < 0
    ) {
      res.status(400);
      return res.json({
        success: false,
        error: "Invalid request body!",
      });
    }

    const user = await User.findById(req.user.id).exec();
    if (+req.body.amount > +user.accountBalance) {
      logTransaction({
        message: "Withdrawal failed",
        transactionId: await getNextSequenceVal("sequence"),
        accountNumber: user.accountNumber,
        type: "withdrawal",
        amount: req.body.amount,
        status: "failed",
        description: "Insufficient user funds",
      });

      res.status(400);
      return res.json({
        success: false,
        error: "Insufficient User Funds",
      });
    }
    const globalVars = await Global.findById("globalVars").exec();
    if (+req.body.amount > globalVars.atmBalance) {
      logTransaction({
        message: "Withdrawal failed",
        transactionId: await getNextSequenceVal("sequence"),
        accountNumber: user.accountNumber,
        type: "withdrawal",
        amount: req.body.amount,
        status: "failed",
        description: "Insufficient ATM funds",
      });

      res.status(500);
      return res.json({
        success: false,
        error: "Insufficient ATM Funds",
      });
    }
    if (
      globalVars.currentError !== NO_ERROR &&
      ERRORS[globalVars.currentError]
    ) {
      const err = globalVars.currentError
        .split("_")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");

      logTransaction({
        message: "Withdrawal failed",
        transactionId: await getNextSequenceVal("sequence"),
        accountNumber: user.accountNumber,
        type: "withdrawal",
        amount: req.body.amount,
        status: "failed",
        description: err,
      });

      res.status(500);
      return res.json({
        success: false,
        error: err,
      });
    }
    user.accountBalance = +user.accountBalance - +req.body.amount;
    const result = await user.save();

    globalVars.atmBalance = +globalVars.atmBalance - +req.body.amount;
    await globalVars.save();

    logTransaction({
      message: "Withdrawal successful",
      transactionId: await getNextSequenceVal("sequence"),
      accountNumber: user.accountNumber,
      type: "withdrawal",
      amount: req.body.amount,
      status: "completed",
      description: "Operation complete",
    });

    res.send({ success: true, data: { currentBalance: user.accountBalance } });
  } catch (error) {
    const user = await User.findById(req.user.id);
    logTransaction({
      message: "Withdrawal failed",
      transactionId: await getNextSequenceVal("sequence"),
      accountNumber: user.accountNumber,
      type: "withdrawal",
      amount: req.body.amount,
      status: "failed",
      description: error.message ? error.message : "Internal Server Error",
    });

    res.status(500);
    res.json({
      success: false,
      error,
    });
  }
});

app.post("/account-balance", ensureLoggedIn, checkPIN, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      succes: true,
      data: {
        accountBalance: user.accountBalance,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});

app.post("/account-info", ensureLoggedIn, checkPIN, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      success: true,
      data: {
        name: user.name,
        accountNumber: user.accountNumber,
        accountBalance: user.accountBalance,
        email: user.email,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});

app.post("/change-pin", ensureLoggedIn, checkPIN, async (req, res) => {
  try {
    if (!req.body || !req.body.newPIN) {
      res.status(400);
      return res.json({
        success: false,
        error: "Bad request",
      });
    }
    if (
      !Number.isInteger(+req.body.newPIN) ||
      req.body.newPIN.toString().length !== 4
    ) {
      res.status(400);
      return res.json({
        success: false,
        error: "PIN should be a sequence of 4 digits",
      });
    }
    const user = await User.findById(req.user.id).exec();

    user.pin = req.body.newPIN;
    const saved = await user.save();
    if (saved) {
      res.send({
        success: true,
        message: "PIN was changed successfully",
      });
    } else {
      res.send({
        success: false,
        message: "PIN change was not successful",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      error: error.stack,
    });
  }
});

app.post("/verify-pin", ensureLoggedIn, checkPIN, (req, res) => {
  res.json({ success: true, message: "PIN verified" });
});

app.get("/active-staff", async (req, res) => {
  try {
    const globalInfo = await Global.findById("globalVars").exec();
    res.json({
      success: true,
      data: {
        name: globalInfo.activeStaffName,
        email: globalInfo.activeStaffEmail,
      },
    });
  } catch (error) {
    res.json({ success: false, error: error.stack });
  }
});

app.post("/active-staff", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;

    if (!name || !email) {
      res.status(400);
      return res.json({ success: false, message: "Invalid request body" });
    }

    if (!validator.validate(email)) {
      res.status(400);
      return res.json({ success: false, message: "Invalid email address" });
    }

    const globalInfo = await Global.findOneAndUpdate(
      { _id: "globalVars" },
      { activeStaffEmail: email, activeStaffName: name }
    ).exec();

    res.json({
      success: true,
      data: {
        name,
        email,
      },
      message: "Successfully updated active staff details",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to update active staff details",
      error: error.stack,
    });
  }
});

app.get("/current-error", async (req, res) => {
  try {
    const globalVars = await Global.findById("globalVars").exec();
    res.json({ success: true, data: { error: globalVars.currentError } });
  } catch (error) {
    res.json({
      success: false,
      error: error.stack,
      message: "Something went wrong",
    });
  }
});

app.post("/current-error", async (req, res) => {
  try {
    if (!req.body?.error || !ERRORS[req.body.error]) {
      res.status(400);
      return res.json({ success: false, message: "Invalid request body" });
    }
    const globalVars = await Global.findById("globalVars").exec();
    globalVars.currentError = ERRORS[req.body.error];
    const result = await globalVars.save();
    res.json({ success: true, data: { currentError: result.currentError } });
  } catch (error) {
    return res.json({
      success: false,
      error: error.stack,
      message: "Something went wrong",
    });
  }
});

app.get("/atm-balance", async (req, res) => {
  try {
    const globalVars = await Global.findById("globalVars").exec();
    res.json({ success: true, data: { atmBalance: globalVars.atmBalance } });
  } catch (error) {
    res.json({ success: false, error: error.stack });
  }
});

app.post("/atm-balance", async (req, res) => {
  try {
    if (!req.body?.amount || isNaN(req.body.amount) || +req.body.amount < 0) {
      res.status(400);
      return res.json({
        success: false,
        error: "Invalid request body!",
      });
    }
    const globalVars = await Global.findById("globalVars").exec();
    globalVars.atmBalance = +globalVars.atmBalance + +req.body.amount;
    const result = await globalVars.save();

    return res.json({
      success: true,
      data: {
        atmBalance: result.atmBalance,
      },
    });
  } catch (error) {
    res.json({ success: false, error: error.stack });
  }
});

app.get("/logs", async (req, res) => {
  try {
    const data = await TransactionLogs.find({})
      .sort({ "meta.timestamp": -1 })
      .toArray();
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.json({ success: false, error: error.stack });
  }
});

app.post("/logs/filter", async (req, res) => {
  try {
    const searchQuery = req.body.searchString;
    const regex = new RegExp(searchQuery, "i");
    const isValidDate = !isNaN(Date.parse(searchQuery));
    const data = await TransactionLogs.find(
      isValidDate
        ? { "meta.timestamp": { $gte: new Date(searchQuery) } }
        : {
            $or: [
              { "meta.accountNumber": regex },
              {
                $where: `function() {return this.meta.transactionId.toString().match(/${+searchQuery}/) != null;}`,
              },
              { "meta.amount": { $gte: +searchQuery } },
              { "meta.status": regex },
              { "meta.type": regex },
              { "meta.description": regex },
            ],
          }
    )
      .sort({ "meta.timestamp": -1 })
      .toArray();
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.json({ success: false, error: error.stack });
  }
});

app.use((req, res, next) => next(createError(401)));

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = err;
  res.status(err.status || 500);
  res.json({ success: false, error: err });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
