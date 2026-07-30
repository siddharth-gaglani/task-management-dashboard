import { useMemo, useState } from "react";
import TaskList from "../components/TaskList";
import TaskModal from "../components/TaskModal";
import { useTasks } from "../context/useTasks";

function CompletedTasks() {
  const { tasks, editTask, deleteTask } = useTasks();
  const [actionError, setActionError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [sortOrder, setSortOrder] = useState("ascending");
  const [selectedTask, setSelectedTask] = useState(null);

  const completedTasks = useMemo(() => {
    return tasks
      .filter((task) => task.status === "Completed")
      .sort((firstTask, secondTask) => {
        const firstDate = new Date(`${firstTask.dueDate}T00:00:00`);
        const secondDate = new Date(`${secondTask.dueDate}T00:00:00`);

        if (sortOrder === "ascending") {
          return firstDate - secondDate;
        }

        return secondDate - firstDate;
      });
  }, [tasks, sortOrder]);

  const closeModal = () => {
    setSelectedTask(null);
  };

  const handleSubmit = async (taskData) => {
    try {
      setIsSubmitting(true);
      setActionError("");

      await editTask(selectedTask.id, taskData);

      closeModal();
    } catch (error) {
      setActionError(error.message || "Unable to update the task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      setActionError("");
      await deleteTask(taskId);
    } catch (error) {
      setActionError(error.message || "Unable to delete the task.");
    }
  };

  return (
    <>
      <section>
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Completed tasks
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {completedTasks.length} completed{" "}
              {completedTasks.length === 1 ? "task" : "tasks"}
            </p>
          </div>

          <select
            aria-label="Sort completed tasks by due date"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="ascending">Due date: earliest</option>
            <option value="descending">Due date: latest</option>
          </select>
        </div>

        <TaskList
          tasks={completedTasks}
          onEdit={setSelectedTask}
          onDelete={handleDelete}
          emptyMessage="Tasks marked as completed will appear here."
        />
      </section>

      <TaskModal
        isOpen={Boolean(selectedTask)}
        task={selectedTask}
        onClose={closeModal}
        onSubmit={handleSubmit}
        error={actionError}
        isSubmitting={isSubmitting}
      />
    </>
  );
}

export default CompletedTasks;
