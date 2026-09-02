function ProblemFilters({
  search,
  difficulty,
  status,
  onSearchChange,
  onDifficultyChange,
  onStatusChange,
}) {
  return (
    <div className="mb-8 flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search problems..."
        className="
          flex-1 px-4 py-3 rounded-lg bg-gray-900 border border-gray-800
          text-white placeholder-gray-500 focus:outline-none focus:border-purple-500
        "
      />

      <select
        value={difficulty}
        onChange={(event) => onDifficultyChange(event.target.value)}
        className="
          px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 text-white
          focus:outline-none focus:border-purple-500
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
          px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 text-white
          focus:outline-none focus:border-purple-500
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
