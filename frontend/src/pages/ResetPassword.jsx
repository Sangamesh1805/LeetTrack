import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/reset-password", {
        token,
        password,
      });

      setSuccess(
        "Password reset successfully. You can now log in with your new password.",
      );

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.response?.data ||
          "Unable to reset password. The link may be invalid or expired.",
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

          <p className="text-gray-400 mt-3">Create a new password</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
          <div className="mb-7">
            <h1 className="text-2xl font-bold">Reset password</h1>

            <p className="text-gray-500 text-sm mt-2">
              Enter your new password below.
            </p>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg border border-red-900 bg-red-950/40 text-red-400 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-5 px-4 py-3 rounded-lg border border-green-900 bg-green-950/40 text-green-400 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                New Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter new password"
                  autoComplete="new-password"
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm new password"
                autoComplete="new-password"
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
              {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
