// routes/pdfRoutes.js
const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { uploadPdf, listPdfs } = require("../controllers/pdfController");

const router = express.Router();

// admin-only for all pdf management
router.use(protect, authorizeRoles("admin"));

router.post("/upload", uploadPdf);
router.get("/list", listPdfs);

module.exports = router;
