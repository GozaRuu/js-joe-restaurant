const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const authenticate = require('../config/passport.config').verifyUser;
const cors = require('../config/cors.config');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/images');
	},
	filename: (req, file, cb) => {
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

uploadRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, authenticate, upload.single('imageFile'), (req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.json(req.file);
})
.get(cors.cors, authenticate, (req, res) => {
	res.statusCode = 403;
	res.end('GET operation not supported on /imageUpload');
})
.put(cors.corsWithOptions, authenticate, (req, res) => {
	res.statusCode = 403;
	res.end('PUT operation not supported on /imageUpload');
})
.delete(cors.corsWithOptions, authenticate, (req, res) => {
	res.statusCode = 403;
	res.end('DELETE operation not supported on /imageUpload');
})

module.exports = uploadRouter;
