const express = require('express');
const controller  = require('../controllers/director.controller');

const router = express.Router();

router.get('/:id', controller.getDirector);

module.exports = router;