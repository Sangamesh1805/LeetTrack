import ProblemCard from "./ProblemCard";

function ProblemList({
  problems,
  isSolved,
  getRevisionCount,
  onMarkSolved,
  onMarkRevised,
  onShowHistory,
}) {
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
