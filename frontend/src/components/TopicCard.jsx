import { useNavigate } from "react-router-dom";

function TopicCard({ category, solved, total }) {
  const navigate = useNavigate();

  const percentage = total === 0 ? 0 : (solved / total) * 100;

  return (
    <div
      onClick={() => navigate(`/topic/${category}`)}
      className="
        bg-white/[0.035]
        border border-white/8
        rounded-2xl
        p-6
        cursor-pointer
        transition-all
        duration-200
        hover:border-purple-400/60
        hover:bg-white/[0.06]
        hover:-translate-y-1
        hover:shadow-xl hover:shadow-purple-950/20
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold tracking-tight">{category}</h3>

        <span className="text-gray-500 text-lg">→</span>
      </div>

      {/* Progress Numbers */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-gray-400 text-sm">
          {solved} / {total} solved
        </p>

        <p className="text-sm font-medium text-gray-400">
          {percentage.toFixed(1)}%
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-2 bg-purple-600 rounded-full transition-all duration-500"
          style={{
            width: `${Math.min(percentage, 100)}%`,
          }}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-gray-500">View problem set</p>
        <span className="text-xs font-medium text-purple-300">
          {solved === total && total > 0 ? "Complete" : "In progress"}
        </span>
      </div>
    </div>
  );
}

export default TopicCard;
