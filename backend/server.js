// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const examRoutes = require("./routes/examRoutes");
const pdfRoutes = require("./routes/pdfRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// public/auth routes
app.use("/api/auth", authRoutes);

// protected role-based routes
app.use("/api/exams", examRoutes);
app.use("/api/pdf", pdfRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
