const express = require('express');
const bcrypt = require('bcrypt');
const connection = require("../models/dbconnection");
const validate = require("../validate/user.validate");
const auth = require('../middlewares/auth.middleware');
const passport = require('passport');
const controller = require('../controllers/user.controller')

const saltRounds = 10;

const router = express.Router();

router.get('/login', function(req, res) {
    res.render('users/login');
});

router.post('/login', validate.validateLogin, validate.handleErrors, passport.authenticate(
    'local', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/login'
    }
));

router.get('/logout', controller.getLogout);

router.get('/register', function(req, res) {
    res.render('users/register');
});


router.post('/register', validate.validateRegister, validate.handleErrors, controller.postRegister);


module.exports = router;
