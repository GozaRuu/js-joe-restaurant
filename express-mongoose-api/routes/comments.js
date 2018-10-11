const express = require('express');
const passport = require('passport');
const commentRouter = express.Router();
const authenticate = require('../config/passport.config').verifyUser;
const Users = require('../models/users');
const cors = require('../config/cors.config');
const verifyUserRights = require('verify-user-rights').verifyUserRights;

commentRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.json(req.dish.comments);
})
.post(cors.corsWithOptions, authenticate, (req, res, next) => {
	req.body.author = req.user._id;
	req.dish.comments.push(req.body);
	req.dish.save()
	.then((dish) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		//manual population here
		Users.findById(req.user._id)
		.then((user) => {
			dish.comments[dish.comments.length-1].author = user._doc;
			res.json(dish);
		})
	})
	.catch((err) => next(err));

})
.put(cors.corsWithOptions, authenticate, (req, res, next) => {
	res.statusCode = 403;
	res.end(`PUT operation not supported on /dishes/${req.params.dishId}/comments`);
})
.delete(cors.corsWithOptions, authenticate, (req, res, next) => {
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
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.json(req.comment);
})
.post(authenticate, (req, res, next) => {
	res.statusCode = 403;
	res.end(`POST operation not supported on /dishes/${req.params.dishId}/comments/${req.params.commentId}`);
})
.put(cors.corsWithOptions, authenticate, (req, res, next) => {
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
.delete(cors.corsWithOptions, authenticate, (req, res, next) => {
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
