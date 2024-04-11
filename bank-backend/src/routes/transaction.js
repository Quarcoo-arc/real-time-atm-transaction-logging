const express = require("express");
const router = express.Router();
const { ensureLoggedIn, checkPIN } = require("../middleware/authentication");
const {
  depositService,
  withdrawalService,
} = require("../services/transaction");

router.post("/deposit", ensureLoggedIn, checkPIN, depositService);

router.post("/withdraw", ensureLoggedIn, checkPIN, withdrawalService);

module.exports = router;
