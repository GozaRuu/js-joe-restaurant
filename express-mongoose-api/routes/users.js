const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const Users = require('../models/users');
const getToken = require('../config/passport.config').getToken;
const cors = require('../config/cors.config');

const router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', cors.corsWithOptions, function(req, res, next) {
	res.send('respond with a resource');
});

router.post('/signup', cors.corsWithOptions, (req, res, next) => {
	console.log(req.body);
	Users.register(new Users({username: req.body.username}), req.body.password, (err, user) =>{
		if (err) {
			console.log('error while user register...');
			console.log('error name:', err.name || '');
			res.statusCode = 500;
			res.setHeader('Content-Type', 'application/json');
			res.json({success: false, error: err.name});
			return;
		}
		//automatic login after register
		if(req.body.firstname) user.firstname = req.body.firstname;
		if(req.body.lastname) user.lastname = req.body.lastname;
		user.save()
		.then((updatedUser) => {
			passport.authenticate('local')(req, res, () => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json({success: true, status: 'Registration Successful'});
			});
		})
		.catch((err) => {
				res.statusCode = 500;
				res.setHeader('Content-Type', 'application/json');
				res.json({success: false, error: err});
		});
	});
});

router.post('/login', cors.corsWithOptions, passport.authenticate('local'), (req, res, next) => {
	const token = getToken({_id: req.user._id}); //create jwt and send it on login
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.json({success: true, token: token, status: 'Login Successful'})
});

router.get('/logout', cors.corsWithOptions, (req, res) => {
	if (req.session) {
		req.session.destroy();
		res.clearCookie('session-id');
		res.redirect('/');
	} else {
		const err = new Error('User Not Logged In');
		err.status = 403;
		next(err);
	}
});

module.exports = router;
