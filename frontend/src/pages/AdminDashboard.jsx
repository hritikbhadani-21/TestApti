import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);

  // Redirect if not admin
  if (!user || user.role !== "admin") return <Navigate to="/unauthorized" replace />;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded shadow">
            <h2 className="font-semibold text-xl mb-2">Manage Exams</h2>
            <p>Create, edit, and delete exams.</p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h2 className="font-semibold text-xl mb-2">Upload PDFs</h2>
            <p>Upload question PDFs for auto-extraction.</p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h2 className="font-semibold text-xl mb-2">User Management</h2>
            <p>View and manage registered users.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
