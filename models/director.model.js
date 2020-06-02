const connection = require('./dbconnection');

module.exports = {
  getAll: () => connection.execute('SELECT * FROM directors'),

  getById: (id) => connection.execute('SELECT * FROM directors WHERE directorId = ?', [id]),

  getMovieByDirectorId: (actorId) =>
    connection.execute(
      'SELECT movies.movieId,`movieName`,`posterLink` FROM `movies` LEFT JOIN `movies_directors` ON movies.movieId = movies_directors.movieId WHERE movies_directors.directorId = (?)',
      [actorId]
    ),

  delete: (id) =>
    connection.query('DELETE FROM `directors` WHERE `id` = (?)', [id]),
};
