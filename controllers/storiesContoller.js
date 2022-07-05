const Story = require("../models/StoryModel");

//@desc show add page
const getStoryAddPage = (req, res) => {
  res.render("stories/add");
};

//@desc process add form
const addStory = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(err);
    res.render("error/500");
  }
};

//@desc show all stories
const getAllStories = async (req, res) => {
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
};

//@desc show single story
const getStory = async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).populate("user").lean();

    if (!story) {
      return res.render("errors/404");
    }

    res.render("stories/singleStory", { story });
  } catch (error) {
    console.log(error);
    res.render("errors/500");
  }
};

//@desc user's stories
const getUserStories = async (req, res) => {
  try {
    const stories = await Story.find({ user: req.params.userId })
      .populate("user")
      .lean();

    res.render("stories/stories-list", { stories });
  } catch (error) {
    console.log(error);
    res.render("errors/500");
  }
};

//@desc show edit page
const getEditPage = async (req, res) => {
  try {
    const story = await Story.findOne({ _id: req.params.id }).lean();

    if (!story) {
      return res.render("errors/404");
    }

    if (story.user != req.user.id) {
      res.redirect("/stories");
    } else {
      res.render("stories/edit", { story });
    }
  } catch (error) {
    console.log(error);
    res.render("errors/500");
  }
};

//@desc update story
const updateStory = async (req, res) => {
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
    }
  } catch (error) {
    console.log(error);
    res.render("errors/500");
  }
};

//@desc delete story
const deleteStory = async (req, res) => {
  try {
    await Story.remove({ _id: req.params.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    return res.render("errors/500");
  }
};

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
