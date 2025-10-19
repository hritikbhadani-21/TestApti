const express = require("express");
const router = express.Router();
const { submitResult } = require("../controllers/resultController");

// Submit exam answers
router.post("/submit", submitResult);

module.exports = router;
