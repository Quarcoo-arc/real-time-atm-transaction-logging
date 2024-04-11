const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { autoInc } = require("auto-increment-group");
const encryption = require("mongoose-bcrypt");
const uniqueValidator = require("mongoose-unique-validator");
const { getAmount, setAmount } = require("../utils/helpers");
require("mongoose-type-email");

const userSchema = new Schema({
  accountNumber: String,
  email: {
    type: String,
    required: true,
    unique: true,
    work: mongoose.SchemaTypes.Email,
    home: mongoose.SchemaTypes.Email,
  },
  password: { type: String, required: true, bcrypt: true }, // Should be encrypted
  name: { type: String, required: true },
  accountBalance: { type: Number, default: 0, get: getAmount, set: setAmount },
  pin: { type: String, required: true, bcrypt: true }, // Encrypted 4 digit sequence
});

userSchema.plugin(autoInc, {
  field: "accountNumber",
  startAt: 120000000000,
  incrementBy: 1,
  unique: true,
});

userSchema.plugin(encryption);
userSchema.plugin(uniqueValidator);

const User = model("User", userSchema);

module.exports = User;
