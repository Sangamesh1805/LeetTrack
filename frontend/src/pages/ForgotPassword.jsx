import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/forgot-password", {
        email,
      });

      setMessage(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            to="/login"
            className="text-3xl font-bold hover:text-purple-400 transition"
          >
            LeetTrack
          </Link>

          <p className="text-gray-400 mt-3">Reset your password</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
          <div className="mb-7">
            <h1 className="text-2xl font-bold">Forgot password?</h1>

            <p className="text-gray-500 text-sm mt-2">
              Enter your email and we'll send you a password reset link.
            </p>
          </div>

          {message && (
            <div className="mb-5 px-4 py-3 rounded-lg border border-green-900 bg-green-950/40 text-green-400 text-sm">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg border border-red-900 bg-red-950/40 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-7 text-center">
            <Link
              to="/login"
              className="text-sm text-purple-400 hover:text-purple-300 transition"
            >
              ← Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
