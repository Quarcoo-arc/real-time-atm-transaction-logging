const session = require("express-session");
const connect_ensure_login = require("connect-ensure-login");
const MongoStore = require("connect-mongo");
const { db, User, Transaction } = require("./models.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const express = require("express");

require("dotenv").config();

const ensureLogIn = connect_ensure_login.ensureLoggedIn;

const ensureLoggedIn = ensureLogIn();

const app = express();

const port = 5000;

const SESSOIN_COOKIE_MAX_AGE_IN_MS = 5 * 60 * 1000; // 5 minutes

app.use(bodyParser.json());

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, cb) => {
      const user = await User.findOne({ email }).exec();
      const isAuthenticated = user
        ? await user.verifyPasswordSync(password, user.password)
        : false;
      cb(
        null,
        isAuthenticated
          ? { id: user._id, email: user.email, name: user.name }
          : false
      );
    }
  )
);

app.use(passport.initialize());

app.use(
  session({
    secret: process.env.SESSION_COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.mongodburl,
      ttl: SESSOIN_COOKIE_MAX_AGE_IN_MS,
    }),
  })
);

app.use(passport.authenticate("session"));

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

app.get("/", (req, res) => {
  if (req.user) {
    res.send(`Welcome ${req.user.name}`);
  } else {
    res.send("Not Logged In!");
  }
});

app.post(
  "/login",
  passport.authenticate("local", { failureMessage: true }),
  (req, res) => {
    res.send(`${req.user.name}, you have been logged in successfully`);
    // TODO: Send email upon login
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

    res.send(result);
    // TODO: Send email upon successful account creation
  } catch (error) {
    res.send({
      success: false,
      error,
    });
  }
});

app.post("/deposit", ensureLoggedIn, async (req, res) => {
  /** TODO:
   * Upon a failed deposit, a transaction document should be created with
   * the transaction details.
   *
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
    user.accountBalance = +user.accountBalance + +req.body.amount;
    const result = await user.save();

    const transaction = new Transaction({
      accountNumber: user.accountNumber,
      type: "deposit",
      amount: req.body.amount,
      status: "completed",
      description: "Operation complete",
    });
    await transaction.save();

    res.send({ success: true, data: { currentBalance: user.accountBalance } });
  } catch (error) {
    const user = await User.findById(req.user.id);
    const transaction = new Transaction({
      accountNumber: user.accountNumber,
      type: "deposit",
      amount: req.body.amount,
      status: "failed",
      description: error.message ? error.message : "Internal Server Error",
    });
    await transaction.save();
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
      const transaction = new Transaction({
        accountNumber: user.accountNumber,
        type: "withdrawal",
        amount: req.body.amount,
        status: "failed",
        description: "Insufficient Funds",
      });
      await transaction.save();

      res.status(400);
      return res.json({
        success: false,
        error: "Insufficient Funds",
      });
    }
    user.accountBalance = +user.accountBalance - +req.body.amount;
    const result = await user.save();

    const transaction = new Transaction({
      accountNumber: user.accountNumber,
      type: "withdrawal",
      amount: req.body.amount,
      status: "completed",
      description: "Operation complete",
    });
    await transaction.save();
    res.send({ success: true, data: { currentBalance: user.accountBalance } });
  } catch (error) {
    const user = await User.findById(req.user.id);
    const transaction = new Transaction({
      accountNumber: user.accountNumber,
      type: "withdrawal",
      amount: req.body.amount,
      status: "failed",
      description: error.message ? error.message : "Internal Server Error",
    });
    await transaction.save();
    res.status(500);
    res.json({
      success: false,
      error,
    });
  }
});

app.get("/account-balance", ensureLoggedIn, checkPIN, async (req, res) => {
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

app.get("/account-info", ensureLoggedIn, checkPIN, async (req, res) => {
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

/**
 * API Endpoints
 *
 * /register
 * payload - {email, password, name}
 * - create user account (a unique ID is returned upon account creation)
 * - create new data entry in database using the unique ID, name and default amount of GHC 0
 *
 * /login
 * payload - {email, password}
 * - make api call to firebase sign-in-with-email-and-password
 *
 * /deposit
 * payload - {amount}
 *
 * /withdraw
 * payload - {amount}
 *
 * /account-balance
 *
 * /account-info
 *
 * /pin-change
 * payload - {old_PIN, newPIN}
 *
 */

app.use((req, res, next) => next(createError(401)));

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = err;
  res.status(err.status || 500);
  res.json({ success: false, error: err });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
