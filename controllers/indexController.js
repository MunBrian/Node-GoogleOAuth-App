const Story = require("../models/StoryModel");
const asyncHandler = require("express-async-handler");

//@desc Login/Landing Page
const getLoginPage = (req, res) => {
  res.render("Login", {
    layout: "login",
  });
};

//@desc Dashboard page
const getDashboardPage = asyncHandler(async (req, res) => {
  const stories = await Story.find({ user: req.user.id }).lean();

  if (!stories) {
    return res.render("errors/500");
  }

  res.render("Dashboard", {
    name: req.user.firstName,
    stories,
  });
});

module.exports = {
  getLoginPage,
  getDashboardPage,
};
