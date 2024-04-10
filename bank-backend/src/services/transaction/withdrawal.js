const { User, Global } = require("../models");
const { ERRORS } = require("../utils/contants");
const { logTransaction } = require("../utils/notification");
const { getNextSequenceVal } = require("../models/Counter");

const withdrawalService = async (req, res) => {
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
        transactionId: await getNextSequenceVal(),
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
        transactionId: await getNextSequenceVal(),
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
        transactionId: await getNextSequenceVal(),
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
      transactionId: await getNextSequenceVal(),
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
      transactionId: await getNextSequenceVal(),
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
};

module.exports = withdrawalService;
