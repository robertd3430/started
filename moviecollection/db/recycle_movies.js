var Movie = require("../models/movie");
var defaultMovies = require('../db/default_movies').defaultMovies();

module.exports = function recycleMovies(){
  //console.log("RECYCLE PENDING");
  return Movie.find()
    .then(function(bots){
      //console.log("FOUND", bots.length, "RECORDS");
      return Movie.remove(bots)
        .then(function(){
          //console.log("DELETED", bots.length, "RECORDS");
          return Movie.create(defaultMovies)
            .then(function(){
              //console.log("CREATED", defaultMovies.length, "RECORDS")
              return Promise.resolve({
                deletedRobotsCount: bots.length,
                createdRobotsCount: defaultMovies.length
              })
            })
        })
    })
};
