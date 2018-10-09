if (process.env.NODE_ENV !== 'production') {
	require('dotenv').load();
}

//loading dependencies
const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');

//requiring routers
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const dishRouter = require('./routes/dishes');
const promotionRouter = require('./routes/promotions');
const leaderRouter = require('./routes/leaders');

//setting up database connection
const url = 'mongodb://localhost:27017/jsjoe';
const connect = mongoose.connect(url, { useNewUrlParser: true });
connect.then((db) => {
	console.log('successful connection to database...');
}).catch((err) => console.log(err));

//creating express app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//express middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routers setup
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/dishes', dishRouter);
app.use('/promotions', promotionRouter);
app.use('/leaders', leaderRouter);

// Default route: catch 404 and forward to error handler..
//HAVE TO BE THE LAST ROUTER
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
