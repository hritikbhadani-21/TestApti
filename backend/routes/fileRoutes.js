// routes/fileRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../utils/fileUpload");
const { parseFile } = require("../controllers/fileController");

// Admin uploads PDF or Word to extract questions
router.post("/parse", upload.single("file"), parseFile);

module.exports = router;
