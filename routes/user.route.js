const express = require('express');
const bcrypt = require('bcrypt');
const connection = require("../models/dbconnection");
const validate = require("../validate/user.validate");
const auth = require('../middlewares/auth.middleware');
const passport = require('passport');
const controller = require('../controllers/user.controller')

const router = express.Router();

router.get('/login', controller.getLogin);

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

router.get('/profile', controller.getProfile);


module.exports = router;
