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
  const navigate = useNavigate(); // ✅ must be inside component

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

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      console.log("Login successful:", data);

      // ✅ Redirect by role
      if (data.role === "admin") navigate("/admin");
      else navigate("/user");
    } catch (err) {
      console.error("Login error:", err.response || err);
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

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      console.log("Registration successful:", data);

      // ✅ Redirect by role
      if (data.role === "admin") navigate("/admin");
      else navigate("/user");
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
    navigate("/"); // ✅ redirect to landing or login page
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
