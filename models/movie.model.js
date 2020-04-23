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
        connection.query('SELECT * FROM users WHERE userId = ?', [id], callback);
    },

    getByName: function(name, callback) {
        connection.query('SELECT * FROM `users` WHERE `username` = (?)')
    },

    delete: function(id, callback) {
        connection.query('DELETE FROM `users` WHERE `id` = (?)', [id], callback);
    }
};