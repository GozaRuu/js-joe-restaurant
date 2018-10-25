const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Users = require("../models/users");
const appConfig = require("./app.config");

// configure passport using the methods passport-local-mongoose add to the User Schema
passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

// configure Github Strategy for authentications
passport.use(
  new GitHubStrategy(
    {
      clientID: appConfig.github.clientId,
      clientSecret: appConfig.github.clientSecret,
      callbackURL: "https://localhost:3443/users/github/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // map profile.id into a User object
      Users.findOne({ githubId: profile.id }, (err, user) => {
        if (err) return done(err);
        if (user) return done(null, user); // user exists in data base
        const newUser = new Users({
          username: profile.displayName,
          githubId: profile.id
        });
        newUser.firstname = profile.displayName.split(" ")[0] || "";
        newUser.lastname = profile.displayName.split(" ")[1] || "";
        user.save((nErr, nUser) => {
          if (nErr) return done(nErr, false);
          return done(null, nUser);
        });
      });
    }
  )
);

// configure JSON Web Token Strategy to establish token based sessions
const options = {
  // get the jwt from a header pair (Auth Bearer)
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: appConfig.secret
};

exports.jwtPassport = passport.use(
  new JwtStrategy(options, (jwtPayload, done) => {
    Users.findOne({ _id: jwtPayload._id }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    });
  })
);

exports.verifyUser = passport.authenticate("jwt", { session: false });
