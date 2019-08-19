var express = require("express");
var router = express.Router();
const movieController = require("../controllers/movieController");
const genreController = require("../controllers/genreController");

// movie routes
router.get("/api/movies", movieController.getAllMovies);
router.get("/api/movies_cat", movieController.getMoviesCat);
router.get("/api/movie", movieController.getAMovies);
router.post("/api/movie", movieController.createMovies);
router.put("/api/movie/update", movieController.updateMovies);
router.delete("/api/movie/delete", movieController.deleteMovies);

// genre routes
router.get("/api/genres", genreController.getAllGenres);
router.get("/api/genre", genreController.getAGenres);
router.post("/api/genre", genreController.createGenres);
router.put("/api/genre/update", genreController.updateGenres);
router.delete("/api/genre/delete", genreController.deleteGenres);

module.exports = router;
