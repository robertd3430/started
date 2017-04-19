var express = require('express');
var router = express.Router();

var mongooseError = require("../helpers/mongoose_error");
require("../helpers/api.js").enableAPIMethods(router);
var Movie = require("../models/movie");

/* INDEX */

router.get('/api/movies', function(req, res, next) {
  Movie.find().sort({created_at: 'desc'}).exec(function (err, bots) {
    res.okay(bots);
  });
});

/* CREATE */

router.post('/api/movies', function(req, res, next) {
  var formBot = {name: req.body.movieName, genre: req.body.movieGenre, year: req.body.movieYear, rating: req.body.movieRating, cast: req.body.movieCast, description: req.body.movieDescription};
  var newBot = new Movie({name: formBot.name, genre: formBot.genre, year: formBot.year, rating: formBot.rating, cast: formBot.cast, description: formBot.description});
  newBot.save(function(saveErr, botId) {
    if (saveErr){
      res.notFound({messages: mongooseError.toMessages(saveErr), bot: {name: formBot.name, description: formBot.description}}); // pass-back input values
    } else {
      res.okay(newBot);
    };
  });
});

/* SHOW */

router.get('/api/movies/:id', function(req, res, next) {
  var movieId = req.params.id;
  Movie.findById(movieId, function(err, bot) {
    if (err){
      res.notFound({messages: ["FIND ERROR"]});
    } else {
      res.okay(bot);
    };
  });
});

/* UPDATE */

router.post('/api/movies/:id/update', function(req, res, next) {
  var formBot = { _id: req.params.id, name: req.body.movieName, genre: req.body.movieGenre, year: req.body.movieYear, rating: req.body.movieRating, cast: req.body.movieCast, description: req.body.movieDescription};
  console.log("FORM BOT", formBot)
  Movie.findById(formBot._id, function(err, bot) {
    if (err){
      res.notFound({messages: mongooseError.toMessages(err), bot: formBot }); // pass-back form values
    } else {
      bot.name = formBot.name;
      bot.genre = formBot.genre;
      bot.year = formBot.year;
      bot.rating = formBot.rating;
      bot.cast = formBot.cast;
      bot.description = formBot.description;
      bot.save(function(saveErr, newBot) {
        if (saveErr){
          res.notFound({messages: mongooseError.toMessages(saveErr), bot: formBot }); // pass-back form values
        } else {
          res.okay(bot);
        };
      });
    };
  });
});

/* DESTROY */

router.post('/api/movies/:id/destroy', function(req, res, next) {
  var movieId = req.params.id;
  Movie.findById(movieId, function(err, bot) {
    if(err){
      res.notFound({messages: ["FIND ERROR"]})
    } else {
      bot.remove( function(rmErr, rmBot) {
        if (rmErr) {
          res.notFound({messages: ["DESTRUCTION ERROR"]})
        } else {
          res.okay({messages: ["DESTRUCTION OK"] });
        };
      });
    }

  });
});

module.exports = router;
