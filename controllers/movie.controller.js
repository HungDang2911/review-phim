const model = require('../models/movie.model');

module.exports.getMovie = async (req, res) => {
  const movieId = req.params.id;
  const [[movie]] = await model.getById(movieId);
  const [actors] = await model.getActorsByMovieId(movieId);
  const [directors] = await model.getDirectorsByMovieId(movieId);
  const [comments] = await model.getCommentsByMovieId(movieId);

  for (let i = 0; i < comments.length; i++) {
      const [[{username}],] = await (require('../models/user.model').getNameById(comments[i].userId));
      comments[i].username = username;
    }

  console.log(comments);

  res.render('movie', { movie, actors, directors, comments });
};

module.exports.postComment = async (req, res) => {
  const comment = req.body;
  comment.movieId = req.params.id;
  comment.userId = req.user.userId;
  comment.commentDate = new Date();
  await model.createComment(comment);

  res.redirect('/');
};
