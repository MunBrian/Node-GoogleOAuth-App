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

//@desc show edit page
//@route GET /stories/edit/:id
router.get("/edit/:id", ensureAuth, async (req, res) => {
  const story = await Story.findOne({ _id: req.params.id }).lean();

  if (!story) {
    return res.render("error/404");
  }

  if (story.user != req.user.id) {
    res.redirect("/stories");
  } else {
    res.render("stories/edit", { story });
  }
});

//@desc update story
//@route PUT /stories/:id
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).lean();

    if (!story) {
      return res.render("errors/404");
    }

    if (story.user != req.user.id) {
      res.redirect("/stories");
    } else {
      await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });
      res.redirect("/dashboard");
      console.log(error);
      return res.render("errors/500");
    }
  } catch (error) {
    console.log(error);
    return res.render("errors/500");
  }
});

//@desc delete story
//@route DELETE /stories/:id
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    await Story.remove({ _id: req.params.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    return res.render("errors/500");
  }
});

module.exports = router;
