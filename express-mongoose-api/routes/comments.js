const express = require('express');
const passport = require('passport');
const commentRouter = express.Router();
const authenticate = require('../config/passport.config').verifyUser;

commentRouter.route('/')
	.get((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(req.dish.comments);
	})
	.post(authenticate, (req, res, next) => {
		req.dish.comments.push(req.body);
		req.dish.save()
		.then((dish) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(dish);
		})
		.catch((err) => next(err));
	})
	.put(authenticate, (req, res, next) => {
		res.statusCode = 403;
		res.end(`PUT operation not supported on /dishes/${req.params.dishId}/comments`);
	})
	.delete(authenticate, (req, res, next) => {
		let comments = req.dish.comments;
		for (let i = (comments.length -1); i >= 0; i--) {
			comments.id(comments[i]._id).remove();
		}
		req.dish.save()
        .then((dish) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        })
		.catch((err) => next(err));
	});

commentRouter.use('/:commentId', (req, res, next) => {

	const comment = req.dish.comments.id(req.params.commentId);
	if (comment === null) {
		const err = new Error(`Comment ${req.params.commentId} not found`);
		err.status = 404;
		next(err);
		return;
	}
	req.comment = comment;
	next();
});

commentRouter.route('/:commentId')
	.get((req,res,next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(req.comment);
	})
	.post(authenticate, (req, res, next) => {
		res.statusCode = 403;
		res.end(`POST operation not supported on /dishes/${req.params.dishId}/comments/${req.params.commentId}`);
	})
	.put(authenticate, (req, res, next) => {
		req.comment._doc = {...req.comment._doc, ...req.body};
		req.comment._doc.updatedAt = new Date().toISOString();
		req.dish.save()
		.then((dish) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(dish);
		})
		.catch((err) => next(err));
	})
	.delete(authenticate, (req, res, next) => {
		req.comment.remove();
		req.dish.save()
		.then((dish) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(dish);
		})
		.catch((err) => next(err));
	});

module.exports = commentRouter;
