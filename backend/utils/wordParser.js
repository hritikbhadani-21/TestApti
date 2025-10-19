// utils/wordParser.js
const mammoth = require("mammoth");

/**
 * Extract questions + options from Word (.docx) file
 */
async function extractQuestionsFromWord(filePath) {
  try {
    const data = await mammoth.extractRawText({ path: filePath });
    const text = data.value;

    const lines = text.split("\n").map(line => line.trim()).filter(Boolean);

    const questions = [];
    let current = { questionText: "", options: [], correctAnswer: "" };

    for (let line of lines) {
      if (/^\d+\./.test(line)) {
        if (current.questionText) questions.push({ ...current });
        current = { questionText: line.replace(/^\d+\.\s*/, ""), options: [], correctAnswer: "" };
      } else if (/^[a-dA-D][\).]/.test(line)) {
        const cleanOption = line.replace(/^[a-dA-D][\).]\s*/, "").trim();
        current.options.push(cleanOption);
      } else {
        current.questionText += " " + line;
      }
    }

    if (current.questionText) questions.push(current);
    return questions;
  } catch (err) {
    console.error("❌ Word Parse Error:", err);
    throw new Error("Failed to extract questions from Word file");
  }
}

module.exports = extractQuestionsFromWord;
