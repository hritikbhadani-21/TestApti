import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { user, register, error, loading } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(name, email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {/* Error message */}
        {error && (
          <p className="text-red-500 text-center mb-3 font-medium">{error}</p>
        )}

        <input
          className="w-full border p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="w-full border p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full border p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className={`w-full p-2 rounded text-white ${
            loading ? "bg-green-300" : "bg-green-500 hover:bg-green-600"
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
