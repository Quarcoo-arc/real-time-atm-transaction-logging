const express = require("express");
const router = express.Router();
const {
  authenticateLocal,
  ensureLoggedIn,
  checkPIN,
} = require("../middleware/authentication");
const {
  loginService,
  registrationService,
  pinChangeService,
  pinVerificationService,
  tokenVerificationService,
  forgotPasswordService,
  resetPasswordService,
} = require("../services/auth");

router.post("/login", authenticateLocal, loginService);

router.post("/signup", registrationService);

router.post("/change-pin", ensureLoggedIn, checkPIN, pinChangeService);

router.post("/verify-pin", ensureLoggedIn, checkPIN, pinVerificationService);

router.get("/verify-token", ensureLoggedIn, tokenVerificationService);

router.post("/forgot-password", forgotPasswordService);

router.post("/password-reset", resetPasswordService);

module.exports = router;
