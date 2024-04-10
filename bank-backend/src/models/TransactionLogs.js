import { db } from "../config";

// wiston logs transactions onto this database
const TransactionLogs = db.collection("transaction_logs");

export default TransactionLogs;
