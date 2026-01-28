
const express = require('express');
const router = express.Router();
const controller = require('../controllers/pollController');

router.get('/', controller.getPolls);
router.get('/:id', controller.getPollById);
router.post('/', controller.createPoll);
router.post('/:id/vote', controller.vote);
router.get('/:id/results', controller.getResults);

module.exports = router;
