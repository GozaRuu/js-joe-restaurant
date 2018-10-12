const express = require('express');
const bodyParser = require('body-parser');
const Promotions = require('../models/promotions');
const authenticate = require('../config/passport.config').verifyUser;
const cors = require('../config/cors.config');
const verifyAdminRights = require('../common/verify-admin-rights').verifyAdminRights;

const promotionRouter = express.Router();
promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
	.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
	.get(cors.corsWithOptions, (req, res, next) => {
		Promotions.find(req.query)
			.then((promotions) => {
				res.statusCode = 200;
				res.json(promotions);
			})
			.catch(err => next(err));
	})
	.post(cors.corsWithOptions, authenticate, verifyAdminRights, (req, res) => {
		Promotions.create(req.body)
			.then((promotion) => {
				res.statusCode = 200;
				res.json(promotion);
			});
	})
	.put(cors.corsWithOptions, authenticate, verifyAdminRights, (req, res) => {
		res.statusCode = 403;
		res.end('PUT operation not supported on /promotions');
	})
	.delete(cors.corsWithOptions, authenticate, verifyAdminRights, (req, res, next) => {
		Promotions.remove({})
			.then((response) => {
				res.statusCode = 200;
				res.json(response);
			})
			.catch(err => next(err));
	});

promotionRouter.use('/:promotionId', (req, res, next) => {
	Promotions.findById(req.params.promotionId)
		.then((promotion) => {
			if (promotion === null) {
				const err = new Error(`Promotion ${req.params.promotionId} not found`);
				err.status = 404;
				next(err);
				return;
			}
			req.promotion = promotion;
			next();
		})
		.catch(err => next(err));
});

promotionRouter.route('/:promotionId')
	.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
	.get(cors.corsWithOptions, (req, res) => {
		res.statusCode = 200;
		res.json(req.promotion);
	})
	.post(cors.corsWithOptions, authenticate, verifyAdminRights, (req, res) => {
		res.statusCode = 403;
		res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
	})
	.put(cors.corsWithOptions, authenticate, verifyAdminRights, (req, res, next) => {
		req.promotion._doc = { ...req.promotion._doc, ...req.body };
		req.promotion._doc.updatedAt = new Date().toISOString();
		req.promotion.save()
			.then((promotion) => {
				res.statusCode = 200;
				res.json(promotion);
			})
			.catch(err => next(err));
	})
	.delete(cors.corsWithOptions, authenticate, verifyAdminRights, (req, res, next) => {
		req.promotion.remove()
			.then((response) => {
				res.statusCode = 200;
				res.json(response);
			})
			.catch(err => next(err));
	});


module.exports = promotionRouter;
