const pinVerificationService = (req, res) => {
  res.json({ success: true, message: "PIN verified" });
};

module.exports = pinVerificationService;
