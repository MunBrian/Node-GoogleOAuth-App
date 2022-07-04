const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Story = require("../models/StoryModel");

//@desc show add page
//@route GET /stories/add
router.get("/add", ensureAuth, (req, res) => {
  res.render("stories/add");
});

//@desc process add form
//@route post  /stories/add
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(err);
    res.render("error/500");
  }
});

//@desc show all stories
//@route GET /stories
router.get("/", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: "public" })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();
    res.render("stories/stories-list", { stories });
  } catch (error) {
    console.log(error);
    res.render("errors/500");
  }
});

module.exports = router;
