const tokenVerificationService = (req, res) => {
  res.json({ success: true, message: "Token is valid" });
};

module.exports = tokenVerificationService;
