const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Users = require('../models/users');
const appConfig = require('./app.config')

//configure passport using the methods passport-local-mongoose add to the User Schema
passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

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
