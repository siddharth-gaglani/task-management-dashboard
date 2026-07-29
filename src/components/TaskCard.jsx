const statusStyles = {
  Pending: "bg-amber-100 text-amber-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-emerald-100 text-emerald-700",
};

function formatDate(date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function isOverdue(task) {
  if (task.status === "Completed") {
    return false;
  }

  const dueDate = new Date(`${task.dueDate}T23:59:59`);
  return dueDate < new Date();
}

function TaskCard({ task, onDelete, onEdit }) {
  const overdue = isOverdue(task);

  const handleDelete = () => {
    const shouldDelete = window.confirm(
      `Are you sure you want to delete ${task.title}`,
    );

    if (shouldDelete) {
      onDelete(task.id);
    }
  };

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <h2 className="wrap-break-word text-lg font-semibold text-slate-900">
          {task.title}
        </h2>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            statusStyles[task.status]
          }`}
        >
          {task.status}
        </span>
      </div>

      <p className="mt-3 flex-1 wrap-break-word text-sm leading-6 text-slate-600">
        {task.description || "No description provided."}
      </p>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Due date
            </p>

            <p
              className={`mt-1 text-sm font-medium ${
                overdue ? "text-red-600" : "text-slate-700"
              }`}
            >
              {formatDate(task.dueDate)}
              {overdue && " · Overdue"}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onEdit(task)}
              className="cursor-pointer rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="cursor-pointer rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
