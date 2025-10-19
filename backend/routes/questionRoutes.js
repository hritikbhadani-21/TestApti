const express = require("express");
const router = express.Router();
const { saveQuestions } = require("../controllers/questionController");

// Admin saves reviewed questions
router.post("/save", saveQuestions);

module.exports = router;
