const Question = require('../models/Question');
const GameScore = require('../models/GameScore');

const gameController = {
  getQuestions(req, res) {
    const questions = Question.getRandom(10);

    if (questions.length === 0) {
      return res.status(404).json({ message: 'No questions available. Run npm run seed first.' });
    }

    res.json(questions);
  },

  submitScore(req, res) {
    const { score, totalQuestions, timestamp } = req.body;

    GameScore.create(req.user.id, score, totalQuestions, timestamp);
    const newRank = GameScore.getRank(req.user.id);

    res.json({ message: 'Score saved successfully', newRank });
  },
};

module.exports = gameController;
