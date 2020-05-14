const model = require("../models/movie.model");

module.exports.getAdmin = (req, res) => {
  res.render('admin/admin');
};

module.exports.getMovies = (req, res) => {
  res.render('admin/movies');
};

module.exports.postMovies = (req, res) => {
  const movie = req.body;

  model.create(movie, (err) => {
    if (err) throw err;
    res.redirect('/movies');
  });
};

module.exports.getActors = (req, res) => {
  res.render('admin/movies');
};

module.exports.postActors = (req, res) => {
  const actor = req.body;

  model.create(actor, (err) => {
    if (err) throw err;
    res.redirect('/movies');
  });
};
