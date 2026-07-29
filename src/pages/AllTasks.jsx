import { useMemo, useState } from "react";
import SummaryCard from "../components/SummaryCard";
import TaskList from "../components/TaskList";
import TaskModal from "../components/TaskModal";
import { useTasks } from "../context/useTasks";

function AllTasks() {
  const { tasks, taskSummary, addTask, editTask, deleteTask } = useTasks();

  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const visibleTasks = useMemo(() => {
    const filteredTasks =
      statusFilter === "All"
        ? tasks
        : tasks.filter((task) => task.status === statusFilter);

    return [...filteredTasks].sort((firstTask, secondTask) => {
      const firstDate = new Date(`${firstTask.dueDate}T00:00:00`);
      const secondDate = new Date(`${secondTask.dueDate}T00:00:00`);

      if (sortOrder === "ascending") {
        return firstDate - secondDate;
      }

      return secondDate - firstDate;
    });
  }, [tasks, statusFilter, sortOrder]);

  const openAddModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const handleSubmit = (taskData) => {
    if (selectedTask) {
      editTask(selectedTask.id, taskData);
    } else {
      addTask(taskData);
    }

    closeModal();
  };

  return (
    <>
      <section>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard label="Total" count={taskSummary.total} />
          <SummaryCard label="Pending" count={taskSummary.pending} />
          <SummaryCard label="In Progress" count={taskSummary.inProgress} />
          <SummaryCard label="Completed" count={taskSummary.completed} />
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">All tasks</h2>

            <p className="mt-1 text-sm text-slate-500">
              Showing {visibleTasks.length} of {tasks.length} tasks
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              aria-label="Filter tasks by status"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="All">All statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              aria-label="Sort tasks by due date"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="ascending">Due date: earliest</option>
              <option value="descending">Due date: latest</option>
            </select>

            <button
              type="button"
              onClick={openAddModal}
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              + Add task
            </button>
          </div>
        </div>

        <TaskList
          tasks={visibleTasks}
          onEdit={openEditModal}
          onDelete={deleteTask}
          emptyMessage="Try changing the status filter or add a new task."
        />
      </section>

      <TaskModal
        isOpen={isModalOpen}
        task={selectedTask}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default AllTasks;
