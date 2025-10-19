const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ===============================
// REGISTER CONTROLLER
// ===============================
const register = async (req, res) => {
  try {
    const { name, email, password, organization, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with verification pending
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      organization,
      role: role || "user",
      isVerified: false,
      isApprovedBy: null,
    });

    await newUser.save();

    // Response message based on role
    let message = "Registration request sent! Please wait for admin approval.";
    if (role === "admin") {
      message =
        "Admin registration request sent! Awaiting Super Admin approval.";
    }

    return res.status(201).json({
      success: true,
      message,
    });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ message: "Server error during registration." });
  }
};

// ===============================
// LOGIN CONTROLLER
// ===============================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(403).json({
        message:
          "Your account is pending admin approval. Please wait for verification.",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Successful login
    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        organization: user.organization,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error during login." });
  }
};

// ===============================
// GET ALL USERS (For Admin Dashboard)
// ===============================
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password").sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    console.error("Get Users Error:", err);
    res.status(500).json({ message: "Error fetching users." });
  }
};

// ===============================
// APPROVE USER (Admin Verification)
// ===============================
const approveUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const adminId = req.user?.id; // assuming middleware adds req.user

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.isVerified = true;
    user.isApprovedBy = adminId;
    await user.save();

    res.status(200).json({ message: `${user.name} has been approved.` });
  } catch (err) {
    console.error("Approval Error:", err);
    res.status(500).json({ message: "Error approving user." });
  }
};

// ===============================
// REJECT USER (Optional)
// ===============================
const rejectUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or already deleted." });
    }

    res
      .status(200)
      .json({ message: `${user.name}'s registration has been rejected.` });
  } catch (err) {
    console.error("Rejection Error:", err);
    res.status(500).json({ message: "Error rejecting user." });
  }
};

// ===============================
// EXPORT CONTROLLERS
// ===============================
module.exports = {
  register,
  login,
  getAllUsers,
  approveUser,
  rejectUser,
};
