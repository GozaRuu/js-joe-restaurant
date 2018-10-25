const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const Users = require("../models/users");
const getToken = require("../common/get-jwt-token").getToken;
const cors = require("../config/cors.config");
const authenticate = require("../config/passport.config").verifyUser;
const verifyAdminRights = require("../common/verify-admin-rights")
  .verifyAdminRights;

const router = express.Router();
router.use(bodyParser.json());

router.options("*", cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

/* GET users listing. */
router.get(
  "/",
  cors.corsWithOptions,
  authenticate,
  verifyAdminRights,
  (req, res) => {
    Users.find({}).then(users => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(users);
    });
  }
);

router.post("/signup", cors.corsWithOptions, (req, res) => {
  Users.register(
    new Users({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log("error while user register...");
        console.log("error name:", err.name || "");
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ success: false, error: err.name });
        return;
      }
      // automatic login after register
      const newUser = user;
      if (req.body.firstname) newUser.firstname = req.body.firstname;
      if (req.body.lastname) newUser.lastname = req.body.lastname;
      user
        .save()
        .then(() => {
          passport.authenticate("local")(req, res, () => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ success: true, status: "Registration Successful" });
          });
        })
        .catch(sErr => {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: false, error: sErr });
        });
    }
  );
});

router.get("/github", passport.authenticate("github"));
router.get("/github/callback", passport.authenticate("github"), (req, res) => {
  if (req.user) {
    const token = getToken({ _id: req.user._id }); // create jwt and send it on login
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({ success: true, token, status: "Login Successful" });
  }
});

router.post(
  "/login",
  cors.corsWithOptions,
  passport.authenticate("local", { failureRedirect: "users/login" }),
  (req, res) => {
    const token = getToken({ _id: req.user._id }); // create jwt and send it on login
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({ success: true, token, status: "Login Successful" });
  }
);

router.get("/logout", cors.corsWithOptions, (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    const err = new Error("User Not Logged In");
    err.status = 403;
    next(err);
  }
});

router.get("/checkJWT", cors.corsWithOptions, (req, res, next) => {
  passport.authenticate("jwt", { sessions: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      return res.json({ status: "JWT invalid", success: false, err: info });
    }
    res.statusCode = 401;
    res.setHeader("Content-Type", "application/json");
    res.json({ status: "JWT valid", success: false, user });
  })(req, res, next);
});

module.exports = router;
