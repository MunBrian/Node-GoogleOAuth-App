const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const {
  getLoginPage,
  getDashboardPage,
} = require("../controllers/indexController");

//@route GET/login
router.get("/login", ensureGuest, getLoginPage);

//@route GET/ dashboard
router.get("/dashboard", ensureAuth, getDashboardPage);

module.exports = router;
