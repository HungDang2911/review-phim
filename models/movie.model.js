const connection = require('./dbconnection');

module.exports = {
    create: function(movie, callback) {
        connection.query('INSERT INTO movies (movieName, genre, releaseDate, movieTime, trailerLink, movieDescription) VALUES (?, ?, ?, ?, ?, ?)',
        [movie.name, movie.genre, movie.releaseDate, movie.time, movie.trailerLink, movie.description],
        callback);
    },

    getAll: function(callback) {
        connection.query('SELECT * FROM `users`', callback);
    },

    getById: function(id, callback) {
        connection.query('SELECT * FROM movies WHERE movieId = ?', [id], function(err, results) {
            if (err) throw err;
            const movie = results[0];

            connection.query('SELECT actors.actorId,`actorName`,`imageLink` FROM `actors` LEFT JOIN `movies_actors` ON actors.actorId = movies_actors.actorId WHERE movies_actors.movieId = (?)',
            [id], function(err, results) {
                if (err) throw err;
                const actors = results;

                callback();
            });
        });
    },

    getGenre: function(callback) {
        connection.query('SELECT * FROM moviegenres', callback);
    },

    getByName: function(name, callback) {
        // connection.query('SELECT * FROM `users` WHERE `username` = (?)')
    },

    delete: function(id, callback) {
        connection.query('DELETE FROM `users` WHERE `id` = (?)', [id], callback);
    }
};