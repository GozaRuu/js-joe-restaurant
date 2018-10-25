const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require("../config/passport.config").verifyUser;
const Comments = require("../models/comments");
const cors = require("../config/cors.config");
const verifyAdminRights = require("../common/verify-admin-rights")
  .verifyAdminRights;
const verifyUserRights = require("../common/verify-user-rights")
  .verifyUserRightsForCommenting;

const commentRouter = express.Router();
commentRouter.use(bodyParser.json());

commentRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Comments.find(req.query)
      .populate("author")
      .then(comments => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(comments);
      })
      .catch(err => next(err));
  })
  .post(cors.corsWithOptions, authenticate, (req, res, next) => {
    if (req.body !== null) {
      req.body.author = req.user._id;
      Comments.create(req.body)
        .then(comments => {
          Comments.findById(comments._id)
            .populate("author")
            .then(populatedComments => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(populatedComments);
            });
        })
        .catch(err => next(err));
    } else {
      const err = new Error("Empty Comment Request");
      err.status = 400;
      return next(err);
    }
  })
  .put(cors.corsWithOptions, authenticate, (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /comments");
  })
  .delete(
    cors.corsWithOptions,
    authenticate,
    verifyAdminRights,
    (req, res, next) => {
      Comments.remove(req.body)
        .then(resp => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        })
        .catch(err => next(err));
    }
  );

commentRouter
  .route("/:commentId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Comments.findById(req.params.commentId)
      .populate("author")
      .then(comment => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(comment);
      })
      .catch(err => next(err));
  })
  .post(cors.corsWithOptions, authenticate, (req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /comments/${req.params.commentId}`
    );
  })
  .put(
    cors.corsWithOptions,
    authenticate,
    verifyUserRights,
    (req, res, next) => {
      Comments.findById(req.params.commentId)
        .populate("author")
        .then(comment => {
          req.body.author = comment.author._id;
          Comments.findByIdAndUpdate(
            req.params.commentId,
            { $set: req.body },
            { new: true }
          )
            .then(updatedComment => {
              Comments.findById(updatedComment._id)
                .populate("author")
                .then(populatedUpdatedComment => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(populatedUpdatedComment);
                })
                .catch(err => next(err));
            })
            .catch(err => next(err));
        })
        .catch(err => next(err));
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate,
    verifyUserRights,
    (req, res, next) => {
      Comments.findById(req.params.commentId)
        .then(comment => {
          req.body.author = comment.author._id;
          Comments.findByIdAndRemove(req.params.commentId)
            .then(resp => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(resp);
            })
            .catch(err => next(err));
        })
        .catch(err => next(err));
    }
  );

module.exports = commentRouter;
