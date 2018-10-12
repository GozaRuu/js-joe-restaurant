const jwt = require('jsonwebtoken');
const appConfig = require('../config/app.config');

module.exports.getToken = user => jwt.sign(user, appConfig.secret, { expiresIn: 63600 });
