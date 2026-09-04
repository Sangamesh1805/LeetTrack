import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <AuthLayout>
      <div className="mb-5">
        <Link
          to="/login"
          className="lg:hidden text-2xl font-bold hover:text-purple-400 transition"
        >
          LeetTrack
        </Link>

        <h1 className="text-[1.7rem] font-bold mt-4 lg:mt-0">Welcome back</h1>

        <p className="text-[0.9rem] text-gray-500 mt-1.5">
          Sign in to continue tracking your progress.
        </p>
      </div>

      {error && (
        <div className="mb-4 px-3.5 py-2.5 rounded-lg border border-red-900 bg-red-950/40 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-2.5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
            className="w-full px-3.5 py-2.25 rounded-lg bg-gray-900 border border-gray-800 text-white placeholder-gray-600 outline-none transition focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>

            <Link
              to="/forgot-password"
              className="text-sm text-purple-400 hover:text-purple-300 transition"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="w-full px-3.5 py-2.25 pr-16 rounded-lg bg-gray-900 border border-gray-800 text-white placeholder-gray-600 outline-none transition focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-300 transition"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.25 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 disabled:text-gray-500 disabled:cursor-not-allowed font-semibold transition"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px bg-gray-800" />
        <span className="text-xs text-gray-600">OR</span>
        <div className="flex-1 h-px bg-gray-800" />
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full py-2.25 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-800 text-white font-semibold transition"
      >
        Continue with Google
      </button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-purple-400 hover:text-purple-300 font-medium transition"
        >
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Login;
