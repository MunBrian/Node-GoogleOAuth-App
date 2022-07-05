const Story = require("../models/StoryModel");

//@desc Login/Landing Page
const getLoginPage = (req, res) => {
  res.render("Login", {
    layout: "login",
  });
};

//@desc Dashboard page
const getDashboardPage = async (req, res) => {
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
};

module.exports = {
  getLoginPage,
  getDashboardPage,
};
