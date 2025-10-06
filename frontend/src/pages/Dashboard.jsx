import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button
        onClick={logout}
        className="mt-4 bg-red-500 text-white p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};
//update
export default Dashboard;
