const express = require('express');
const bodyParser = require('body-parser');
const Dishes = require('../models/dishes');
const commentRouter = require('./comments');
const authenticate = require('../config/passport.config').verifyUser;
const cors = require('../config/cors.config');
const verifyAdminRights = require('../common/verify-admin-rights').verifyAdminRights;

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Dishes.find({})
	.populate('comments.author')
	.then((dishes) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(dishes)
	})
	.catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate, verifyAdminRights, (req, res, next) => {
    Dishes.create(req.body)
	.then((dish) => {
		console.log('created dish\'', dish, '\'');
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(dish)
	})
	.catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete(cors.corsWithOptions, authenticate, verifyAdminRights, (req, res, next) => {
    Dishes.remove({})
	.then((response) => {
		console.log('deleted all dishes...');
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(response)
	})
	.catch((err) => next(err));
});


dishRouter.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) => {
	Dishes.findById(req.params.dishId)
	.populate('comments.author')
	.then((dish) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(dish)
	})
	.catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate, (req, res, next) => {
	res.statusCode = 403;
	res.end('POST operation not supported on /dishes');
})
.put(cors.corsWithOptions, authenticate, verifyAdminRights, (req, res, next) => {
	Dishes.findByIdAndUpdate(req.params.dishId, { $set: req.body }, { new: true })
	.then((dish) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(dish)
	})
	.catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate, verifyAdminRights, (req, res, next) => {
	Dishes.findByIdAndRemove(req.params.dishId)
	.then((response) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(response)
	})
	.catch((err) => next(err));
});


//routing comment requests
dishRouter.use('/:dishId/comments',(req, res, next) => {
	Dishes.findById(req.params.dishId)
	.populate('comments.author')
	.then((dish) => {
		if (dish === null) {
			const err = new Error(`Dish ${req.params.dishId} not found`);
			err.status = 404;
			throw err;
		}
		req.dish = dish;
		next();
	})
	.catch((err) => next(err));
});

dishRouter.use('/:dishId/comments', commentRouter);

module.exports = dishRouter;
