const express = require('express');
const bodyParser = require('body-parser');
const Leaders = require('../models/leaders');
const authenticate = require('../config/passport.config').verifyUser;
const cors = require('../config/cors.config');
const verifyAdmin = require('../common/verify.admin').verifyAdmin;

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Leaders.find({})
	.then((leaders) => {
		res.statusCode = 200;
		res.json(leaders);
	})
	.catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate, verifyAdmin, (req, res, next) => {
    Leaders.create(req.body)
	.then((leader) => {
		res.statusCode = 200;
		res.json(leader);
	});
})
.put(cors.corsWithOptions, authenticate, verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete(cors.corsWithOptions, authenticate, verifyAdmin, (req, res, next) => {
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
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
	res.statusCode = 200;
	res.json(req.leader);
})
.post(cors.corsWithOptions, authenticate, verifyAdmin, (req, res, next) => {
	res.statusCode = 403;
	res.end(`POST operation not supported on /leaders/${req.params.leaderId}`);
})
.put(cors.corsWithOptions, authenticate, verifyAdmin, (req, res, next) => {
	req.leader._doc = { ...req.leader._doc, ...req.body };
	req.leader._doc.updatedAt = new Date().toISOString();
	req.leader.save()
	.then((leader) => {
		res.statusCode = 200;
		res.json(leader);
	})
	.catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate, verifyAdmin, (req, res, next) => {
	req.leader.remove()
	.then((response) => {
		res.statusCode = 200;
		res.json(response);
	})
	.catch((err) => next(err));
});


module.exports = leaderRouter;
