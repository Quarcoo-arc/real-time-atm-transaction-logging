const express = require("express");
const router = express.Router();
const { ensureLoggedIn, checkPIN } = require("../middleware/authentication");
const {
  accountBalanceService,
  accountInfoService,
} = require("../services/account");

router.post(
  "/account-balance",
  ensureLoggedIn,
  checkPIN,
  accountBalanceService
);

router.post("/account-info", ensureLoggedIn, checkPIN, accountInfoService);
