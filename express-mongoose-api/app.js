const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const createError = require("http-errors");
const logger = require("morgan");
const chalk = require("chalk");
const compression = require("compression");
// const session = require('express-session');
// const FileStore = require('session-file-store')(session);

// loading config
const appConfig = require("./config/app.config");
require("./config/passport.config");

// loading routers
const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
const dishRouter = require("./routes/dishes");
const commentRouter = require("./routes/comments");
const promotionRouter = require("./routes/promotions");
const leaderRouter = require("./routes/leaders");
const favoriteRouter = require("./routes/favorites");
const uploadRouter = require("./routes/upload");

// setting up database connection
mongoose
  .connect(
    appConfig.mongoUri,
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => {
    console.log(
      `${chalk.green(
        "✓"
      )} MongoDB connection established. Please make sure MongoDB stays running`
    );
  });
mongoose.connection.on("error", err => {
  console.error(err);
  console.log(
    "%s MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});

// creating express app
const app = express();

// redirect any requests on the HTTP server to the secure HTTPS server
app.all("*", (req, res, next) => {
  if (!req.secure) {
    res.redirect(
      307,
      `https://${req.hostname}:${app.get("secPort")}${req.url}`
    );
    return;
  }
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// misc. middleware setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

// passport Authentication setup
app.use(passport.initialize());

// inclusive routers setup
app.use("/", indexRouter);
app.use("/users", userRouter);

// static file server setup
app.use(express.static(path.join(__dirname, "public")));

// exlusive routers setup
app.use("/dishes", dishRouter);
app.use("/comments", commentRouter);
app.use("/promotions", promotionRouter);
app.use("/leaders", leaderRouter);
app.use("/favorites", favoriteRouter);
app.use("/imageUpload", uploadRouter);

// default route: catch 404 and forward to error handler..
// IMPORTANT: MUST BE LAST ROUTER
app.use((req, res, next) => {
  next(createError(404));
});

// golbal error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = app.get("env") === "dev" ? err : {}; // show error stack in 'dev' but not in 'prod'

  // render the error page
  res.status(err.status || 500); // default error status to 500
  res.render("error");
});

module.exports = app;
