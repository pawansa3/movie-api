const mongoose = require("mongoose");
const mongodbErrorHandler = require("mongoose-mongodb-errors");

const genresSchema = new mongoose.Schema({
  genre: {
    type: String,
    required: "Please enter movie genre",
    trim: true
  }
});

genresSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model("Genres", genresSchema);
