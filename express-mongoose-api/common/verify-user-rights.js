const Dishes = require('../models/dishes');

module.exports.verifyUserRightsForCommenting = (req, res, next) => {
	if (req.user && req.params && req.dish) {
		const commentAuthorId = req.dish.comments.id(req.params.commentId).author._id;
		console.log(commentAuthorId);
		console.log(req.dish.comments.id(req.params.commentId));

		if(req.user._id.toString() == commentAuthorId) return next();
		else {
			const err = new Error('Not authorized to perform this operation');
			err.status = 403;
			next(err);
		}
	}
	else {
		const err = new Error('Bad Request');
		err.status = 400;
		next(err);
	}
};