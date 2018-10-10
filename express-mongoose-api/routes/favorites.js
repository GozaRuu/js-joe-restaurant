const express = require('express');
const bodyParser = require('body-parser');
const Leaders = require('../models/favorites');
const authenticate = require('../config/passport.config').verifyUser;
const cors = require('../config/cors.config');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Leaders.find({})
	.then((favorites) => {
		res.statusCode = 200;
		res.json(favorites);
	})
	.catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate, (req, res, next) => {
    Leaders.create(req.body)
	.then((favorite) => {
		res.statusCode = 200;
		res.json(favorite);
	});
})
.put(cors.corsWithOptions, authenticate, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions, authenticate, (req, res, next) => {
    Leaders.remove({})
	.then((response) => {
		res.statusCode = 200;
		res.json(response);
	})
	.catch((err) => next(err));
});

module.exports = favoriteRouter;
