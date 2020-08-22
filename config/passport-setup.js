const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require("./keys");
const User = require("../models/user.model");
const GithubStrategy = require("passport-github").Strategy;
const VKontakteStrategy = require("passport-vkontakte").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;

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

passport.use(
  new GithubStrategy(
    {
      // options for github strategy
      callbackURL: "/auth/github/redirect",
      clientID: keys.github.clientID,
      clientSecret: keys.github.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      // check if user already exists
      console.log(profile);
      User.findOne({ githubId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // already have the user
          done(null, currentUser); // здесь будет использоваться passport.serializeUser
        } else {
          new User({
            username: profile.displayName,
            githubId: profile.id,
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

passport.use(
  new VKontakteStrategy(
    {
      // options for vkontakte strategy
      callbackURL: "/auth/vkontakte/redirect",
      clientID: keys.vkontakte.clientID,
      clientSecret: keys.vkontakte.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      // check if user already exists
      console.log(profile);
      User.findOne({ vkontakteId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // already have the user
          done(null, currentUser); // здесь будет использоваться passport.serializeUser
        } else {
          new User({
            username: profile.displayName,
            vkontakteId: profile.id,
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

passport.use(
  new TwitterStrategy(
    {
      // options for twitter strategy
      callbackURL: "/auth/twitter/redirect",
      clientID: keys.twitter.clientID,
      clientSecret: keys.twitter.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      // check if user already exists
      console.log(profile);
      User.findOne({ twitterId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // already have the user
          done(null, currentUser); // здесь будет использоваться passport.serializeUser
        } else {
          new User({
            username: profile.displayName,
            twitterId: profile.id,
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
