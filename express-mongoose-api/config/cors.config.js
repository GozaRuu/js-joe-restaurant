const cors = require('cors');

const whitelist = ['http://localhost:3000', 'https://localhost:3443'];

const corsOptionsDelegate = (req, cb) => {
	let corsOptions = { origin: false };
	if(whitelist.indexOf(req.header('Origin')) !== -1) {
		corsOptions = { origin: true };
	}
	cb(null, corsOptions);
}

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
