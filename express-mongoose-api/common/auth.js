//HTTP Basic Authentification middleware
const basicAuth = (req, res, next) => {
    console.log(req.signedCookies);
	if (!req.signedCookies.user) {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
          const err = new Error('You are not authenticated!');
          res.setHeader('WWW-Authenticate', 'Basic');
          err.status = 401;
          next(err);
          return;
      }
      const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
      const user = auth[0];
      const pass = auth[1];
      if (user == 'admin' && pass == '123') {
          res.cookie('user','admin',{signed: true}); //send a cookie to the user
          next(); // authorized
      } else {
          const err = new Error('You are not authenticated!');
          res.setHeader('WWW-Authenticate', 'Basic');
          err.status = 401;
          next(err);
      }
    }
    else {
        if (req.signedCookies.user === 'admin') {
            next();
        }
        else {
            const err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    }
}

module.exports = basicAuth;
