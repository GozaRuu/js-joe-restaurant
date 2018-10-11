module.exports.verifyAdminRights = (req, res, next) => {
	if(req.user && req.user.admin){
		return next();
	}
	const err = new Error('Not authorized to perform this operation');
	err.status = 403;
	next(err);
};
