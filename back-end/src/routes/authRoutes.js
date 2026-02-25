const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

// Public routes
router.post('/register', [
  body('fullName').trim().notEmpty().withMessage('Full name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Invalid email address').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], validate, authController.register);

router.post('/login', [
  body('email').isEmail().withMessage('Invalid email address').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
], validate, authController.login);

router.post('/forgot-password', [
  body('email').isEmail().withMessage('Invalid email address').normalizeEmail(),
], validate, authController.forgotPassword);

// Protected routes
router.get('/stats', authMiddleware, authController.getStats);
router.get('/leaderboard', authMiddleware, authController.getLeaderboard);

module.exports = router;
