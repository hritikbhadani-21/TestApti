// controllers/examController.js
// NOTE: replace with your actual Exam model & validation
const Exam = require("../models/Exam"); // create this model if not present

const createExam = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const exam = await Exam.create({ title, questions, createdBy: req.user._id });
    res.status(201).json(exam);
  } catch (err) {
    console.error("createExam error:", err);
    res.status(500).json({ message: err.message });
  }
};

const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (err) {
    console.error("getAllExams error:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createExam, getAllExams };
