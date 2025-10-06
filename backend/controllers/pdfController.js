// controllers/pdfController.js
// Placeholder handlers: implement file upload and parsing logic
const uploadPdf = async (req, res) => {
  // implement file handling (multer, s3, etc.)
  res.status(200).json({ message: "pdf upload placeholder" });
};

const listPdfs = async (req, res) => {
  // list uploaded pdf entries from DB
  res.status(200).json({ message: "pdf list placeholder" });
};

module.exports = { uploadPdf, listPdfs };
