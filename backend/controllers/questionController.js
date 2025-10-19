const Question = require("../models/Question");
const Exam = require("../models/Exam");

// Save reviewed questions
exports.saveQuestions = async (req, res) => {
  try {
    const { examId, questions } = req.body;

    if (!examId || !questions || !questions.length) {
      return res.status(400).json({ message: "Exam ID and questions are required" });
    }

    // Validate exam exists
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    // Save all questions
    const savedQuestions = [];
    for (let q of questions) {
      const newQ = new Question({
        examId,
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer
      });
      await newQ.save();
      savedQuestions.push(newQ._id);
    }

    // Add question IDs to exam
    exam.questions = exam.questions.concat(savedQuestions);
    await exam.save();

    res.status(200).json({ success: true, message: "Questions saved successfully", savedQuestions });
  } catch (error) {
    console.error("❌ Save Questions Error:", error);
    res.status(500).json({ message: "Failed to save questions" });
  }
};
