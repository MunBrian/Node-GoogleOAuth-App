const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const {
  getStoryAddPage,
  getAllStories,
  getEditPage,
  getStory,
  getUserStories,
  addStory,
  deleteStory,
  updateStory,
} = require("../controllers/storiesContoller");

//@route GET /stories/add
router.get("/add", ensureAuth, getStoryAddPage);

//@route post  /stories/add
router.post("/", ensureAuth, addStory);

//@route GET /stories
router.get("/", ensureAuth, getAllStories);

//@route GET /stories/:id
router.get("/:id", ensureAuth, getStory);

//@route GET /stories/user/:userId
router.get("/user/:userId", ensureAuth, getUserStories);

//@route GET /stories/edit/:id
router.get("/edit/:id", ensureAuth, getEditPage);

//@route PUT /stories/:id
router.put("/:id", ensureAuth, updateStory);

//@route DELETE /stories/:id
router.delete("/:id", ensureAuth, deleteStory);

module.exports = router;
