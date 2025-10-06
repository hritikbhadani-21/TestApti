import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { User } from "lucide-react";

const Register = () => {
  const { user, register, error, loading } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Redirect if already logged in
  if (user) {
    const target = user.role === "admin" ? "/admin" : "/user";
    return <Navigate to={target} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    await register(name, email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl mb-2">Create Your Account</h1>
          <p className="text-gray-500">Sign up to access AptExam</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="signup-name" className="block text-gray-700">Full Name</label>
            <input
              id="signup-name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="signup-email" className="block text-gray-700">Email Address</label>
            <input
              id="signup-email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="signup-password" className="block text-gray-700">Password</label>
            <input
              id="signup-password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirm-password" className="block text-gray-700">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
              loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
