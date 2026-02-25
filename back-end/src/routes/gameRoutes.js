const express = require('express');
const { body } = require('express-validator');
const gameController = require('../controllers/gameController');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/questions', authMiddleware, gameController.getQuestions);

router.post('/game/score', authMiddleware, [
  body('score').isInt({ min: 0 }).withMessage('Score must be a non-negative integer'),
  body('totalQuestions').isInt({ min: 1 }).withMessage('Total questions must be a positive integer'),
  body('timestamp').notEmpty().withMessage('Timestamp is required'),
], validate, gameController.submitScore);

module.exports = router;
