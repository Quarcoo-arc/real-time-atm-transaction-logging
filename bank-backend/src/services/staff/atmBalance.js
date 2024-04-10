const { Global } = require("../../models");

const getAtmBalance = async (req, res) => {
  try {
    const globalVars = await Global.findById("globalVars").exec();
    res.json({ success: true, data: { atmBalance: globalVars.atmBalance } });
  } catch (error) {
    res.json({ success: false, error: error.stack });
  }
};

const setAtmBalance = async (req, res) => {
  try {
    if (!req.body?.amount || isNaN(req.body.amount) || +req.body.amount < 0) {
      res.status(400);
      return res.json({
        success: false,
        error: "Invalid request body!",
      });
    }
    const globalVars = await Global.findById("globalVars").exec();
    globalVars.atmBalance = +globalVars.atmBalance + +req.body.amount;
    const result = await globalVars.save();

    return res.json({
      success: true,
      data: {
        atmBalance: result.atmBalance,
      },
    });
  } catch (error) {
    res.json({ success: false, error: error.stack });
  }
};

module.exports = { getAtmBalance, setAtmBalance };
