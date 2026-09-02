import { useEffect, useState } from "react";
import api from "../services/api";
import TopicCard from "../components/TopicCard";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsResponse, categoriesResponse] = await Promise.all([
          api.get("/progress/stats"),
          api.get("/progress/category-stats"),
        ]);

        setStats(statsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-lg text-gray-400">Loading...</p>
      </div>
    );
  }

  // Difficulty completion percentages
  const easyPercentage =
    stats?.easyTotal > 0 ? (stats.easySolved / stats.easyTotal) * 100 : 0;

  const mediumPercentage =
    stats?.mediumTotal > 0 ? (stats.mediumSolved / stats.mediumTotal) * 100 : 0;

  const hardPercentage =
    stats?.hardTotal > 0 ? (stats.hardSolved / stats.hardTotal) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <div className="px-6 py-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold">
              LeetTrack Dashboard
            </h1>

            <p className="text-gray-400 mt-3">
              Track your progress across 500 curated LeetCode problems
            </p>
          </div>

          {/* Overall Progress */}
          {stats && (
            <section className="mb-14">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Overall Progress</h2>

                <span className="text-sm text-gray-500">
                  {stats.solved} / {stats.totalProblems} solved
                </span>
              </div>

              {/* Main Progress Card */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">Overall Completion</p>

                    <p className="text-3xl font-bold mt-1">
                      {stats.progressPercentage.toFixed(1)}%
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-gray-500 text-sm">Remaining</p>

                    <p className="text-xl font-semibold mt-1">
                      {stats.remaining}
                    </p>
                  </div>
                </div>

                {/* Overall Progress Bar */}
                <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-3 bg-purple-600 rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(stats.progressPercentage, 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition">
                  <p className="text-gray-500 text-sm">Total Problems</p>

                  <p className="text-3xl font-bold mt-2">
                    {stats.totalProblems}
                  </p>
                </div>

                {/* Solved */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition">
                  <p className="text-gray-500 text-sm">Solved</p>

                  <p className="text-3xl font-bold mt-2">{stats.solved}</p>
                </div>

                {/* Remaining */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition">
                  <p className="text-gray-500 text-sm">Remaining</p>

                  <p className="text-3xl font-bold mt-2">{stats.remaining}</p>
                </div>

                {/* Revisions */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition">
                  <p className="text-gray-500 text-sm">Revisions</p>

                  <p className="text-3xl font-bold mt-2">
                    {stats.totalRevisions}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Difficulty Breakdown */}
          {stats && (
            <section className="mb-14">
              <h2 className="text-2xl font-semibold mb-6">
                Difficulty Breakdown
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Easy */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className="text-gray-400 text-sm">Easy</p>

                      <p className="text-3xl font-bold mt-1">
                        {stats.easySolved}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {stats.easySolved} / {stats.easyTotal} solved
                      </p>
                    </div>

                    <span className="text-2xl">🟢</span>
                  </div>

                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-green-500 rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.min(easyPercentage, 100)}%`,
                      }}
                    />
                  </div>

                  <div className="flex justify-between mt-2">
                    <p className="text-xs text-gray-500">
                      {easyPercentage.toFixed(1)}% complete
                    </p>

                    <p className="text-xs text-gray-600">
                      {stats.easyTotal} total
                    </p>
                  </div>
                </div>

                {/* Medium */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className="text-gray-400 text-sm">Medium</p>

                      <p className="text-3xl font-bold mt-1">
                        {stats.mediumSolved}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {stats.mediumSolved} / {stats.mediumTotal} solved
                      </p>
                    </div>

                    <span className="text-2xl">🟡</span>
                  </div>

                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-yellow-500 rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.min(mediumPercentage, 100)}%`,
                      }}
                    />
                  </div>

                  <div className="flex justify-between mt-2">
                    <p className="text-xs text-gray-500">
                      {mediumPercentage.toFixed(1)}% complete
                    </p>

                    <p className="text-xs text-gray-600">
                      {stats.mediumTotal} total
                    </p>
                  </div>
                </div>

                {/* Hard */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className="text-gray-400 text-sm">Hard</p>

                      <p className="text-3xl font-bold mt-1">
                        {stats.hardSolved}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {stats.hardSolved} / {stats.hardTotal} solved
                      </p>
                    </div>

                    <span className="text-2xl">🔴</span>
                  </div>

                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-red-500 rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.min(hardPercentage, 100)}%`,
                      }}
                    />
                  </div>

                  <div className="flex justify-between mt-2">
                    <p className="text-xs text-gray-500">
                      {hardPercentage.toFixed(1)}% complete
                    </p>

                    <p className="text-xs text-gray-600">
                      {stats.hardTotal} total
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Topics */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Topics</h2>

              <span className="text-sm text-gray-500">
                {categories.length} topics
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <TopicCard
                  key={category.category}
                  category={category.category}
                  solved={category.solved}
                  total={category.total}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
