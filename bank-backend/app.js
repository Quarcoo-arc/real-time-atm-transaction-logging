const crypto = require("node:crypto");
const { promisify } = require("util");
const asyncify = require("express-asyncify");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { db, User } = require("./models.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const express = require("express");

require("dotenv").config();

const app = asyncify(express());

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
    (email, password, cb) => {
      const user = User.find({ email }).exec();
      const isAuthenticated = user ? user.verifyPasswordSync(password) : false;
      cb(null, isAuthenticated ? isAuthenticated : false);
    }
  )
);

app.use(
  session({
    secret: process.env.SESSION_COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { secure: process.env.SESSION_COOKIE_IS_SECURE },
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
    console.log(result);
    res.send(result);
  } catch (error) {
    res.send({
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
