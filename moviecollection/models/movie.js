var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var MovieSchema = new Schema(
  {
    name : {
      type: String,
      required: true
    },
    description : String,
      poster: String,
      genre: String,
      year: String,
      rating: String,
      cast: String
  },
  {
    timestamps: {
      // include timestamp attributes in the schema and automatically assign values on create and update, respectively
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);


module.exports = mongoose.model('Movie', MovieSchema);
