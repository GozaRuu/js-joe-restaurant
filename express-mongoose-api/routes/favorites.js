const express = require('express');
const bodyParser = require('body-parser');
const Favorites = require('../models/favorites');
const authenticate = require('../config/passport.config').verifyUser;
const cors = require('../config/cors.config');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Favorites.find({})
	.populate('user')
	.populate('favorites')
	.then((favorites) => {
		res.statusCode = 200;
		res.json(favorites);
	})
	.catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate, (req, res, next) => {
	Favorites.findOne({ user: req.user._id })
	.then((favorite) => {
		if (!favorite) {
			Favorites.create({ user: req.user._id, favorites: [req.body]})
			.then((favoriteCreated) => {
				res.statusCode = 200;
				res.json(favoriteCreated);
			})
			.catch((err) => next(err));
			return;
		}
		Favorites.update({ user: req.user._id, favorites: [...favorite.favorites, req.body] })
		.then((favoriteUpdated) => {
			res.statusCode = 200;
			res.json(favoriteUpdated);
		})
		.catch((err) => next(err));
		return;

	})
	.catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions, authenticate, (req, res, next) => {
    Favorites.remove({})
	.then((response) => {
		res.statusCode = 200;
		res.json(response);
	})
	.catch((err) => next(err));
});

module.exports = favoriteRouter;
