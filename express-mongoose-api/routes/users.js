const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const Users = require('../models/users');

const router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
	console.log(req.body);
	Users.register(new Users({username: req.body.username}), req.body.password, (err) =>{
		if (err) {
			console.log('error while user register...');
			console.log('error name:', err.name || '');
			res.statusCode = 500;
			res.setHeader('Content-Type', 'application/json');
			res.json({success: false, error: err.name});
			return;
		}
		//automatic login after register
		passport.authenticate('local')(req, res, () => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json({success: true, status: 'Registration Successful'});
		});
	});
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
	console.log(req.user);
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.json({success: true, status: 'Login Successful'})
});

router.get('/logout', (req, res) => {
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
