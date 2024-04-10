const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const counterSchema = new Schema({
  _id: { type: String, required: true },
  val: { type: Number, required: true },
});

const Counter = model("Counter", counterSchema);

// Initialize counter
const checkIfCounterExits = async () => {
  const counterExists = await Counter.findById("sequence").exec();
  if (!counterExists) {
    const counter = new Counter({ _id: "sequence", val: 100000 });
    counter.save();
  }
};

checkIfCounterExits();

const getNextSequenceVal = async (seq_id) => {
  const sequenceDoc = await Counter.findById(seq_id).exec();
  sequenceDoc.val += 1;
  await sequenceDoc.save();
  return sequenceDoc.val;
};

module.exports = { Counter, getNextSequenceVal };
