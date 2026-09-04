import ProblemCard from "./ProblemCard";

function ProblemList({
  problems,
  isSolved,
  getRevisionCount,
  onMarkSolved,
  onMarkRevised,
  onShowHistory,
}) {
  if (problems.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-800 bg-gray-900/50 px-6 py-12 text-center">
        <p className="text-gray-300">No problems match these filters.</p>
        <p className="mt-2 text-sm text-gray-500">
          Try a different search, difficulty, or status.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {problems.map((problem) => (
        <ProblemCard
          key={problem.id}
          problem={problem}
          solved={isSolved(problem.id)}
          revisionCount={getRevisionCount(problem.id)}
          onMarkSolved={onMarkSolved}
          onMarkRevised={onMarkRevised}
          onShowHistory={onShowHistory}
        />
      ))}
    </div>
  );
}

export default ProblemList;
