const loginService = require("./login");
const registrationService = require("./register");
const pinChangeService = require("./pinChange");
const pinVerificationService = require("./pinVerification");
const tokenVerificationService = require("./tokenVerification");
const forgotPasswordService = require("./forgotPassword");
const resetPasswordService = require("./resetPassword");

module.exports = {
  loginService,
  registrationService,
  pinChangeService,
  pinVerificationService,
  tokenVerificationService,
  forgotPasswordService,
  resetPasswordService,
};
