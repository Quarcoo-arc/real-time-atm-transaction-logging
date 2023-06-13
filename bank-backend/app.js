const crypto = require("node:crypto");
const { promisify } = require("util");
const asyncify = require("express-asyncify");
const session = require("express-session");
const connect_ensure_login = require("connect-ensure-login");
const MongoStore = require("connect-mongo");
const { db, User } = require("./models.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const express = require("express");

require("dotenv").config();

const ensureLogIn = connect_ensure_login.ensureLoggedIn;

const ensureLoggedIn = ensureLogIn();

const app = asyncify(express());

const port = 5000;

const SESSOIN_COOKIE_MAX_AGE_IN_MS = 5 * 60 * 1000; // 5 minutes

app.use(bodyParser.json());

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));

const verifyPassword = (password, encryptedPassword) =>
  User.encryptPassword(password, (err, encrtyptedText) => {
    if (err) {
      return false;
    } else {
      return encryptedPassword === encrtyptedText;
    }
  });

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, cb) => {
      const user = await User.findOne({ email }).exec();
      const isAuthenticated = user
        ? verifyPassword(password, user.password)
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
      pin: req.body.pin,
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
  try {
    if (!req.body || !req.body.amount) {
      res.status(400);
      res.json({
        success: false,
        error: "Invalid request body!",
      });
    }

    const user = await User.findById(req.user.id);
    user.accountBalance = +user.accountBalance + req.body.amount;
    const result = await user.save();
    res.send({ success: true, data: result });
  } catch (error) {
    res.json({
      success: false,
      error,
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
