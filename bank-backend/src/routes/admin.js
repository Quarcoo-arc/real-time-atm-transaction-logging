const express = require("express");
const router = express.Router();
const { currentErrorService } = require("../services/admin");

router.get("/current-error", currentErrorService.getCurrentError);

router.post("/current-error", currentErrorService.setCurrentError);

module.exports = router;
