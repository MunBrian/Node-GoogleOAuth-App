const express = require("express");
const router = express.Router();
const {
  getGoogleAuth,
  getGoogleCallBack,
  logoutUser,
} = require("../controllers/authController");

//@route GET /auth/google
router.get("/google", getGoogleAuth);

//@route GET /auth/google/callback
router.get("/google/callback", getGoogleCallBack);

//@route GET /auth/logout
router.get("/logout", logoutUser);

module.exports = router;
