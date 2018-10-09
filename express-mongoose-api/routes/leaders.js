const express = require('express');
const bodyParser = require('body-parser');
const Leaders = require('../models/leaders');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
	.get((req,res,next) => {
	    Leaders.find({})
		.then((leaders) => {
			res.statusCode = 200;
			res.json(leaders);
		})
		.catch((err) => next(err));
	})
	.post((req, res, next) => {
	    Leaders.create(req.body)
		.then((leader) => {
			res.statusCode = 200;
			res.json(leader);
		});
	})
	.put((req, res, next) => {
	    res.statusCode = 403;
	    res.end('PUT operation not supported on /leaders');
	})
	.delete((req, res, next) => {
	    Leaders.remove({})
		.then((response) => {
			res.statusCode = 200;
			res.json(response);
		})
		.catch((err) => next(err));
	});

leaderRouter.use('/:leaderId', (req, res, next) => {
	Leaders.findById(req.params.leaderId)
	.then((leader) => {
		if(leader === null){
			const err = new Error(`Leader ${req.params.leaderId} not found`);
			err.status = 404;
			next(err);
			return;
		}
		req.leader = leader;
		next();
	})
	.catch((err) => next(err));
})

leaderRouter.route('/:leaderId')
	.get((req,res,next) => {
		res.statusCode = 200;
		res.json(req.leader);
	})
	.post((req, res, next) => {
		res.statusCode = 403;
		res.end(`POST operation not supported on /leaders/${req.params.leaderId}`);
	})
	.put((req, res, next) => {
		req.leader._doc = { ...req.leader._doc, ...req.body };
		req.leader._doc.updatedAt = new Date().toISOString();
		req.leader.save()
		.then((leader) => {
			res.statusCode = 200;
			res.json(leader);
		})
		.catch((err) => next(err));
	})
	.delete((req, res, next) => {
		req.leader.remove()
		.then((response) => {
			res.statusCode = 200;
			res.json(response);
		})
		.catch((err) => next(err));
	});


module.exports = leaderRouter;
