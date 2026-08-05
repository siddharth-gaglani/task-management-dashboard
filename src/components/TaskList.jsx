// import TaskCard from "./TaskCard";
import VirtualTaskRow from "./VirtualTaskRow";

/*
 give every row a fixed height
 track the container scrolltop
 calculate which rows are visible
 render only those
 render 2 additonal below and above
*/

function TaskList({ tasks, onEdit, onDelete, emptyMessage }) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
          ✓
        </div>

        <h2 className="mt-4 text-lg font-semibold text-slate-900">
          No tasks found
        </h2>

        <p className="mt-2 text-sm text-slate-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => (
        <VirtualTaskRow
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
