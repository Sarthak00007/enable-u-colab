require('dotenv').config();

module.exports = {
  port: process.env.PORT || 8000,
  jwtSecret: process.env.JWT_SECRET || 'fallback-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  dbPath: process.env.DB_PATH || './data/enableu.db',
};
