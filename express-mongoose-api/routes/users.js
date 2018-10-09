const express = require('express');
const bodyParser = require('body-parser');
const Users = require('../models/users');

const router = express.Router();
router.use(bodyParser.json());
/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
	Users.findOne({username: req.body.username})
	.then((user) => {
		if(user !== null) {
			const err = new Error(`User ${req.body.username} Exisits`);
			err.status = 403;
			throw err;
		}
		return Users.create({
			username: req.body.username,
			password: req.body.password
		})
	})
	.then((user) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json({status: 'Registration Successful', user: user});
	})
	.catch((err) => next(err));
});

router.post('/login', (req, res, next) => {
	if (!req.session.user) {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			const err = new Error('Not Authenticated');
			res.setHeader('WWW-Authenticate', 'Basic');
			err.status = 401;
			return next(err);
		}
		try {
			const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
			const username = auth[0];
			const password = auth[1];
			Users.findOne({username: username})
			.then((user) => {
				if (user === null) {
					const err = new Error(`User ${username} Does Not Exist`);
					err.status = 403;
					return next(err);
				}
				if (user.password !== password) {
					const err = new Error(`Incorrect Password`);
					err.status = 403;
					return next(err);
				}
				req.session.user = 'authenticated';
				res.statusCode = 200;
				res.setHeader('Content-Type', 'text/plain');
				res.end('Authentication Successful')
			})
			.catch((err) => next(err));
		} catch (e) {
			const err = new Error(`Incorrect Credential Format`);
			err.status = 403;
			return next(err);
		}
		return;
	}
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('User Authenticated');
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
