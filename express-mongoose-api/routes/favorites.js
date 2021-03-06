const express = require("express");
const bodyParser = require("body-parser");
const Favorites = require("../models/favorites");
const Dishes = require("../models/dishes");
const authenticate = require("../config/passport.config").verifyUser;
const cors = require("../config/cors.config");

const favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.use("/", authenticate, (req, res, next) => {
  Favorites.findOne({ user: req.user._id })
    .populate("user")
    .populate("favs")
    .then(favorites => {
      if (!favorites) {
        Favorites.create({ user: req.user._id, favs: [] })
          .then(() => {
            Favorites.findOne({ user: req.user._id })
              .populate("user")
              .then(favoritesCreated => {
                req.favorites = favoritesCreated;
                next();
              })
              .catch(err => next(err));
          })
          .catch(err => next(err));
      } else {
        req.favorites = favorites;
        next();
      }
    })
    .catch(err => next(err));
});

favoriteRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.corsWithOptions, authenticate, (req, res) => {
    res.statusCode = 200;
    res.json(req.favorites);
  })
  .post(cors.corsWithOptions, authenticate, (req, res, next) => {
    req.body.forEach(el => {
      req.favorites.favs.push(el._id);
    });
    req.favorites
      .save()
      .then(favoriteUpdated => {
        res.statusCode = 200;
        res.json(favoriteUpdated);
      })
      .catch(err => next(err));
  })
  .put(cors.corsWithOptions, authenticate, (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /favorites");
  })
  .delete(cors.corsWithOptions, authenticate, (req, res, next) => {
    req.favorites
      .remove()
      .then(response => {
        res.statusCode = 200;
        res.json(response);
      })
      .catch(err => next(err));
  });

favoriteRouter.use("/:dishId", (req, res, next) => {
  Dishes.findById(req.params.dishId)
    .then(dish => {
      if (!dish) {
        const err = new Error(`dish ${req.params.dishId} does not exsist`);
        err.status = 404;
        next(err);
      } else {
        next();
      }
    })
    .catch(err => next(err));
});

favoriteRouter
  .route("/:dishId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.corsWithOptions, authenticate, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then(favorites => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        if (!favorites || favorites.dishes.indexOf(req.params.dishId) === -1) {
          return res.json({ exists: false, favorites: null });
        }
        res.json({ exists: false, favorites });
      })
      .catch(err => next(err));
  })
  .post(cors.corsWithOptions, authenticate, (req, res, next) => {
    const favIds = [];
    req.favorites.favs.forEach(fav => {
      favIds.push(fav._id.toString());
    });
    if (favIds.indexOf(req.params.dishId) === -1) {
      req.favorites.favs.push(req.params.dishId);
      req.favorites
        .save()
        .then(favoriteUpdated => {
          res.statusCode = 200;
          res.json(favoriteUpdated);
        })
        .catch(err => next(err));
    } else {
      const err = new Error(
        `dish ${req.params.dishId} already is in Favorites`
      );
      err.status = 400;
      next(err);
    }
  })
  .put(cors.corsWithOptions, authenticate, (req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /favorites/${req.params.dishId}`);
  })
  .delete(cors.corsWithOptions, authenticate, (req, res, next) => {
    const favIds = [];
    req.favorites.favs.forEach(fav => {
      favIds.push(fav._id.toString());
    });
    const index = favIds.indexOf(req.params.dishId);
    if (index !== -1) {
      req.favorites.favs = [
        ...req.favorites.favs.slice(index),
        ...req.favorites.favs.slice(index + 1)
      ];
      req.favorites
        .save()
        .then(favoriteUpdated => {
          res.statusCode = 200;
          res.json(favoriteUpdated);
        })
        .catch(err => next(err));
    } else {
      const err = new Error(`dish ${req.params.dishId} is not in Favorites`);
      err.status = 400;
      next(err);
    }
  });

module.exports = favoriteRouter;
