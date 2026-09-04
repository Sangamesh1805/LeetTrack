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
        bg-white/[0.035]
        border border-white/8
        rounded-2xl
        p-4 sm:p-5
        flex
        flex-col
        items-start
        sm:flex-row
        sm:items-center
        sm:justify-between
        gap-5 hover:border-white/15 transition-colors
      "
    >
      <div className="flex items-center gap-5 min-w-0">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/6 text-xs font-semibold text-gray-400">
          {problem.orderIndex}
        </span>

        <div className="min-w-0">
          <h2 className="font-semibold text-gray-100 wrap-break-word">
            {problem.title}
          </h2>

          <p
            className={`mt-1 text-xs font-medium ${problem.difficulty === "EASY" ? "text-emerald-300" : problem.difficulty === "MEDIUM" ? "text-amber-300" : "text-rose-300"}`}
          >
            {problem.difficulty}
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-2 sm:w-auto sm:items-end">
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:gap-3">
          <span
            className={`text-xs font-medium ${solved ? "text-emerald-300" : "text-gray-500"}`}
          >
            {solved ? "✓ Solved" : "○ Not solved"}
          </span>

          <a
            href={problem.leetcodeUrl}
            target="_blank"
            rel="noreferrer"
            className="
        px-3
        py-2
        rounded-lg
        bg-purple-600/90
        hover:bg-purple-500
        transition
      "
          >
            LeetCode
          </a>

          {!solved && (
            <button
              onClick={() => onMarkSolved(problem)}
              className="
          px-3
          py-2
          rounded-lg
          bg-emerald-600/90
          hover:bg-emerald-500
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
            px-3
            py-2
            rounded-lg
            bg-sky-600/90
            hover:bg-sky-500
            transition
          "
              >
                Revise
              </button>

              <button
                onClick={() => onShowHistory(problem)}
                className="
            px-3
            py-2
            rounded-lg
            bg-white/10
            hover:bg-white/15
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
            {revisionCount} {revisionCount === 1 ? "revision" : "revisions"}
          </p>
        )}
      </div>
    </div>
  );
}

export default ProblemCard;
