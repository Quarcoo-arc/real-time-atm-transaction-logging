const { Global } = require("../../models");
const { ERRORS } = require("../../utils/contants");

const getCurrentError = async (req, res) => {
  try {
    const globalVars = await Global.findById("globalVars").exec();
    res.json({ success: true, data: { error: globalVars.currentError } });
  } catch (error) {
    res.json({
      success: false,
      error: error.stack,
      message: "Something went wrong",
    });
  }
};

const setCurrentError = async (req, res) => {
  try {
    if (!req.body?.error || !ERRORS[req.body.error]) {
      res.status(400);
      return res.json({ success: false, message: "Invalid request body" });
    }
    const globalVars = await Global.findById("globalVars").exec();
    globalVars.currentError = ERRORS[req.body.error];
    const result = await globalVars.save();
    res.json({ success: true, data: { currentError: result.currentError } });
  } catch (error) {
    return res.json({
      success: false,
      error: error.stack,
      message: "Something went wrong",
    });
  }
};

module.exports = { getCurrentError, setCurrentError };
