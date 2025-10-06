import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);

  // Redirect if not logged in
  if (!user || user.role !== "user") return <Navigate to="/unauthorized" replace />;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">User Dashboard</h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded shadow">
            <h2 className="font-semibold text-xl mb-2">Available Exams</h2>
            <p>Start attempting available aptitude exams.</p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h2 className="font-semibold text-xl mb-2">Progress</h2>
            <p>Track your exam scores and performance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
