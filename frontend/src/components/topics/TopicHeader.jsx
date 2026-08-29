function TopicHeader({ category, solvedCount, totalProblems, percentage }) {
  return (
    <div className="text-center mb-10">
      <h1 className="text-4xl font-bold mb-3">{category}</h1>

      <p className="text-gray-400">
        {solvedCount} / {totalProblems} solved
      </p>

      <p className="text-gray-500 mt-1">{percentage}% complete</p>
    </div>
  );
}

export default TopicHeader;
