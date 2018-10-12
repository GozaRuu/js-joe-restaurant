const cors = require('cors');
const appConfig = require('./app.config');

const whitelist = appConfig.corsWhitelist;

const corsOptionsDelegate = (req, cb) => {
	let corsOptions = { origin: false };
	if (whitelist.indexOf(req.header('Origin')) !== -1) {
		corsOptions = { origin: true };
	}
	cb(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
