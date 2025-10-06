import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600 text-white">
      <h1 className="text-5xl font-bold mb-6 text-center">Welcome to AptExam</h1>
      <p className="text-lg mb-8 text-center">Your online platform for aptitude exams</p>
      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Landing;
