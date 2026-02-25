const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/env');
const User = require('../models/User');
const GameScore = require('../models/GameScore');

const authController = {
  register(req, res) {
    const { fullName, email, password } = req.body;

    const existing = User.findByEmail(email);
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    User.create(fullName, email, hashedPassword);

    res.status(201).json({ message: 'User registered successfully' });
  },

  login(req, res) {
    const { email, password } = req.body;

    const user = User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    res.json({
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  },

  forgotPassword(req, res) {
    const { email } = req.body;

    const user = User.findByEmail(email);
    if (user) {
      console.log(`[MOCK EMAIL] Password reset link sent to: ${email}`);
      console.log(`[MOCK EMAIL] Reset token would be generated for user ID: ${user.id}`);
    }

    // Always return success to prevent email enumeration
    res.json({ message: 'Reset link sent to your email' });
  },

  getStats(req, res) {
    const stats = GameScore.getStatsByUserId(req.user.id);
    const rank = GameScore.getRank(req.user.id);

    res.json({
      gamesPlayed: stats.gamesPlayed,
      totalScore: stats.totalScore,
      avgScore: stats.avgScore,
      rank,
    });
  },

  getLeaderboard(req, res) {
    const leaderboard = GameScore.getLeaderboard(10);
    res.json(leaderboard);
  },
};

module.exports = authController;
