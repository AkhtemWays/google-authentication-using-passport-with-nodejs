const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require("./keys");
const User = require("../models/user.model");

// этот метод вызывается для сохранения в куку
passport.serializeUser((user, done) => {
  done(null, user.id); // здесь сохраняем пользователя айди
});
// этот метод вызывается когда кука приходит из браузера и сразу в представлении в объекте реквест у меня уже будет юзер
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user); // а тут его берем
  });
});

passport.use(
  new FacebookStrategy(
    {
      callbackURL: "/auth/facebook/redirect",
      clientID: keys.facebook.clientID,
      clientSecret: keys.facebook.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      User.findOne({ facebookId: profile.id }).then((currentUser) => {
        if (currentUser) {
          done(null, currentUser);
        } else {
          new User({
            username: profile.displayName,
            facebookId: profile.id,
          })
            .save()
            .then((newUser) => {
              console.log(`New user created ${newUser}`);
              done(null, newUser);
            });
        }
      });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      // check if user already exists
      console.log(profile);
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // already have the user
          done(null, currentUser); // здесь будет использоваться passport.serializeUser
        } else {
          new User({
            username: profile.displayName,
            googleId: profile.id,
          })
            .save()
            .then((newUser) => {
              console.log(`new user created ${newUser}`);
              done(null, newUser); // здесь будет использоваться passport.serializeUser
            });
        }
      });
    }
  )
);

passport;
