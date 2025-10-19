// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const fileRoutes = require('./routes/fileRoutes');
const resultRoutes = require("./routes/resultRoutes");


// Load env variables
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const examRoutes = require("./routes/examRoutes");
const questionRoutes = require("./routes/questionRoutes");

app.get("/", (req, res) => res.send("✅ AptExam API is running..."));

app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/file", fileRoutes); // NEW
app.use("/api/questions", questionRoutes);
app.use("/api/results", resultRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
