const { db } = require("../config");

// wiston logs transactions onto this database
const TransactionLogs = db.collection("transaction_logs");

module.exports = TransactionLogs;
