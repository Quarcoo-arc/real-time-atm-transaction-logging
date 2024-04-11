const { User } = require("../models");

const accountBalanceService = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      success: true,
      data: {
        accountBalance: user.accountBalance,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
};

const accountInfoService = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      success: true,
      data: {
        name: user.name,
        accountNumber: user.accountNumber,
        accountBalance: user.accountBalance,
        email: user.email,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
};

module.exports = { accountBalanceService, accountInfoService };
