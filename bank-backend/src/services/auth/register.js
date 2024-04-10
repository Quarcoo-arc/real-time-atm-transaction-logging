const jwt = require("jsonwebtoken");
const { User } = require("../models");
const {
  registrationNotification,
  transporter,
} = require("../utils/notification");
const { authOptions } = require("../config");

const registrationService = async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      pin: req.body.pin,
    });

    const result = await user.save();

    const token = jwt.sign({ id: result.id }, process.env.JWT_SECRET, {
      expiresIn: 1000000,
      issuer: authOptions.issuer,
      audience: authOptions.audience,
    });

    req.user = {
      ...req.user,
      id: result.id,
      name: result.name,
      email: result.email,
    };

    res.json({
      success: true,
      data: { name: result.name, email: result.email },
      token,
    });
    // Send email upon successful account creation
    try {
      const mailOptions = {
        from: "no-reply@bank.com",
        to: result.email,
        subject: "Bank ATM Banking",
        html: registrationNotification(result.name),
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error, "Failed to send email");
        } else {
          console.log(`Email sent to ${result.email}`);
        }
      });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    res.send({
      success: false,
      error,
      message: "Sign up failed",
    });
  }
};

module.exports = registrationService;
