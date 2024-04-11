const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ERRORS } = require("../utils/contants");
const { getAmount, setAmount } = require("../utils/helpers");
require("mongoose-type-email");

const globalSchema = new Schema({
  _id: { type: String, required: true },
  currentError: {
    type: String,
    required: true,
    enum: [...Object.values(ERRORS)],
  },
  activeStaffEmail: {
    type: String,
    required: true,
    unique: true,
    work: mongoose.SchemaTypes.Email,
    home: mongoose.SchemaTypes.Email,
  },
  activeStaffName: { type: String, required: true },
  atmBalance: { type: Number, get: getAmount, set: setAmount },
});

const Global = model("Global", globalSchema);

// initialize Global variables
const globalVarsExist = async () => {
  const global = await Global.findById("globalVars").exec();
  if (!global) {
    const globalVars = new Global({
      _id: "globalVars",
      currentError: NO_ERROR,
      activeStaffEmail: "michaelquarcoo04@gmail.com",
      activeStaffName: "Michael Quarcoo",
      atmBalance: 4500.45,
    });
    globalVars.save();
  }
};

globalVarsExist();

module.exports = Global;
