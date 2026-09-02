import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
      setError(error.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md">
        {/* Logo / Heading */}
        <div className="text-center mb-8">
          <Link
            to="/login"
            className="text-3xl font-bold hover:text-purple-400 transition"
          >
            LeetTrack
          </Link>

          <p className="text-gray-400 mt-3">Track your LeetCode journey</p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
          <div className="mb-7">
            <h1 className="text-2xl font-bold">Welcome back</h1>

            <p className="text-gray-500 text-sm mt-2">
              Sign in to continue tracking your progress.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg border border-red-900 bg-red-950/40 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
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
                className="
                  w-full
                  px-4
                  py-3
                  rounded-lg
                  bg-gray-950
                  border
                  border-gray-800
                  text-white
                  placeholder-gray-600
                  outline-none
                  transition
                  focus:border-purple-500
                  focus:ring-1
                  focus:ring-purple-500
                "
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Password
                </label>
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
                  className="
                    w-full
                    px-4
                    py-3
                    pr-20
                    rounded-lg
                    bg-gray-950
                    border
                    border-gray-800
                    text-white
                    placeholder-gray-600
                    outline-none
                    transition
                    focus:border-purple-500
                    focus:ring-1
                    focus:ring-purple-500
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-sm
                    text-gray-500
                    hover:text-gray-300
                    transition
                  "
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                py-3
                rounded-lg
                bg-purple-600
                hover:bg-purple-700
                disabled:bg-purple-900
                disabled:text-gray-500
                disabled:cursor-not-allowed
                font-semibold
                transition
              "
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Register */}
          <div className="mt-7 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-purple-400 hover:text-purple-300 font-medium transition"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-600 mt-6">
          Practice smarter. Track consistently. Improve continuously.
        </p>
      </div>
    </div>
  );
}

export default Login;
