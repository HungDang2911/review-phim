const connection = require('./dbconnection');

module.exports = {
  create: (email, username, hash) =>
    connection.execute(
      'INSERT INTO users(username, password, email) VALUES (?, ?, ?)',
      [username, hash, email]
    ),

  getAll: () => connection.execute('SELECT * FROM `users`'),

  getById: (id) =>
    connection.execute('SELECT * FROM users WHERE userId = ?', [id]),

  getByName: (name) =>
    connection.execute('SELECT * FROM `users` WHERE `username` = (?)', [name]),

  getLastInsert: () => connection.execute('SELECT LAST_INSERT_ID() AS userId'),

  delete: (id) =>
    connection.execute('DELETE FROM `users` WHERE `id` = (?)', [id]),
};
