const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { v4: uuid } = require("uuid");
const uniqueValidator = require("mongoose-unique-validator");

const resetTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    default: () => uuid(),
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  expiresAt: {
    type: Date,
    default: function () {
      // Set the default expiration time to 15 minutes from the current time
      return new Date(Date.now() + 15 * 60 * 1000);
    },
    required: true,
  },
});
resetTokenSchema.plugin(uniqueValidator);

const ResetToken = model("ResetToken", resetTokenSchema);

module.exports = ResetToken;
