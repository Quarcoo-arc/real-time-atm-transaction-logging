const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");
const transactionRoutes = require("./transaction");

router.get("/", (req, res) => {
  if (req.user) {
    res.send({ message: `Welcome ${req.user.name}` });
  } else {
    res.send({ message: "Not Logged In!" });
  }
});

router.use(authRoutes);
router.use(transactionRoutes);

module.exports = router;
