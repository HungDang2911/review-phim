const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = express.Router();

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "reviewphim"
})

router.get('/login', function(req, res) {
    res.render('users/login');
});

router.get('/register', function(req, res) {
    res.render('users/register');
});

router.post('/register', function(req, res) {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        let createUserSql = `INSERT INTO users(username, password)
                         VALUES ('${req.body.username}', '${hash}')`;
        con.query(createUserSql, function(err, res, field) {
        });
    }); 
    res.redirect('/users/login');
});

module.exports = router;
