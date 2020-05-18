const connection = require('./dbconnection');

module.exports = {
  create: (movie) => {
    connection.execute(
      'INSERT INTO movies (movieName, genre, releaseDate, movieTime, trailerLink, movieDescription) VALUES (?, ?, ?, ?, ?, ?)',
      [
        movie.name,
        movie.genre,
        movie.releaseDate,
        movie.time,
        movie.trailerLink,
        movie.description,
      ]
    );
  },

  createComment: (comment) =>
    connection.execute(
      'INSERT INTO moviecomments (movieId, userId, commentDate, commentContent) VALUES (?, ?, ?, ?)',
      [comment.movieId, comment.userId, comment.commentDate, comment.commentContent]
    ),

  getAll: () => connection.execute('SELECT * FROM `movies'),

  getById: (id) =>
    connection.execute('SELECT * FROM movies WHERE movieId = ?', [id]),

  getByName: (name) =>
    connection.execute('SELECT * FROM `movies` WHERE movieName = ?', [name]),

  getActorsByMovieId: (movieId) =>
    connection.execute(
      'SELECT actors.actorId,`actorName`,`imageLink` FROM `actors` LEFT JOIN `movies_actors` ON actors.actorId = movies_actors.actorId WHERE movies_actors.movieId = (?)',
      [movieId]
    ),

  getDirectorsByMovieId: (movieId) =>
    connection.execute(
      'SELECT directors.directorId,`directorName`,`imageLink` FROM `directors` LEFT JOIN `movies_directors` ON directors.directorId = movies_directors.directorId WHERE movies_directors.movieId = (?)',
      [movieId]
    ),

  getGenre: () => connection.query('SELECT * FROM moviegenres'),

  getCommentsByMovieId: (movieId) =>
    connection.execute(
      'SELECT * FROM moviecomments WHERE movieId = ? ORDER BY commentDate DESC',
      [movieId]
    ),

  delete: (id) =>
    connection.query('DELETE FROM `users` WHERE `id` = (?)', [id]),
};
