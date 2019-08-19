const Genres = require("../models/Genres");

exports.getAllGenres = function(req, res) {
  // localhost:3000/api/genres?skip=3&limit=2&order=asc
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  const order = req.query.order;
  Genres.find()
    .skip(skip)
    .sort({ _id: order })
    .limit(limit)
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.json(doc);
    });
};

exports.getAGenres = function(req, res) {
  // localhost:3000/api/genre?id=5d5a83d2c7857c32c035dcc0
  const id = req.query.id;
  Genres.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.json(doc);
  });
};

exports.createGenres = function(req, res) {
  // localhost:3000/api/genres
  const genre = new Genres(req.body);
  genre.save((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ doc, success: true });
  });
};

exports.updateGenres = function(req, res) {
  // localhost:3000/api/genres/update?id=5d5a83d2c7857c32c035dcc0
  const id = req.query.id;
  Genres.findByIdAndUpdate(id, req.body, { new: true }, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ doc, success: true });
  });
};

exports.deleteGenres = function(req, res) {
  // localhost:3000/api/genres/delete?id=5d5a83d2c7857c32c035dcc0
  const id = req.query.id;
  Genres.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true });
  });
};
