const bcrypt = require('bcrypt');
const connection = require("../models/dbconnection");
const passport = require('passport');
const saltRounds = 10;
const model = require('../models/user.model');

module.exports.getLogin = (req, res) => {
    res.render('users/login');
};

module.exports.postLogin = async (req, res) => {
    try {
        const userId = await connection.execute('SELECT userId FROM `users` WHERE `username` = (?)');
    } catch (e) {
    }
    

    req.login(userId, err => {
        if (err) throw err;
        res.redirect('/');
    })
};

module.exports.getLogout = (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
}

module.exports.getRegister = async (req, res) => {
    res.render('users/register');
};

module.exports.postRegister = async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    try {
        const hash = await bcrypt.hash(password, saltRounds);
        await model.create(email, username, hash);
        const [[userId],] = await model.getLastInsert();
        req.login(userId, err => {
            if (err) throw err;
            res.redirect('/');
        })
    } catch (e) {
    }
};

module.exports.getProfile = async (req, res) => {
    const userId = req.user.userId;
    try {
        const [[user],] = await model.getById(userId);
        res.render('users/profile', user);
    } catch(e) {
    }
}

passport.serializeUser(function(userId, done) {
    done(null, userId);
});

passport.deserializeUser(function(userId, done) {
    done(null, userId);
});



