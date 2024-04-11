const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");
const transactionRoutes = require("./transaction");
const accountRoutes = require("./account");
const adminRoutes = require("./admin");
const staffRoutes = require("./staff");

router.get("/", (req, res) => {
  if (req.user) {
    res.send({ message: `Welcome ${req.user.name}` });
  } else {
    res.send({ message: "Not Logged In!" });
  }
});

router.use(authRoutes);
router.use(transactionRoutes);
router.use(accountRoutes);
router.use(adminRoutes);
router.use(staffRoutes);

module.exports = router;
