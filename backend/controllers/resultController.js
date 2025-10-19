const Result = require("../models/Result");
const Question = require("../models/Question");

// Submit user answers
exports.submitResult = async (req, res) => {
  try {
    const { userId, examId, answers, warnings } = req.body;

    if (!userId || !examId || !answers) {
      return res.status(400).json({ message: "Missing required data" });
    }

    // Calculate score
    let score = 0;
    for (let ans of answers) {
      const question = await Question.findById(ans.questionId);
      if (question && question.correctAnswer === ans.selectedOption) {
        score += 1;
      }
    }

    const result = new Result({
      userId,
      examId,
      answers,
      score,
      warnings: warnings || 0
    });

    await result.save();

    res.status(200).json({ success: true, message: "Exam submitted", result });
  } catch (error) {
    console.error("❌ Submit Result Error:", error);
    res.status(500).json({ message: "Failed to submit result" });
  }
};
