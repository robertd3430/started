module.exports = {}

module.exports.productionMovies = [
    {name:"Logan", description:"vbcvbvb", poster: "3", genre: "Superhero", year: "2017", rating: "11.0", cast: "Hugh Jackman"},  {name:"Interstellar", description:"dfdsf", poster: "2", genre: "SciFi", year: "2013", rating: "8.2", cast: "Matthew McConaughey"},
  {name:"Creed", description:"rolls around", poster: "1", genre: "Drama", year: "2016", rating: "9.9", cast: "Sylvester Stallone"}
];

module.exports.defaultMovies = function(){
  return this.productionMovies
};
