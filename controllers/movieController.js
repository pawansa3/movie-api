const Movies = require("../models/Movies");

exports.getAllMovies = function(req, res) {
  // localhost:3000/api/movies?skip=3&limit=2&order=asc
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  const order = req.query.order;
  Movies.find()
    .skip(skip)
    .sort({ _id: order })
    .limit(limit)
    .populate("genre_id")
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.json(doc);
    });
};

exports.getAMovies = function(req, res) {
  // localhost:3000/api/movie?id=5d5a9556ba708931f47d1e0e
  const id = req.query.id;
  Movies.findById(id)
    .populate("genre_id")
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.json(doc);
    });
};

exports.createMovies = function(req, res) {
  // localhost:3000/api/movie
  const movie = new Movies(req.body);
  movie.save((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ doc, success: true });
  });
};

exports.updateMovies = function(req, res) {
  // localhost:3000/api/movie/update?id=5d5a9556ba708931f47d1e0e
  const id = req.query.id;
  Movies.findByIdAndUpdate(id, req.body, { new: true }, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ doc, success: true });
  });
};

exports.deleteMovies = function(req, res) {
  // localhost:3000/api/movie/delete?id=5d5a9556ba708931f47d1e0e
  const id = req.query.id;
  Movies.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true });
  });
};

exports.getMoviesCat = function(req, res) {
  // localhost:3000/api/movies_cat?genre_id=5d5a83d2c7857c32c035dcc0
  const genre = req.query.genre_id;
  const genreQuery = genre || { $exists: true };
  const genrePromise = Movies.getMoviesByGenres();
  const moviesPromise = Movies.find({ genre_id: genreQuery });
  Promise.all([genrePromise, moviesPromise])
    .then(result => res.json(result))
    .catch(err => res.status(400).send(err));
};
