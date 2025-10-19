// backend/routes/examRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { createExam, getAllExams, getExamById } = require("../controllers/examController");

// Only admin can manage exams
router.use(protect, authorizeRoles("admin"));

router.post("/create", createExam);
router.get("/", getAllExams);
router.get("/:id", getExamById);

module.exports = router;
