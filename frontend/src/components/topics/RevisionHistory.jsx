function RevisionHistory({ revisions, loading }) {
  if (loading) {
    return (
      <div className="mt-4 text-sm text-gray-500">
        Loading revision history...
      </div>
    );
  }

  if (revisions.length === 0) {
    return <div className="mt-4 text-sm text-gray-500">No revisions yet.</div>;
  }

  return (
    <div className="mt-4 bg-gray-950 border border-gray-800 rounded-lg p-4">
      <h3 className="font-semibold mb-3">Revision History</h3>

      <div className="space-y-2">
        {revisions.map((revision) => (
          <div
            key={revision.revisionNumber}
            className="
              flex
              items-center
              justify-between
              text-sm
              border-b
              border-gray-800
              pb-2
              last:border-b-0
            "
          >
            <span className="text-gray-300">
              Revision #{revision.revisionNumber}
            </span>

            <span className="text-gray-500">
              {new Date(revision.revisedAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RevisionHistory;
