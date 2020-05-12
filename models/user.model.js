const connection = require('./dbconnection');

module.exports = {
    create: function(email, username, password, callback) {
        connection
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