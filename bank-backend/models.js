const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { autoInc } = require("auto-increment-group");
const encryption = require("mongoose-bcrypt");
const { v4: uuid } = require("uuid");
const uniqueValidator = require("mongoose-unique-validator");
require("mongoose-type-email");
require("dotenv").config();

mongoose.connect(process.env.mongodburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

const NO_ERROR = "NO_ERROR";
const TRANSACTION_TIMEOUT = "TRANSACTION_TIMEOUT";
const INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR";
const CONNECTION_DISCONNECTED = "CONNECTION_DISCONNECTED";

const ERRORS = {
  NO_ERROR,
  TRANSACTION_TIMEOUT,
  INTERNAL_SERVER_ERROR,
  CONNECTION_DISCONNECTED,
};

const getAmount = (num) => (num / 100).toFixed(2);
const setAmount = (num) => num * 100;

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

const globalVarsExist = async () => {
  const global = await Global.findById("globalVars").exec();
  return global;
};

if (!Promise.resolve(globalVarsExist())) {
  const globalVars = new Global({
    _id: "globalVars",
    currentError: NO_ERROR,
    activeStaffEmail: "michaelquarcoo04@gmail.com",
    activeStaffName: "Michael Quarcoo",
    atmBalance: 4500.45,
  });
  globalVars.save();
}

const userSchema = new Schema({
  accountNumber: String,
  email: {
    type: String,
    required: true,
    unique: true,
    work: mongoose.SchemaTypes.Email,
    home: mongoose.SchemaTypes.Email,
  }, // Todo: Check if email type is correct
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

const counterSchema = new Schema({
  _id: { type: String, required: true },
  val: { type: Number, required: true },
});

const Counter = model("Counter", counterSchema);

const counterExists = Promise.resolve(Counter.findById("sequence").exec());

if (!counterExists) {
  const counter = new Counter({ _id: "sequence", val: 100000 });
  counter.save();
}

const getNextSequenceVal = async (seq_id) => {
  const sequenceDoc = await Counter.findById(seq_id).exec();
  sequenceDoc.val += 1;
  await sequenceDoc.save();
  return sequenceDoc.val;
};

const TransactionLogs = db.collection("transaction_logs");

const resetTokenSchema = new mongoose.Schema({
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

const ResetToken = mongoose.model("ResetToken", resetTokenSchema);

module.exports = {
  User,
  Global,
  TransactionLogs,
  ResetToken,
  db,
  getNextSequenceVal,
  ERRORS,
  NO_ERROR,
};
