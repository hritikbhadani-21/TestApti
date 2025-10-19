const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }], // ["A","B","C","D"]
  correctAnswer: { type: String, required: true }, // must be one of options
}, { timestamps: true });

module.exports = mongoose.model("Question", QuestionSchema);
