const { User, ResetToken } = require("../../models");
const { transporter } = require("../../utils/notification");
const { resetPasswordNotification } = require("../../utils/templates");

const forgotPasswordService = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.json({
        success: false,
        message: "Invalid request body",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = new ResetToken({
      userId: user._id,
    });

    const tokenObj = await resetToken.save();

    // Send email to user with link to password reset page & token id
    try {
      const mailOptions = {
        from: "no-reply@bank.com",
        to: user.email,
        subject: "Bank ATM Banking | Password Reset",
        html: resetPasswordNotification(user.name, tokenObj._id),
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error, "Failed to send link to email");
          res.json({
            success: false,
            message: "Failed to send link to your email",
          });
        } else {
          console.log(`Reset link sent to ${result.email}`);
          res.json({
            success: true,
            message: "Successfully sent link to your email",
          });
        }
      });
    } catch (error) {
      res.json({
        success: false,
        error,
        message: "Failed to send link to your email",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      error,
      message: "Failed to generate reset token",
    });
  }
};

module.exports = forgotPasswordService;
