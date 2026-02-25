const db = require('../config/db');

const Question = {
  getRandom(count = 10) {
    const rows = db.prepare('SELECT * FROM questions ORDER BY RANDOM() LIMIT ?').all(count);
    return rows.map(row => ({
      ...row,
      options: JSON.parse(row.options),
    }));
  },

  bulkInsert(questions) {
    const stmt = db.prepare(
      'INSERT INTO questions (question, options, correctAnswer) VALUES (?, ?, ?)'
    );
    const insertMany = db.transaction((items) => {
      for (const q of items) {
        stmt.run(q.question, JSON.stringify(q.options), q.correctAnswer);
      }
    });
    insertMany(questions);
  },

  count() {
    return db.prepare('SELECT COUNT(*) as count FROM questions').get().count;
  },
};

module.exports = Question;
