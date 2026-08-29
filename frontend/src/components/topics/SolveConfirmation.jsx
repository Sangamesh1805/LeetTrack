function SolveConfirmation({ problem, solving, onCancel, onConfirm }) {
  if (!problem) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/70
        flex
        items-center
        justify-center
        px-4
      "
    >
      <div
        className="
          bg-gray-900
          border border-gray-700
          rounded-2xl
          p-6
          max-w-md
          w-full
        "
      >
        <h2 className="text-xl font-bold mb-3">Mark problem as solved?</h2>

        <p className="text-gray-400 mb-6">
          Are you sure you solved{" "}
          <span className="text-white font-medium">{problem.title}</span>?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={solving}
            className="
              px-4
              py-2
              rounded-lg
              bg-gray-700
              hover:bg-gray-600
              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={solving}
            className="
              px-4
              py-2
              rounded-lg
              bg-green-600
              hover:bg-green-700
              transition
              disabled:opacity-50
            "
          >
            {solving ? "Saving..." : "Mark Solved"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SolveConfirmation;
