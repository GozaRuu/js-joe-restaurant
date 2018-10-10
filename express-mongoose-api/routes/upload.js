const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../config/passport.config').verifyUser;
const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) = {
		cb(null, 'public/images');
	},
	filename: (req, file, cb) {
		cb(null, file.originalname);
	}
});

const imageFileFilter = (req, file, cb) => {
	if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
		return cb(new Error('Please only upload image files'));
	}
	cb(null, true);
}

const upload = multer({ storage, fileFilter: imageFileFilter});

const uploadRouter = express.Router();
uploadRouter.use(bodyParser.json());

module.exports = uploadRouter;
