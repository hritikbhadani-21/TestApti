const jwt = require("jsonwebtoken");
const User = require("../models/User");

// -----------------------------
// Verify JWT Token Middleware
// -----------------------------
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided." });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Invalid token format." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found." });

    req.user = user; // attach user to request
    next();
  } catch (err) {
    console.error("verifyToken Error:", err);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

// -----------------------------
// Verify Admin or SuperAdmin
// -----------------------------
const verifyAdmin = (req, res, next) => {
  if (!req.user || (req.user.role !== "admin" && req.user.role !== "superadmin")) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };
