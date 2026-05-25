const express = require("express");
const router = express.Router();

const {ownerDashboard}=require("../controllers/owner.dashboard.controller")
const authMiddleware=require("../middleware/auth.middleware")

router.get(
    "/dashboard",
    authMiddleware,
    ownerDashboard
  );
  
  module.exports = router;

