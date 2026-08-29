import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function TopicPage() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [problems, setProblems] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopicData = async () => {
      try {
        const [problemsResponse, progressResponse] = await Promise.all([
          api.get(`/problems/category/${category}`),
          api.get("/progress"),
        ]);

        setProblems(problemsResponse.data);
        setProgress(progressResponse.data);
      } catch (error) {
        console.error("Failed to fetch topic data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopicData();
  }, [category]);

  const isSolved = (problemId) => {
    return progress.some((item) => item.problemId === problemId && item.solved);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-lg text-gray-400">Loading...</p>
      </div>
    );
  }

  const solvedCount = problems.filter((problem) => isSolved(problem.id)).length;

  const percentage =
    problems.length === 0
      ? 0
      : ((solvedCount / problems.length) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}

        <button
          onClick={() => navigate("/")}
          className="
                        mb-8
                        px-4
                        py-2
                        rounded-lg
                        bg-gray-800
                        hover:bg-gray-700
                        transition
                    "
        >
          ← Dashboard
        </button>

        {/* Topic Header */}

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">{category}</h1>

          <p className="text-gray-400">
            {solvedCount} / {problems.length} solved
          </p>

          <p className="text-gray-500 mt-1">{percentage}% complete</p>
        </div>

        {/* Problems */}

        <div className="space-y-4">
          {problems.map((problem) => {
            const solved = isSolved(problem.id);

            return (
              <div
                key={problem.id}
                className="
                                    bg-gray-900
                                    border border-gray-800
                                    rounded-xl
                                    p-5
                                    flex
                                    items-center
                                    justify-between
                                    gap-4
                                "
              >
                <div className="flex items-center gap-5">
                  <span className="text-gray-500 w-8">
                    {problem.orderIndex}
                  </span>

                  <div>
                    <h2 className="font-semibold">{problem.title}</h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {problem.difficulty}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={solved ? "text-green-400" : "text-gray-500"}>
                    {solved ? "✓ Solved" : "○ Not solved"}
                  </span>

                  <a
                    href={problem.leetcodeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="
                                            px-4
                                            py-2
                                            rounded-lg
                                            bg-purple-600
                                            hover:bg-purple-700
                                            transition
                                        "
                  >
                    LeetCode
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TopicPage;
