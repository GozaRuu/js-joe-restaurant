const jwt = require('jsonwebtoken');
const appConfig = require('../config/app.config');

exports.getToken = function(user) {
    return jwt.sign(user, appConfig.secret, {expiresIn: 63600});
};
