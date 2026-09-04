import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

import TopicHeader from "../components/topics/TopicHeader";
import ProblemList from "../components/topics/ProblemList";
import SolveConfirmation from "../components/topics/SolveConfirmation";
import RevisionConfirmation from "../components/topics/RevisionConfirmation";
import RevisionHistory from "../components/topics/RevisionHistory";
import ProblemFilters from "../components/topics/ProblemFilters";

function TopicPage() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [problems, setProblems] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedProblem, setSelectedProblem] = useState(null);
  const [solving, setSolving] = useState(false);

  const [selectedRevisionProblem, setSelectedRevisionProblem] = useState(null);
  const [selectedHistoryProblem, setSelectedHistoryProblem] = useState(null);

  const [revisionHistory, setRevisionHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const [revising, setRevising] = useState(false);

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTopicData();
    }, 300);

    return () => clearTimeout(timer);
  }, [category, search, difficulty]);

  useEffect(() => {
    const fetchTopicData = async () => {
      try {
        const params = new URLSearchParams();

        if (search.trim()) {
          params.append("search", search.trim());
        }

        if (difficulty) {
          params.append("difficulty", difficulty);
        }

        if (category) {
          params.append("category", category);
        }

        const [problemsResponse, progressResponse] = await Promise.all([
          api.get(`/problems/search?${params.toString()}`),
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

    const timer = setTimeout(() => {
      fetchTopicData();
    }, 300);

    return () => clearTimeout(timer);
  }, [category, search, difficulty]);

  const isSolved = (problemId) => {
    return progress.some((item) => item.problemId === problemId && item.solved);
  };

  const handleMarkSolved = (problem) => {
    setSelectedProblem(problem);
  };

  const confirmMarkSolved = async () => {
    if (!selectedProblem) {
      return;
    }

    try {
      setSolving(true);

      const response = await api.post(`/progress/${selectedProblem.id}/solve`);

      setProgress((currentProgress) => {
        const existingProgress = currentProgress.find(
          (item) => item.problemId === selectedProblem.id,
        );

        if (existingProgress) {
          return currentProgress.map((item) =>
            item.problemId === selectedProblem.id ? response.data : item,
          );
        }

        return [...currentProgress, response.data];
      });

      setSelectedProblem(null);
    } catch (error) {
      console.error("Failed to mark problem as solved:", error);
    } finally {
      setSolving(false);
    }
  };

  const handleMarkRevised = (problem) => {
    setSelectedRevisionProblem(problem);
  };

  const confirmMarkRevised = async () => {
    if (!selectedRevisionProblem) {
      return;
    }

    try {
      setRevising(true);

      const response = await api.post(
        `/progress/${selectedRevisionProblem.id}/revise`,
      );

      setProgress((currentProgress) =>
        currentProgress.map((item) =>
          item.problemId === selectedRevisionProblem.id
            ? {
                ...item,
                revisionCount: response.data.revisionNumber,
              }
            : item,
        ),
      );

      setSelectedRevisionProblem(null);
    } catch (error) {
      console.error("Failed to mark problem as revised:", error);
    } finally {
      setRevising(false);
    }
  };

  const handleShowHistory = async (problem) => {
    try {
      setSelectedHistoryProblem(problem);
      setHistoryLoading(true);

      const response = await api.get(`/progress/${problem.id}/revisions`);

      setRevisionHistory(response.data);
    } catch (error) {
      console.error("Failed to fetch revision history:", error);
    } finally {
      setHistoryLoading(false);
    }
  };

  const getRevisionCount = (problemId) => {
    const item = progress.find((item) => item.problemId === problemId);

    return item?.revisionCount || 0;
  };

  const filteredProblems = problems.filter((problem) => {
    if (status === "SOLVED") {
      return isSolved(problem.id);
    }

    if (status === "UNSOLVED") {
      return !isSolved(problem.id);
    }

    return true;
  });

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
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="px-6 py-10">
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

          <TopicHeader
            category={category}
            solvedCount={solvedCount}
            totalProblems={problems.length}
            percentage={percentage}
          />

          <ProblemFilters
            search={search}
            difficulty={difficulty}
            status={status}
            onSearchChange={setSearch}
            onDifficultyChange={setDifficulty}
            onStatusChange={setStatus}
          />

          <ProblemList
            problems={filteredProblems}
            isSolved={isSolved}
            getRevisionCount={getRevisionCount}
            onMarkSolved={handleMarkSolved}
            onMarkRevised={handleMarkRevised}
            onShowHistory={handleShowHistory}
          />
        </div>

        <SolveConfirmation
          problem={selectedProblem}
          solving={solving}
          onCancel={() => setSelectedProblem(null)}
          onConfirm={confirmMarkSolved}
        />

        <RevisionConfirmation
          problem={selectedRevisionProblem}
          revising={revising}
          onCancel={() => setSelectedRevisionProblem(null)}
          onConfirm={confirmMarkRevised}
        />

        {selectedHistoryProblem && (
          <div
            className="
      fixed
      inset-0
      bg-black/70
      flex
      items-center
      justify-center
      px-4
    "
          >
            <div
              className="
        bg-gray-900
        border border-gray-700
        rounded-2xl
        p-6
        max-w-lg
        w-full
      "
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Revision History</h2>

                <button
                  onClick={() => {
                    setSelectedHistoryProblem(null);
                    setRevisionHistory([]);
                  }}
                  className="
            text-gray-400
            hover:text-white
            text-xl
          "
                >
                  ✕
                </button>
              </div>

              <p className="text-gray-400 mb-4">
                {selectedHistoryProblem.title}
              </p>

              <RevisionHistory
                revisions={revisionHistory}
                loading={historyLoading}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TopicPage;
