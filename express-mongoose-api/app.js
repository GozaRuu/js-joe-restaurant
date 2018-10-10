if (process.env.NODE_ENV !== 'production') {
	require('dotenv').load();
}

//loading dependencies
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const createError = require('http-errors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

//loading routers
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const dishRouter = require('./routes/dishes');
const promotionRouter = require('./routes/promotions');
const leaderRouter = require('./routes/leaders');

//loading config
const appConfig = require('./config/app.config');
const passportConfig = require('./config/passport.config');

//setting up database connection
const url = appConfig.mongoUrl;
const connect = mongoose.connect(url, { useNewUrlParser: true });
connect.then((db) => {
	console.log('successful connection to database...');
}).catch((err) => console.log(err));

//creating express app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//misc middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cookies middleware setup
// app.use(cookieParser(process.env.SECRET || '12345'));
app.use(session({
	name: 'session-id',
	secret: appConfig.secret,
	saveUninitialized: false,
	resave: false,
	store: new FileStore()
}));

//inclusive routers setup
app.use('/', indexRouter);
app.use('/users', userRouter);

//user authentication middleware setup
const auth = (req, res, next) => {
	if(!req.session.user || req.session.user !== 'authenticated') {
		const err = new Error('You are not authenticated!');
		err.status = req.session.user ? 403 : 401;
		return next(err);
	}
	next();
}
//IMPORTANT: this middleware must be setup bofre the exclusive routers
app.use(auth);

//static file server setup
app.use(express.static(path.join(__dirname, 'public')));

//exlusive routers setup
app.use('/dishes', dishRouter);
app.use('/promotions', promotionRouter);
app.use('/leaders', leaderRouter);

// default route: catch 404 and forward to error handler..
//IMPORTANT: MUST BE LAST ROUTER
app.use((req, res, next) => {
	next(createError(404));
});

// golbal error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {}; //show error stack in 'dev' but not in 'prod'

	// render the error page
	res.status(err.status || 500); //default error status to 500
	res.render('error');
});

module.exports = app;
