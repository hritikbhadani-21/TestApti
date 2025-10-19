const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
      selectedOption: String
    }
  ],
  score: Number,
  warnings: { type: Number, default: 0 } // tab-switch/fullscreen violations
}, { timestamps: true });

module.exports = mongoose.model("Result", ResultSchema);
