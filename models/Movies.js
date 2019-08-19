const mongoose = require("mongoose");
const mongodbErrorHandler = require("mongoose-mongodb-errors");

const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "Please enter movie title"
  },
  year: {
    type: Number,
    trim: true,
    required: "Please enter movie release year"
  },
  director: {
    type: String,
    trim: true,
    required: "Please enter movie director"
  },
  genre_id: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Genres",
      required: "Please enter movie genre"
    }
  ]
});

moviesSchema.statics.getMoviesByGenres = function() {
  return this.aggregate([
    { $unwind: "$genre_id" },
    { $group: { _id: "$genre_id", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
};

moviesSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model("Movies", moviesSchema);
