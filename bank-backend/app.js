const {
  db,
  User,
  getNextSequenceVal,
  Global,
  ERRORS,
  NO_ERROR,
  TransactionLogs,
  ResetToken,
  connectDB,
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

const app = express();

const port = process.env.PORT || 5000;

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

const authenticateJWT = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res
        .status(401)
        .json({ error: "Unauthorized", message: "Authentication failed." });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

const ensureLoggedIn = authenticateJWT;

const authenticateLocal = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Incorrect username or password.",
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

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

const logTransaction = async (info) => {
  const msg = info.message;
  delete info.message;
  info.timestamp = new Date();

  if (info.status === "failed") {
    log.error(msg, info);
    if (info.description !== "Insufficient user funds") {
      // Send active staff an email
      try {
        const globalVars = await Global.findById("globalVars").exec();
        const staffEmail = globalVars.activeStaffEmail;
        const staffName = globalVars.activeStaffName;
        const mailOptions = {
          from: "no-reply@bank.com",
          to: staffEmail,
          subject: "Bank ATM Banking - Error Notification",
          html: `<html lang="en">
  <head>
    <title>Bank ATM Banking</title>
    <style>
      body {
        font-family: "Poppins", Verdana, Geneva, Tahoma, sans-serif;
        position: relative;
        height: 100%;
        font-size: 1.2rem;
      }
      .container {
        width: fit-content;
        max-width: 80%;
        margin: 2rem auto;
        background-color: #537188;
        color: white;
        padding: 4rem;
      }
      h1,
      h4,
      span {
        color: #e1d4bb;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>😢 Oops Another Failed Transaction</h1>
      <p>Hi ${staffName}!</p>
      <p>
        The transaction with ID <span>${info.transactionId}</span> failed with a
        <span>${info.description}</span> error at the ATM.
      </p>
      <p>Kindly look into it ASAP.</p>

      <br />
      <p>Fast, Reliable and Affordable <span>Banking</span> You can Trust</p>
    </div>
  </body>
</html>
          
          `,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(
              "Failed to send notification of error to active staff email: ",
              error
            );
          }
        });
      } catch (error) {
        console.log(
          "Failed to send notification of error to active staff email: ",
          error
        );
      }
    }
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

app.post("/login", authenticateLocal, async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Login failed" });
    }

    const user = await User.findById(req.user.id).exec();

    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: 1000000,
      issuer: options.issuer,
      audience: options.audience,
    });
    res.json({
      success: true,
      data: { name: user.name, email: user.email },
      message: `${req.user.name}, you have been logged in successfully`,
      token,
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }

  // Send email upon login
  try {
    const mailOptions = {
      from: "no-reply@bank.com",
      to: req.user.email,
      subject: "Bank ATM Banking",
      html: `
  <head>
    <title>Bank ATM Banking</title>
    <style>
      body {
        font-family: "Poppins", Verdana, Geneva, Tahoma, sans-serif;
        position: relative;
        height: 100%;
        font-size: 1.2rem;
      }
      .container {
        width: fit-content;
        max-width: 80%;
        margin: 2rem auto;
        background-color: #537188;
        color: white;
        padding: 4rem;
      }
      h1,
      h4,
      span,
      a {
        color: #e1d4bb !important;
      }
      a {
        text-decoration: none;
      }
      a:hover {
        color: #c2993a;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Bank ATM Banking</h1>
      <p>Hello ${req.user.name}</p>
      <p>We noticed a new login to your account.</p>

      <h4>If this was you</h4>
      <p>You can ignore this message. There's no need to take action</p>

      <h4>If this wasn't you</h4>
      <p>Someone may have access to your password, and or PIN.</p>
      <p>Complete these steps to secure your account:</p>
      <ul>
        <li>
          Reset your password.
          <ul>
            <li>
              Head over to the
              <a href="${process.env.bank_interface_url}/forgot-password"
                >Forgot password</a
              >
              page.
            </li>
            <li>Key in your email address</li>
            <li>A reset link will be sent to you</li>
          </ul>
        </li>
        <li>Check for any unauthorised transactions.</li>
        <li>You may also reset your pin.</li>
      </ul>
    </div>
  </body>
  </html>
  `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Failed to send email: ", error);
      } else {
        console.log(`Email sent to ${req.user.email}`);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/signup", async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      pin: req.body.pin,
    });

    const result = await user.save();

    const token = jwt.sign({ id: result.id }, process.env.JWT_SECRET, {
      expiresIn: 1000000,
      issuer: options.issuer,
      audience: options.audience,
    });

    req.user = {
      ...req.user,
      id: result.id,
      name: result.name,
      email: result.email,
    };

    res.json({
      success: true,
      data: { name: result.name, email: result.email },
      token,
    });
    // Send email upon successful account creation
    try {
      const mailOptions = {
        from: "no-reply@bank.com",
        to: result.email,
        subject: "Bank ATM Banking",
        html: `
  <head>
    <title>Bank ATM Banking</title>
    <style>
      body {
        font-family: "Poppins", Verdana, Geneva, Tahoma, sans-serif;
        position: relative;
        height: 100%;
        font-size: 1.2rem;
      }
      .container {
        width: fit-content;
        max-width: 80%;
        margin: 2rem auto;
        background-color: #537188;
        color: white;
        padding: 4rem;
      }
      h1,
      h4,
      span {
        color: #e1d4bb;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome to Bank ATM Banking 🎉</h1>
      <p>Congratulations ${result.name}!</p>
      <p>Your account was created successfully.</p>

      <br />
      <p>Fast, Reliable and Affordable <span>Banking</span> You can Trust</p>
    </div>
  </body>
</html>
  `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error, "Failed to send email");
        } else {
          console.log(`Email sent to ${result.email}`);
        }
      });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    res.send({
      success: false,
      error,
      message: "Sign up failed",
    });
  }
});

app.post("/deposit", ensureLoggedIn, checkPIN, async (req, res) => {
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
        data: { accountBalance: user.accountBalance },
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
      success: true,
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

app.get("/verify-token", ensureLoggedIn, (req, res) => {
  res.json({ success: true, message: "Token is valid" });
});

app.post("/forgot-password", async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.json({
        success: false,
        message: "Invalid request body",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = new ResetToken({
      userId: user._id,
    });

    const tokenObj = await resetToken.save();

    // Send email to user with link to password reset page & token id
    try {
      const mailOptions = {
        from: "no-reply@bank.com",
        to: user.email,
        subject: "Bank ATM Banking | Password Reset",
        html: `
  <head>
    <title>Bank ATM Banking | Password Reset</title>
    <style>
      body {
        font-family: "Poppins", Verdana, Geneva, Tahoma, sans-serif;
        position: relative;
        height: 100%;
        font-size: 1.2rem;
      }
      .container {
        width: fit-content;
        max-width: 80%;
        margin: 2rem auto;
        background-color: #537188;
        color: white;
        padding: 4rem;
      }
      h1,
      h4,
      span,
      a {
        color: #e1d4bb !important;
      }
      a {
        text-decoration: none;
      }
      a:hover {
        color: #c2993a;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Password Reset - Bank ATM Banking</h1>
      <p>Hi ${user.name}</p>
      <p>We received a password reset request for your account.</p>

      <h4>If this was not you</h4>
      <p>You can ignore this message. There's no need to take action</p>

      <h4>If this was you</h4>
      <p>
        Click
        <a href="${process.env.bank_interface_url}/password-reset?token=${tokenObj._id}"> here</a> to
        enter your new password.
      </p>
      <p>The link expires in 15 minutes.</p>
    </div>
  </body>
</html>
  `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error, "Failed to send link to email");
          res.json({
            success: false,
            message: "Failed to send link to your email",
          });
        } else {
          console.log(`Reset link sent to ${result.email}`);
          res.json({
            success: true,
            message: "Successfully sent link to your email",
          });
        }
      });
    } catch (error) {
      res.json({
        success: false,
        error,
        message: "Failed to send link to your email",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      error,
      message: "Failed to generate reset token",
    });
  }
});

app.post("/password-reset", async (req, res) => {
  try {
    const newPassword = req.body.newPassword;
    const tokenId = req.body.token;

    if (!newPassword || !tokenId) {
      return res.json({
        success: false,
        message: "Invalid request body",
      });
    }

    const resetToken = await ResetToken.findById(tokenId).exec();
    if (!resetToken) {
      return res.json({
        success: false,
        message: "Invalid reset token",
      });
    }
    const currDate = new Date();
    const expiryDate = new Date(resetToken.expiresAt);

    if (expiryDate < currDate) {
      return res.json({
        success: false,
        message: "Token has expired",
      });
    }
    const user = await User.findById(resetToken.userId).exec();
    user.password = newPassword;

    await user.save();

    await ResetToken.findByIdAndRemove(resetToken._id);

    return res.json({
      success: true,
      message: "Password update successful",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong",
      error: error.stack,
    });
  }
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

connectDB().then(() => {
  server.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
});
