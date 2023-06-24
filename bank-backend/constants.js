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

let ERROR = ERRORS[NO_ERROR];

let ATM_BALANCE = 20000.0;
let ACTIVE_STAFF_NAME = "Michael Quarcoo";
let ACTIVE_STAFF_EMAIL = "michaelquarcoo04@gmail.com";

const updateActiveUserDetails = (name, email) => {
  ACTIVE_STAFF_NAME = name;
  ACTIVE_STAFF_EMAIL = email;
};

const updateAtmBalance = (newBal) => {
  ATM_BALANCE = +newBal.toFixed(2);
};

module.exports = {
  NO_ERROR,
  TRANSACTION_TIMEOUT,
  INTERNAL_SERVER_ERROR,
  CONNECTION_DISCONNECTED,
  getCurrentError: () => ERROR,
  updateCurrentError: (val) => {
    ERROR = val;
  },
  ERRORS,
  getAtmBalance: () => +ATM_BALANCE.toFixed(),
  getActiveStaffName: () => ACTIVE_STAFF_NAME,
  getActiveStaffEmail: () => ACTIVE_STAFF_EMAIL,
  updateAtmBalance,
  updateActiveUserDetails,
};
