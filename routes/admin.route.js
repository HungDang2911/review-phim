const express = require('express');

const controller = require('../controllers/admin.controller');

const router = express.Router();

router.get('/', controller.getAdmin);

router.get('/movies', controller.getMovies);

router.post('/movies', controller.postMovies);

module.exports = router;