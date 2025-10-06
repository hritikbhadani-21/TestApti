const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // <-- your Vite frontend URL
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
