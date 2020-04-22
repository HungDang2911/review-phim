const bcrypt = require('bcrypt');
const connection = require("../models/dbconnection");
const passport = require('passport');
const saltRounds = 10;

module.exports.getLogin = (req, res) => {
    res.render('users/login');
};

module.exports.postLogin = {};

module.exports.getLogout = (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
}

module.exports.getRegister = {};

module.exports.postRegister = (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        let createUserSql = 'INSERT INTO users(username, password, email) VALUES (?, ?, ?)';
        connection.query(createUserSql, [username, hash, email], function(error, results, fields) {
            if (error) throw(error);

            connection.query('SELECT LAST_INSERT_ID() AS userId', function(error, results, fields) {
                if (error) throw error;
                
                const userId = results[0];

                req.login(userId, function(err) {
                    res.redirect('/');
                });
            });
        });
    }); 
};



passport.serializeUser(function(userId, done) {
    done(null, userId);
});

passport.deserializeUser(function(userId, done) {
    done(null, userId);
});



