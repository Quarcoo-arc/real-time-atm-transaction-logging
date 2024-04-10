const nodemailer = require("nodemailer");
const { emailTransportOptions } = require("../config");
const { ERROR_MESSAGES } = require("./contants");
const { Global } = require("../models");
const { errorNotification } = require("../utils/templates");
const { socket, db } = require("../config");
const { format, transports, createLogger } = require("winston");
require("winston-mongodb");

// Send email
const transporter = nodemailer.createTransport(emailTransportOptions);

const transportOptions = {
  db,
  collection: "transaction_logs",
  options: {
    useUnifiedTopology: true,
  },
  format: format.combine(
    // Convert logs to a json format
    format.json(),
    format.metadata({ fillExcept: ["message", "level", "label"] })
  ),
};

//Logger
const log = createLogger({
  transports: [new transports.MongoDB(transportOptions)],
});

const logTransaction = async (info) => {
  const msg = info.message;
  delete info.message;
  info.timestamp = new Date();

  if (info.status === "failed") {
    log.error(msg, info);
    if (info.description !== ERROR_MESSAGES.INSUFFICIENT_USER_FUNDS) {
      // Send active staff an email
      try {
        const globalVars = await Global.findById("globalVars").exec();
        const staffEmail = globalVars.activeStaffEmail;
        const staffName = globalVars.activeStaffName;
        const mailOptions = {
          from: "no-reply@bank.com",
          to: staffEmail,
          subject: "Bank ATM Banking - Error Notification",
          html: errorNotification(
            staffName,
            info.transactionId,
            info.description
          ),
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(
              "Failed to send notification of error to active staff email: ",
              error
            );
          }
        });
      } catch (error) {
        console.log(
          "Failed to send notification of error to active staff email: ",
          error
        );
      }
    }
  } else {
    log.info(msg, info);
  }
  socket.emit("transaction", info);
};

module.exports = { transporter, logTransaction, log };
