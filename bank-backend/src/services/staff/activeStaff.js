const { Global } = require("../../models");
const validator = require("email-validator");

const getActiveStaff = async (req, res) => {
  try {
    const globalInfo = await Global.findById("globalVars").exec();
    res.json({
      success: true,
      data: {
        name: globalInfo.activeStaffName,
        email: globalInfo.activeStaffEmail,
      },
    });
  } catch (error) {
    res.json({ success: false, error: error.stack });
  }
};

const setActiveStaff = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;

    if (!name || !email) {
      res.status(400);
      return res.json({ success: false, message: "Invalid request body" });
    }

    if (!validator.validate(email)) {
      res.status(400);
      return res.json({ success: false, message: "Invalid email address" });
    }

    const globalInfo = await Global.findOneAndUpdate(
      { _id: "globalVars" },
      { activeStaffEmail: email, activeStaffName: name }
    ).exec();

    res.json({
      success: true,
      data: {
        name,
        email,
      },
      message: "Successfully updated active staff details",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to update active staff details",
      error: error.stack,
    });
  }
};

module.exports = { getActiveStaff, setActiveStaff };
