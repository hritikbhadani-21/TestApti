import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { User } from "lucide-react";

const Register = () => {
  const { user, register, error, loading } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerType, setRegisterType] = useState("user");

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
    await register(name, email, password, registerType);
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

        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => setRegisterType("user")}
            className={`px-4 py-2 rounded-md font-semibold border ${
              registerType === "user"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-blue-600 border-blue-400 hover:bg-blue-50"
            }`}
          >
            User Register
          </button>
          <button
            type="button"
            onClick={() => setRegisterType("admin")}
            className={`px-4 py-2 rounded-md font-semibold border ${
              registerType === "admin"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-blue-600 border-blue-400 hover:bg-blue-50"
            }`}
          >
            Admin Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text" placeholder="Full Name" value={name}
            onChange={(e) => setName(e.target.value)}
            required className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            required className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            required className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="password" placeholder="Confirm Password" value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required className="w-full px-4 py-2 border rounded-md"
          />

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
              loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Registering..." : registerType === "admin" ? "Register as Admin" : "Register as User"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
