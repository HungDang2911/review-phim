const express = require('express');
const controller = require('../controllers/movie.controller');

const router = express.Router();

router.get('/:id', controller.getMovie);

module.exports = router;