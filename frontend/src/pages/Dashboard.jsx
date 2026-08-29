import { useEffect, useState } from "react";
import api from "../services/api";
import TopicCard from "../components/TopicCard";

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

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-10">
          LeetTrack Dashboard
        </h1>

        {/* Overall Progress */}
        {stats && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Overall Progress</h2>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-gray-900 border border-gray-800 rounded-xl px-6 py-4">
                <p className="text-gray-400 text-sm">Total Problems</p>
                <p className="text-2xl font-bold">{stats.totalProblems}</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl px-6 py-4">
                <p className="text-gray-400 text-sm">Solved</p>
                <p className="text-2xl font-bold">{stats.solved}</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl px-6 py-4">
                <p className="text-gray-400 text-sm">Remaining</p>
                <p className="text-2xl font-bold">{stats.remaining}</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl px-6 py-4">
                <p className="text-gray-400 text-sm">Progress</p>
                <p className="text-2xl font-bold">
                  {stats.progressPercentage.toFixed(1)}%
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl px-6 py-4">
                <p className="text-gray-400 text-sm">Easy</p>
                <p className="text-2xl font-bold">{stats.easySolved}</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl px-6 py-4">
                <p className="text-gray-400 text-sm">Medium</p>
                <p className="text-2xl font-bold">{stats.mediumSolved}</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl px-6 py-4">
                <p className="text-gray-400 text-sm">Hard</p>
                <p className="text-2xl font-bold">{stats.hardSolved}</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl px-6 py-4">
                <p className="text-gray-400 text-sm">Revisions</p>
                <p className="text-2xl font-bold">{stats.totalRevisions}</p>
              </div>
            </div>
          </section>
        )}

        {/* Topics */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Topics</h2>

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
  );
}

export default Dashboard;
