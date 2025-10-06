const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOption: { type: String, required: true }
});

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  questions: [questionSchema],
  duration: { type: Number}, // in minutes
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Exam', examSchema);
