// routes/examRoutes.js
const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { createExam, getAllExams } = require("../controllers/examController");

const router = express.Router();

// apply protect + admin check to all routes in this router
router.use(protect, authorizeRoles("admin"));

// admin-only endpoints
router.post("/create", createExam);
router.get("/all", getAllExams);
router.put("/:id", (req, res) => res.status(200).json({ message: "update placeholder" }));
router.delete("/:id", (req, res) => res.status(200).json({ message: "delete placeholder" }));

module.exports = router;
