const express = require('express');
const bodyParser = require('body-parser');
const Promotions = require('../models/promotions');

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
	.get((req,res,next) => {
	    Promotions.find({})
		.then((promotions) => {
			res.statusCode = 200;
			res.json(promotions);
		})
		.catch((err) => next(err));
	})
	.post((req, res, next) => {
	    Promotions.create(req.body)
		.then((promotion) => {
			res.statusCode = 200;
			res.json(promotion);
		});
	})
	.put((req, res, next) => {
	    res.statusCode = 403;
	    res.end('PUT operation not supported on /promotions');
	})
	.delete((req, res, next) => {
	    Promotions.remove({})
		.then((response) => {
			res.statusCode = 200;
			res.json(response);
		})
		.catch((err) => next(err));
	});

promotionRouter.use('/:promotionId', (req, res, next) => {
	Promotions.findById(req.params.promotionId)
	.then((promotion) => {
		if(promotion === null){
			const err = new Error(`Promotion ${req.params.promotionId} not found`);
			err.status = 404;
			next(err);
			return;
		}
		req.promotion = promotion;
		next();
	})
	.catch((err) => next(err));
})

promotionRouter.route('/:promotionId')
	.get((req,res,next) => {
		res.statusCode = 200;
		res.json(req.promotion);
	})
	.post((req, res, next) => {
		res.statusCode = 403;
		res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
	})
	.put((req, res, next) => {
		req.promotion._doc = { ...req.promotion._doc, ...req.body };
		req.promotion.save()
		.then((promotion) => {
			res.statusCode = 200;
			res.json(promotion);
		})
		.catch((err) => next(err));
	})
	.delete((req, res, next) => {
		req.promotion.remove()
		.then((response) => {
			res.statusCode = 200;
			res.json(response);
		})
		.catch((err) => next(err));
	});


module.exports = promotionRouter;
