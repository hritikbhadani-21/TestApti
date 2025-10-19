import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Unauthorized = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4 text-red-600">Unauthorized Access</h1>
      <p className="text-gray-700 mb-6">
        {user
          ? !user.isVerified
            ? "Your account is pending admin approval."
            : "You do not have permission to view this page."
          : "You are not logged in."}
      </p>

      {user ? (
        <button
          onClick={logout}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Login
        </Link>
      )}
    </div>
  );
};

export default Unauthorized;
