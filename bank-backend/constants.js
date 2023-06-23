const NO_ERROR = "no_error";
const TRANSACTION_TIMEOUT = "transaction_timeout";
const INTERNAL_SERVER_ERROR = "internal_server_error";
const CONNECTION_DISCONNECTED = "connection_disconnected";

const ERRORS = {
  NO_ERROR,
  TRANSACTION_TIMEOUT,
  INTERNAL_SERVER_ERROR,
  CONNECTION_DISCONNECTED,
};

let ERROR = ERRORS[NO_ERROR];

let ATM_BALANCE = 20000.0;
let ACTIVE_STAFF_NAME = "Michael Quarcoo";
let ACTIVE_STAFF_EMAIL = "michaelquarcoo04@gmail.com";

const updateActiveUserDetails = (name, email) => {
  ACTIVE_STAFF_NAME = name;
  ACTIVE_STAFF_EMAIL = email;
};

const updateAtmBalance = (newBal) => {
  ATM_BALANCE = newBal;
};

module.exports = {
  NO_ERROR,
  TRANSACTION_TIMEOUT,
  INTERNAL_SERVER_ERROR,
  CONNECTION_DISCONNECTED,
  ERROR,
  ERRORS,
  ATM_BALANCE,
  getActiveStaffName: () => ACTIVE_STAFF_NAME,
  getActiveStaffEmail: () => ACTIVE_STAFF_EMAIL,
  updateAtmBalance,
  updateActiveUserDetails,
};
