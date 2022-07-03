const express = require("express");
const passport = require("passport");
const router = express.Router();

//@desc Auth with google
//@route GET /auth/google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

//@desc Google auth callback
//@route GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);

//@desc logout user
//@route GET /auth/logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

module.exports = router;
