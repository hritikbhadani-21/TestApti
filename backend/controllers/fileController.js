// controllers/fileController.js
const fs = require("fs");
const path = require("path");

const extractQuestionsFromWord = require("../utils/wordParser");

exports.parseFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const filePath = path.join(__dirname, "../uploads", req.file.filename);
    let questions = [];

    if (req.file.mimetype === "application/pdf") {
      const pdfBuffer = fs.readFileSync(filePath);
      questions = await extractQuestionsFromPDF(pdfBuffer);
    } else {
      questions = await extractQuestionsFromWord(filePath);
    }

    // Optional: delete file after parsing
    // fs.unlinkSync(filePath);

    res.status(200).json({ success: true, questions });
  } catch (error) {
    console.error("❌ File Parse Error:", error);
    res.status(500).json({ message: error.message });
  }
};
