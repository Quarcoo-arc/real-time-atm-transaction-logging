const { ResetToken, User } = require("../../models");

const resetPasswordService = async (req, res) => {
  try {
    const newPassword = req.body.newPassword;
    const tokenId = req.body.token;

    if (!newPassword || !tokenId) {
      return res.json({
        success: false,
        message: "Invalid request body",
      });
    }

    const resetToken = await ResetToken.findById(tokenId).exec();
    if (!resetToken) {
      return res.json({
        success: false,
        message: "Invalid reset token",
      });
    }
    const currDate = new Date();
    const expiryDate = new Date(resetToken.expiresAt);

    if (expiryDate < currDate) {
      return res.json({
        success: false,
        message: "Token has expired",
      });
    }
    const user = await User.findById(resetToken.userId).exec();
    user.password = newPassword;

    await user.save();

    await ResetToken.findByIdAndRemove(resetToken._id);

    return res.json({
      success: true,
      message: "Password update successful",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong",
      error: error.stack,
    });
  }
};

module.exports = resetPasswordService;
