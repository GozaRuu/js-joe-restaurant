const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Dishes = require('../models/dishes');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
	.get((req,res,next) => {
	    Dishes.find({})
		.then((dishes) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(dishes)
		})
		.catch((err) => next(err));
	})
	.post((req, res, next) => {
	    Dishes.create(req.body)
		.then((dish) => {
			console.log('created dish\'', dish, '\'');
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(dish)
		})
		.catch((err) => next(err));
	})
	.put((req, res, next) => {
	    res.statusCode = 403;
	    res.end('PUT operation not supported on /dishes');
	})
	.delete((req, res, next) => {
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
	.get((req, res, next) => {
		Dishes.findById(req.params.dishId)
		.then((dish) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(dish)
		})
		.catch((err) => next(err));
	})
	.post((req, res, next) => {
		res.statusCode = 403;
		res.end('POST operation not supported on /dishes');
	})
	.put((req, res, next) => {
		Dishes.findByIdAndUpdate(req.params.dishId, { $set: req.body }, { new: true })
		.then((dish) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(dish)
		})
		.catch((err) => next(err));
	})
	.delete((req, res, next) => {
		Dishes.findByIdAndRemove(req.params.dishId)
		.then((response) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(response)
		})
		.catch((err) => next(err));
	});

dishRouter.route('/:dishId/comments')
	.get((req, res, next) => {
		Dishes.findById(req.params.dishId)
		.then((dish) => {
			if (dish !== null) {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(dish.comments)
			} else {
				const err = new Error(`Dish ${req.params.dishId} not found`);
				err.status = 404;
				throw err;
			}
		})
		.catch((err) => next(err));
	})
	.post((req, res, next) => {
		Dishes.findById(req.params.dishId)
		.then((dish) => {
			if (dish !== null) {
				dish.comments.push(req.body);
				dish.save()
				.then((dish) => {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(dish)
				})
				.catch((err) => next(err));
			} else {
				const err = new Error(`Dish ${req.params.dishId} not found`);
				err.status = 404;
				throw err;
			}
		})
		.catch((err) => next(err));
	})
	.put((req, res, next) => {
		res.statusCode = 403;
		res.end(`PUT operation not supported on /dishes/${req.params.dishId}/comments`);
	})
	.delete((req, res, next) => {
		Dishes.findById(req.params.dishId)
		.then((dish) => {
			if (dish !== null) {
				for (var i = (dish.comments.length -1); i >= 0; i--) {
					dish.comments.id(dish.comments[i]._id).remove();
				}
				dish.save()
	            .then((dish) => {
	                res.statusCode = 200;
	                res.setHeader('Content-Type', 'application/json');
	                res.json(dish);
	            })
				.catch((err) => next(err));
			} else {
				const err = new Error(`Dish ${req.params.dishId} not found`);
				err.status = 404;
				throw err;
			}
		})
		.catch((err) => next(err));
	});

	dishRouter.route('/:dishId/comments/:commentId')
		.get((req,res,next) => {
			Dishes.findById(req.params.dishId)
			.then((dish) => {
				const comment = dish.comments.id(req.params.commentId);
				if (dish !== null && comment !== null) {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(comment)
				} else {
					const err = new Error(`Comment
						${
							req.params.dishId === null ?
							 req.params.dishId : req.params.commentId
						  } not found`);
					err.status = 404;
					throw err;
				}
			})
			.catch((err) => next(err));
		})
		.post((req, res, next) => {
			res.statusCode = 403;
			res.end(`POST operation not supported on /dishes/${req.params.dishId}/comments/${req.params.commentId}`);
		})
		.put((req, res, next) => {
			Dishes.findById(req.params.dishId)
			.then((dish) => {
				let comment = dish.comments.id(req.params.commentId);
				if (dish !== null && comment !== null) {
					comment._doc = {...comment._doc, ...req.body};
					dish.save()
		            .then((dish) => {
		                res.statusCode = 200;
		                res.setHeader('Content-Type', 'application/json');
		                res.json(dish);
		            })
				} else {
					const err = new Error(`Comment
						${
							req.params.dishId === null ?
							 req.params.dishId : req.params.commentId
						  } not found`);
					err.status = 404;
					throw err;
				}
			})
			.catch((err) => next(err));
		})
		.delete((req, res, next) => {
			Dishes.findById(req.params.dishId)
			.then((dish) => {
				const comment = dish.comments.id(req.params.commentId);
				if (dish !== null && comment !== null) {
					dish.comments.id(req.params.commentId).remove();
					dish.save()
		            .then((dish) => {
		                res.statusCode = 200;
		                res.setHeader('Content-Type', 'application/json');
		                res.json(dish);
		            })
					.catch((err) => next(err));
				} else {
					const err = new Error(`Comment
						${
							req.params.dishId === null ?
							 req.params.dishId : req.params.commentId
						  } not found`);
					err.status = 404;
					throw err;
				}
			})
			.catch((err) => next(err));
		});

module.exports = dishRouter;
