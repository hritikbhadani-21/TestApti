import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Eye, EyeOff, User } from "lucide-react";

const Login = () => {
  const { user, login, error, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (user) {
    const target = user.role === "admin" ? "/admin" : "/user";
    return <Navigate to={target} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl mb-2">Welcome Back</h1>
          <p className="text-gray-500">Login to access your exams</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="login-email" className="block text-gray-700">Email Address</label>
            <input
              id="login-email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="login-password" className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
              loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
