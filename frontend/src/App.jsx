import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Unauthorized from "./pages/Unauthorized";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin route */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          </PrivateRoute>
        }
      />

      {/* User route */}
      <Route
        path="/user"
        element={
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        }
      />

      {/* Unauthorized */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Catch-all for unknown routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
