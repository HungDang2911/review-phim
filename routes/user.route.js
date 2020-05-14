const express = require('express');
const validate = require("../validate/user.validate");
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

router.get('/register', controller.getRegister);


router.post('/register', validate.validateRegister, validate.handleErrors, controller.postRegister);

router.get('/profile', controller.getProfile);


module.exports = router;
