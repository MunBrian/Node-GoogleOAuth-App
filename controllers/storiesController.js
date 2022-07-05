const asyncHandler = require("express-async-handler");
const Story = require("../models/StoryModel");

//@desc show add page
const getStoryAddPage = (req, res) => {
  res.render("stories/add");
};

//@desc process add form
const addStory = asyncHandler(async (req, res) => {
  if ((req.body.user = req.user.id)) {
    await Story.create(req.body);
    res.redirect("/dashboard");
  } else {
    res.render("error/500");
  }
});

//@desc show all stories
const getAllStories = asyncHandler(async (req, res) => {
  const stories = await Story.find({ status: "public" })
    .populate("user")
    .sort({ createdAt: "desc" })
    .lean();

  if (!stories) {
    return res.render("errors/500");
  }

  res.render("stories/stories-list", { stories });
});

//@desc show single story
const getStory = asyncHandler(async (req, res) => {
  let story = await Story.findById(req.params.id).populate("user").lean();

  if (!story) {
    return res.render("errors/404");
  }

  res.render("stories/singleStory", { story });
});

//@desc user's stories
const getUserStories = asyncHandler(async (req, res) => {
  const stories = await Story.find({ user: req.params.userId })
    .populate("user")
    .lean();

  if (!stories) {
    return res.render("errors/500");
  }

  res.render("stories/stories-list", { stories });
});

//@desc show edit page
const getEditPage = asyncHandler(async (req, res) => {
  const story = await Story.findOne({ _id: req.params.id }).lean();

  if (!story) {
    return res.render("errors/404");
  }

  if (story.user != req.user.id) {
    res.redirect("/stories");
  } else {
    res.render("stories/edit", { story });
  }
});

//@desc update story
const updateStory = asyncHandler(async (req, res) => {
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
  }
});

//@desc delete story
const deleteStory = asyncHandler(async (req, res) => {
  const story = await Story.findOneAndRemove({ _id: req.params.id });
  res.redirect("/dashboard");

  if (!story) {
    return res.render("errors/404");
  }
});

module.exports = {
  getStoryAddPage,
  addStory,
  getAllStories,
  getStory,
  getUserStories,
  getEditPage,
  updateStory,
  deleteStory,
};
