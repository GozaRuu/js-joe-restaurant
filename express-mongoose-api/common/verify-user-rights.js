module.exports.verifyUserRightsForCommenting = (req, res, next) => {
	if (req.user && req.params && req.dish) {
		const commentAuthorId = req.dish.comments.id(req.params.commentId).author._id;
		console.log(commentAuthorId);
		console.log(req.dish.comments.id(req.params.commentId));

		if (req.user._id.toString() === commentAuthorId) return next();

		const err = new Error('Not authorized to midfy comments not under your name');
		err.status = 403;
		next(err);
	} else {
		const err = new Error('Bad Request');
		err.status = 400;
		next(err);
	}
};
