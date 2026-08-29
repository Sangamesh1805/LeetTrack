import { useNavigate } from "react-router-dom";

function TopicCard({ category, solved, total }) {
  const navigate = useNavigate();

  const percentage = total === 0 ? 0 : ((solved / total) * 100).toFixed(1);

  return (
    <div
      onClick={() => navigate(`/topic/${category}`)}
      className="
                bg-gray-900
                border border-gray-800
                rounded-2xl
                p-7
                text-center
                cursor-pointer
                transition
                duration-200
                hover:-translate-y-1
                hover:border-gray-600
            "
    >
      <h3 className="text-xl font-bold mb-5">{category}</h3>

      <p className="text-gray-300 mb-2">
        {solved} / {total} solved
      </p>

      <p className="text-gray-400 mb-6">{percentage}%</p>

      <button
        className="
                    px-5
                    py-2
                    rounded-lg
                    bg-purple-600
                    hover:bg-purple-700
                    transition
                    font-medium
                "
      >
        View Topic
      </button>
    </div>
  );
}

export default TopicCard;
