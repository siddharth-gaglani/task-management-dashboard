const styles = {
  Total: {
    badge: "bg-slate-100 text-slate-700",
    border: "border-slate-200",
  },
  Pending: {
    badge: "bg-amber-100 text-amber-700",
    border: "border-amber-200",
  },
  "In Progress": {
    badge: "bg-blue-100 text-blue-700",
    border: "border-blue-200",
  },
  Completed: {
    badge: "bg-emerald-100 text-emerald-700",
    border: "border-emerald-200",
  },
};

function SummaryCard({ label, count }) {
  const style = styles[label];

  return (
    <div
      className={`rounded-2xl border bg-white p-5 shadow-sm ${style.border}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}
        >
          Tasks
        </span>
      </div>
      <p className="mt-4 text-3xl font-bold text-slate-900">{count}</p>
    </div>
  );
}

export default SummaryCard;
