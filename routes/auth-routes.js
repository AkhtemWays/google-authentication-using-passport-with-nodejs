const router = require("express").Router();
const passport = require("passport");

// auth login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

// auth logout
router.get("/logout", (req, res) => {
  // handle with passport
  req.logout(); // избавляется от куки вот так просто
  res.redirect("/");
});

// auth with google+
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"], // забираем данные
  })
);

// callback route for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  //   res.send(req.user);
  res.redirect("/profile/");
});

// ------------------------------ facebook
router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook/redirect",
  passport.authenticate("facebook"),
  (req, res) => {
    res.redirect("/profile/");
  }
);

// ------------------------------- github

router.get("/github", passport.authenticate("github"));
router.get("/github/redirect", passport.authenticate("github"), (req, res) => {
  res.redirect("/profile/");
});

// ------------------------------- vkontakte
router.get("/vkontakte", passport.authenticate("vkontakte"));
router.get(
  "/vkontakte/redirect",
  passport.authenticate("vkontakte"),
  (req, res) => {
    res.redirect("/profile/");
  }
);

// ------------------------------- twitter
router.get("/twitter", passport.authenticate("twitter"));
router.get(
  "/twitter/redirect",
  passport.authenticate("twitter"),
  (req, res) => {
    res.redirect("/profile/");
  }
);

module.exports = router;
