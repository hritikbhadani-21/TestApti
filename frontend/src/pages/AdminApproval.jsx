import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AdminApproval = () => {
  const { user, token } = useContext(AuthContext);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const pending = res.data.filter((u) => !u.isVerified);
      setPendingUsers(pending);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role !== "admin" && user?.role !== "superadmin") {
      setError("Access denied. Admins only.");
      return;
    }
    fetchUsers();
  }, []);

  const handleApprove = async (userId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/auth/approve/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPendingUsers(pendingUsers.filter((u) => u._id !== userId));
    } catch (err) {
      setError("Failed to approve user");
    }
  };

  const handleReject = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/reject/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingUsers(pendingUsers.filter((u) => u._id !== userId));
    } catch (err) {
      setError("Failed to reject user");
    }
  };

  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;
  if (loading) return <p className="text-center mt-4">Loading pending users...</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Pending User Approvals</h1>
      {pendingUsers.length === 0 ? (
        <p>No pending users</p>
      ) : (
        <div className="grid gap-4">
          {pendingUsers.map((u) => (
            <div
              key={u._id}
              className="p-4 bg-white rounded shadow flex justify-between items-center"
            >
              <div>
                <p><strong>Name:</strong> {u.name}</p>
                <p><strong>Email:</strong> {u.email}</p>
                <p><strong>Organization:</strong> {u.organization}</p>
                <p><strong>Role:</strong> {u.role}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleApprove(u._id)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(u._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminApproval;
