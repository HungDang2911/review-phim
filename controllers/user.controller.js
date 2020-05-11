const bcrypt = require('bcrypt');
const connection = require("../models/dbconnection");
const passport = require('passport');
const saltRounds = 10;
const model = require('../models/user.model');

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
        if (err) throw err;
        model.create({username, hash, email}, () => {
            model.getLastInsert((userId) => {
                req.login(userId, function(err) {
                    res.redirect('/');
                });
            });
        })
    }); 
};

module.exports.getProfile = (req, res) => {
    const userId = req.user.userId;
    
    model.getById(userId, function(err, results) {
        if (err) throw err;
        
        const user = results[0];

        res.render('users/profile', user);
    });
}



passport.serializeUser(function(userId, done) {
    done(null, userId);
});

passport.deserializeUser(function(userId, done) {
    done(null, userId);
});



