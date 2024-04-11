const { User, Global } = require("../../models");
const { ERRORS } = require("../../utils/contants");
const { logTransaction } = require("../../utils/notification");
const { getNextSequenceVal } = require("../../models/Counter");

const depositService = async (req, res) => {
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
      globalVars.currentError !== ERRORS.NO_ERROR &&
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
      transactionId: await getNextSequenceVal(),
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
      transactionId: await getNextSequenceVal(),
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
};

module.exports = depositService;
