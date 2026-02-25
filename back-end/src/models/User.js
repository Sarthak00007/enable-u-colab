const db = require('../config/db');

const User = {
  create(fullName, email, hashedPassword) {
    const stmt = db.prepare(
      'INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)'
    );
    const result = stmt.run(fullName, email, hashedPassword);
    return { id: result.lastInsertRowid, fullName, email };
  },

  findByEmail(email) {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  },

  findById(id) {
    return db.prepare('SELECT id, fullName, email, createdAt FROM users WHERE id = ?').get(id);
  },
};

module.exports = User;
