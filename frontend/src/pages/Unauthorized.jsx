import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4 text-red-600">Unauthorized Access</h1>
      <p className="text-gray-700 mb-6">You do not have permission to view this page.</p>
      <Link
        to="/login"
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default Unauthorized;
