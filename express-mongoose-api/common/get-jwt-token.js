const jwt = require('jsonwebtoken');

exports.getToken = function(user) { 
    return jwt.sign(user, appConfig.secret, {expiresIn: 63600});
};
