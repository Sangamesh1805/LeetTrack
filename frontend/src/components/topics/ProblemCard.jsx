function ProblemCard({
  problem,
  solved,
  revisionCount,
  onMarkSolved,
  onMarkRevised,
  onShowHistory,
}) {
  return (
    <div
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
        <span className="text-gray-500 w-8">{problem.orderIndex}</span>

        <div>
          <h2 className="font-semibold">{problem.title}</h2>

          <p className="text-sm text-gray-500 mt-1">{problem.difficulty}</p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
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

          {!solved && (
            <button
              onClick={() => onMarkSolved(problem)}
              className="
          px-4
          py-2
          rounded-lg
          bg-green-600
          hover:bg-green-700
          transition
        "
            >
              Mark Solved
            </button>
          )}

          {solved && (
            <>
              <button
                onClick={() => onMarkRevised(problem)}
                className="
            px-4
            py-2
            rounded-lg
            bg-blue-600
            hover:bg-blue-700
            transition
          "
              >
                Revise
              </button>

              <button
                onClick={() => onShowHistory(problem)}
                className="
            px-4
            py-2
            rounded-lg
            bg-gray-700
            hover:bg-gray-600
            transition
          "
              >
                History
              </button>
            </>
          )}
        </div>

        {solved && (
          <p className="text-sm text-gray-500">
            Revision count: {revisionCount}
          </p>
        )}
      </div>
    </div>
  );
}

export default ProblemCard;
