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
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Profile</h1>
          <p className="text-gray-400 mt-2">Manage your LeetTrack account</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-2xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl font-semibold">{user?.name}</h2>

              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Name</p>

              <p className="text-lg text-gray-200">{user?.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>

              <p className="text-lg text-gray-200">{user?.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Authentication</p>

              <p className="text-lg text-gray-200">
                {user?.authProvider === "GOOGLE"
                  ? "Google"
                  : "Email & Password"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
