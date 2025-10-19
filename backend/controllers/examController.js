// backend/controllers/examController.js
const Exam = require("../models/Exam");
const Question = require("../models/Question");
// @desc    Create new exam
// @route   POST /api/exams/create
// @access  Admin
const createExam = async (req, res) => {
  try {
    const { title, duration, startTime, endTime } = req.body;

    if (!title || !duration || !startTime || !endTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exam = await Exam.create({
      title,
      duration,
      startTime,
      endTime,
      createdBy: req.user._id,
    });

    res.status(201).json({ message: "Exam created successfully", exam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating exam" });
  }
};

// @desc    Get all exams
// @route   GET /api/exams
// @access  Admin
const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate("createdBy", "name email");
    res.json(exams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching exams" });
  }
};

// @desc    Get single exam
// @route   GET /api/exams/:id
// @access  Admin
const getExamById = async (req, res) => {
  try {
    const examId = req.params.id;

    const exam = await Exam.findById(examId).populate("questions");
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    // Randomize questions for this attempt
    const shuffledQuestions = exam.questions
      .map(q => ({
        _id: q._id,
        questionText: q.questionText,
        options: q.options,
        // correctAnswer not sent to user
      }))
      .sort(() => Math.random() - 0.5);

    res.status(200).json({
      success: true,
      exam: {
        _id: exam._id,
        title: exam.title,
        duration: exam.duration,
        startTime: exam.startTime,
        endTime: exam.endTime,
        questions: shuffledQuestions,
      }
    });
  } catch (error) {
    console.error("❌ Get Exam Error:", error);
    res.status(500).json({ message: "Failed to fetch exam" });
  }
};

module.exports = { createExam, getAllExams, getExamById };
