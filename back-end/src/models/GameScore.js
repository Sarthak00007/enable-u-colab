const db = require('../config/db');

const GameScore = {
  create(userId, score, totalQuestions, timestamp) {
    const stmt = db.prepare(
      'INSERT INTO game_scores (userId, score, totalQuestions, timestamp) VALUES (?, ?, ?, ?)'
    );
    return stmt.run(userId, score, totalQuestions, timestamp);
  },

  getStatsByUserId(userId) {
    return db.prepare(`
      SELECT
        COUNT(*) as gamesPlayed,
        COALESCE(SUM(score), 0) as totalScore,
        COALESCE(ROUND(AVG(score), 1), 0) as avgScore
      FROM game_scores
      WHERE userId = ?
    `).get(userId);
  },

  getLeaderboard(limit = 10) {
    return db.prepare(`
      SELECT
        u.id,
        u.fullName as name,
        COALESCE(SUM(gs.score), 0) as score
      FROM users u
      LEFT JOIN game_scores gs ON u.id = gs.userId
      GROUP BY u.id
      HAVING score > 0
      ORDER BY score DESC
      LIMIT ?
    `).all(limit);
  },

  getRank(userId) {
    const row = db.prepare(`
      SELECT COUNT(*) + 1 as rank
      FROM (
        SELECT userId, SUM(score) as totalScore
        FROM game_scores
        GROUP BY userId
      ) ranked
      WHERE ranked.totalScore > (
        SELECT COALESCE(SUM(score), 0)
        FROM game_scores
        WHERE userId = ?
      )
    `).get(userId);
    return row ? row.rank : 1;
  },
};

module.exports = GameScore;
