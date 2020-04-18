const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const connection = require("../models/dbconnecttion");
const validate = require("../validate/user.validate");

const router = express.Router();

router.get('/login', function(req, res) {
    res.render('users/login');
});

router.get('/register', function(req, res) {
    res.render('users/register');
});

router.post('/register', function(req, res) {
    console.log(req.body);
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        let createUserSql = 'INSERT INTO users(username, password) VALUES (?, ?)';
        connection.query(createUserSql, [req.body.username, hash], function(err, res, field) {
        });
    }); 
    res.redirect('/users/login');
});

module.exports = router;
