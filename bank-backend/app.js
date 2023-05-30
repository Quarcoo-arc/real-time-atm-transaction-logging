const crypto = require("node:crypto");
const { promisify } = require("util");
const asyncify = require("express-asyncify");
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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

/**
 * API Endpoints
 *
 * /register
 * payload - {email, password, name}
 * - create user account (a unique ID is returned upon account creation)
 * - create new data entry in database using the unique ID, name and default amount of GHC 0
 *
 * /login
 * payload - {email, password}
 * - make api call to firebase sign-in-with-email-and-password
 *
 * /deposit
 * payload - {amount}
 *
 * /withdraw
 * payload - {amount}
 *
 * /account-balance
 *
 * /account-info
 *
 * /pin-change
 * payload - {old_PIN, newPIN}
 *
 */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
