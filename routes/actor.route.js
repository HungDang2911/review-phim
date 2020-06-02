const express = require('express');
const controller  = require('../controllers/actor.controller');

const router = express.Router();

router.get('/:id', controller.getActor);

module.exports = router;