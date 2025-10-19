import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (err) {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Login function
  const login = async (email, password) => {
  setLoading(true);
  setError(null);
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    // ✅ Extract correct user structure
    const userData = data.user; // backend returns { user, token }
    const token = data.token;

    // Save properly
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);

    console.log("✅ Login successful:", userData);

    // Redirect based on role
    if (userData.role === "admin") navigate("/admin");
    else navigate("/user");
  } catch (err) {
    console.error("❌ Login error:", err.response || err);
    setError(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};


  // Register function
  const register = async (name, email, password, role = "user") => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password, role },
        { headers: { "Content-Type": "application/json" } }
      );

      // Registration successful, but account needs admin approval
      alert("Registration successful! Pending admin approval.");

    } catch (err) {
      console.error("Registration error:", err.response || err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
