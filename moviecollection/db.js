var mongoose = require( 'mongoose' );

var mongoConnectionString;
if (process.env.MONGODB_URI) {
  mongoConnectionString = process.env.MONGODB_URI;
} else {
  mongoConnectionString = 'mongodb://localhost/movie_collection';
};

// establishes a database connection which may in some cases need to be manually closed ... use db.disconnect();
mongoose.connect(mongoConnectionString);

module.exports = mongoose;
