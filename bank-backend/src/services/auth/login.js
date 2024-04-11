const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { transporter } = require("../../utils/notification");
const { loginNotification } = require("../../utils/templates");
const { authOptions } = require("../../config");

const loginService = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Login failed" });
    }

    const user = await User.findById(req.user.id).exec();

    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: 1000000,
      issuer: authOptions.issuer,
      audience: authOptions.audience,
    });
    res.json({
      success: true,
      data: { name: user.name, email: user.email },
      message: `${req.user.name}, you have been logged in successfully`,
      token,
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }

  // Send email upon login
  try {
    const mailOptions = {
      from: "no-reply@bank.com",
      to: req.user.email,
      subject: "Bank ATM Banking",
      html: loginNotification(req.user.name),
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Failed to send email: ", error);
      } else {
        console.log(`Email sent to ${req.user.email}`);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = loginService;
