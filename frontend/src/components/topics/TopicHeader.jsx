function TopicHeader({ category, solvedCount, totalProblems, percentage }) {
  return (
    <div className="mb-8 rounded-2xl border border-white/8 bg-white/[0.035] p-6 sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-300/80 mb-3">
        Topic workspace
      </p>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            {category}
          </h1>
          <p className="text-gray-400">
            Practice deliberately and keep your streak moving.
          </p>
        </div>
        <div className="sm:text-right">
          <p className="text-2xl font-bold">{percentage}%</p>
          <p className="text-sm text-gray-500">
            {solvedCount} of {totalProblems} solved
          </p>
        </div>
      </div>
      <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full rounded-full bg-purple-500 transition-all duration-700"
          style={{ width: `${Math.min(Number(percentage), 100)}%` }}
        />
      </div>
    </div>
  );
}

export default TopicHeader;
