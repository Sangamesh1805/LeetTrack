import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-lg text-gray-400">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-5 sm:px-6 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300/80 mb-3">
            Account
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Profile
          </h1>
          <p className="text-gray-400 mt-2">
            Your identity and sign-in details in LeetTrack.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white/[0.035] border border-white/8 rounded-2xl p-5 sm:p-8 shadow-2xl shadow-black/10">
          <div className="flex items-center gap-4 sm:gap-5 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-purple-600/90 flex items-center justify-center text-2xl font-bold shadow-lg shadow-purple-950/30">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold">
                {user?.name}
              </h2>

              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>

          <div className="border-t border-white/8 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 mb-5">
              Account information
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500 mb-1">Name</p>

                <p className="text-base text-gray-200">{user?.name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>

                <p className="text-base text-gray-200 break-all">
                  {user?.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Authentication</p>

                <p className="text-base text-gray-200">
                  {user?.authProvider === "GOOGLE"
                    ? "Google"
                    : "Email & Password"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
