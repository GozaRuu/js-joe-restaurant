const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Users = require('../models/users');
const appConfig = require('./app.config')

//configure passport using the methods passport-local-mongoose add to the User Schema
passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

//configure Github Strategy for authentications
passport.use(new GitHubStrategy({
    clientID: appConfig.github.clientId,
    clientSecret: appConfig.github.clientSecret,
    callbackURL: "https://localhost:3443/users/github/callback"
  },
  (accessToken, refreshToken, profile, done) => { //map profile.id into a User object
	  Users.findOne({githubId: profile.id}, (err, user) => {
  		if (err) {
  			return done(err);
  		}
  		if (user) {
  			return done(null, user); //user exists in data base
  		}
		user = new Users({
			username: profile.displayName,
			githubId: profile.id
		});
		user.firstname = profile.displayName.split(' ')[0] || "";
		user.lastname = profile.displayName.split(' ')[1] || "";
		user.save((err, user) => {
			if(err) return done(err, false);
			else return done(null, user);
		})
  	});
  }
));

//configure JSON Web Token Strategy to establish token based sessions
const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //get the jwt from a header pair (Auth Bearer)
	secretOrKey: appConfig.secret
};

exports.jwtPassport = passport.use(new JwtStrategy(options, (jwt_payload, done) => {
	Users.findOne({_id: jwt_payload._id}, (err, user) => {
		if (err) {
			return done(err, false);
		}
		if (user) {
			return done(null, user);
		}
		return done(null, false);
	});
}));

exports.verifyUser = passport.authenticate('jwt', {session: false});
