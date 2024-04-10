const passport = require("passport");
const User = require("../models/User");

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

module.exports = { ensureLoggedIn, authenticateLocal, checkPIN };
