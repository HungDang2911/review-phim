const connection = require('./dbconnection');

module.exports = {
    create: function(user, callback) {
        connection.query('INSERT INTO users(username, password, email) VALUES (?, ?, ?)', [user.username, user.hash, user.email], function(err, results) {
            if (err) throw err;
            callback();
        });
    },

    getAll: function(callback) {
        connection.query('SELECT * FROM `users`', callback);
    },

    getById: function(id, callback) {
        connection.query('SELECT * FROM users WHERE userId = ?', [id], function(err, results) {
            if (err) throw err;
            callback(results[0]);
        });
    },

    getByName: function(name, callback) {
        connection.query('SELECT * FROM `users` WHERE `username` = (?)', function(err, results) {
            if (err) throw err;
            callback(results[0]);
        })
    },

    getLastInsert: function(callback) {
        connection.query('SELECT LAST_INSERT_ID() AS userId', function(error, results, fields) {
            if (error) throw error;
            callback(results[0]);
        });
    },

    update: function(id, callback) {

    },

    delete: function(id, callback) {
        connection.query('DELETE FROM `users` WHERE `id` = (?)', [id], callback);
    }
};