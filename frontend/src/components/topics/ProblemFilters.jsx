function ProblemFilters({
  search,
  difficulty,
  status,
  onSearchChange,
  onDifficultyChange,
  onStatusChange,
}) {
  return (
    <div className="mb-8 rounded-2xl border border-white/8 bg-white/[0.025] p-3 sm:p-4 flex flex-col lg:flex-row gap-3">
      <input
        type="text"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search problems..."
        className="
          flex-1 px-4 py-3 rounded-xl bg-black/20 border border-white/8
          text-white placeholder-gray-500 focus:outline-none focus:border-purple-400/70 focus:ring-2 focus:ring-purple-500/10
        "
      />

      <select
        value={difficulty}
        onChange={(event) => onDifficultyChange(event.target.value)}
        className="
          px-4 py-3 rounded-xl bg-black/20 border border-white/8 text-white
          focus:outline-none focus:border-purple-400/70
        "
      >
        <option value="">All Difficulties</option>
        <option value="EASY">Easy</option>
        <option value="MEDIUM">Medium</option>
        <option value="HARD">Hard</option>
      </select>

      <select
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
        className="
          px-4 py-3 rounded-xl bg-black/20 border border-white/8 text-white
          focus:outline-none focus:border-purple-400/70
        "
      >
        <option value="">All Statuses</option>
        <option value="SOLVED">Solved</option>
        <option value="UNSOLVED">Not Solved</option>
      </select>
    </div>
  );
}

export default ProblemFilters;
