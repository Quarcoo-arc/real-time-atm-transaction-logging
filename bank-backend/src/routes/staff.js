const express = require("express");
const router = express.Router();
const {
  activeStaffService,
  atmBalanceService,
  logsService,
} = require("../services/staff");

router.get("/active-staff", activeStaffService.getActiveStaff);

router.post("/active-staff", activeStaffService.setActiveStaff);

router.get("/atm-balance", atmBalanceService.getAtmBalance);

router.post("/atm-balance", atmBalanceService.setAtmBalance);

router.get("/logs", logsService.getAllLogs);

router.post("/logs/filter", logsService.filterLogs);

module.exports = router;
