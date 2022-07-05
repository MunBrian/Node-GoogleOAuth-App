const passport = require("passport");

//@desc Auth with google
const getGoogleAuth = passport.authenticate("google", {
  scope: ["profile"],
});

//@desc Google auth callback
const getGoogleCallBack = passport.authenticate("google", {
  successRedirect: "/dashboard",
  failureRedirect: "/login",
});

//@desc logout user
const logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
};

module.exports = {
  getGoogleAuth,
  getGoogleCallBack,
  logoutUser,
};
