const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Story = require("../models/StoryModel");

//@desc Login/Landing Page
//@route GET/
router.get("/login", ensureGuest, (req, res) => {
  res.render("Login", {
    layout: "login",
  });
});

//@desc Dashboard
//@route GET/ dashboard
router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render("Dashboard", {
      name: req.user.firstName,
      stories,
    });
  } catch (error) {
    console.log(error);
    res.render("errors/500");
  }
});

module.exports = router;
