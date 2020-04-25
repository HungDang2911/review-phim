const express = require('express');
const bcrypt = require('bcrypt');
const connection = require("../models/dbconnection");
const validate = require("../validate/user.validate");
const auth = require('../middlewares/auth.middleware');
const passport = require('passport');
const controller = require('../controllers/movie.controller');

const router = express.Router();

router.get('/:id', controller.getMovieById);

module.exports = router;