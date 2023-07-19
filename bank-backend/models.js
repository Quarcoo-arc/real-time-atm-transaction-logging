const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { autoInc } = require("auto-increment-group");
const encryption = require("mongoose-bcrypt");
const uniqueValidator = require("mongoose-unique-validator");
require("mongoose-type-email");
require("dotenv").config();

mongoose.connect(process.env.mongodburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

/**
 * Database Models
 *
 * **User**
 * account no.
 * email
 * password
 * name
 * acc balance
 * ATM PIN
 *
 * **Transaction**
 * Transaction ID
 * Transaction type: Deposit/Withdrawal
 * Timestamp
 * Account No.
 * Amount
 * Status: Pending / Completed / Failed
 *
 * **Errors**
 * Transaction ID
 * Error Type: User / ATM / System
 * - User - Inadequate Funds
 * - ATM - Indadequate Funds
 * - System - System Malfunctioning
 *
 * **Globals**  - Static Variables
 * ATM Balance
 * Errors
 *
 * **Authorities**
 * Email
 * Passoword
 * IsActive (Active authority receives the email)
 *
 *
 *
 */

const getAmount = (num) => (num / 100).toFixed(2);
const setAmount = (num) => num * 100;

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

const transactionSchema = new Schema({
  id: String,
  accountNumber: { type: Number, required: true },
  type: { type: String, required: true, enum: ["deposit", "withdrawal"] },
  timestamp: { type: Date, default: Date.now },
  amount: { type: Number, get: getAmount, set: setAmount },
  status: { type: String, required: true, enum: ["completed", "failed"] },
  description: { type: String },
});

transactionSchema.plugin(autoInc, {
  field: "id",
  startAt: 100000,
  incrementBy: 1,
});

const Transaction = model("Transaction", transactionSchema);

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

module.exports = { User, Transaction, db, getNextSequenceVal };
