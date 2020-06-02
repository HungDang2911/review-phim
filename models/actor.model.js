const connection = require('./dbconnection');

module.exports = {
  getAll: () => connection.execute('SELECT * FROM actors'),

  getById: (id) => connection.execute('SELECT * FROM actors WHERE actorId = ?', [id]),

  getMovieByActorId: (actorId) =>
    connection.execute(
      'SELECT movies.movieId,`movieName`,`posterLink` FROM `movies` LEFT JOIN `movies_actors` ON movies.movieId = movies_actors.movieId WHERE movies_actors.actorId = (?)',
      [actorId]
    ),

  delete: (id) =>
    connection.query('DELETE FROM `actors` WHERE `id` = (?)', [id]),
};
