import { useEffect, useMemo, useState } from "react";
import { TaskContext } from "./TaskContext";

const STORAGE_KEY = "task-management-dashboard-tasks";

const initialTasks = [
  {
    id: crypto.randomUUID(),
    title: "Complete dashboard design",
    description: "Finish the responsive dashboard layout and task cards.",
    status: "In Progress",
    dueDate: "2026-08-05",
  },
  {
    id: crypto.randomUUID(),
    title: "Review pull request",
    description: "Review the latest frontend pull request.",
    status: "Pending",
    dueDate: "2026-08-02",
  },
  {
    id: crypto.randomUUID(),
    title: "Update documentation",
    description: "Add setup instructions to the project documentation.",
    status: "Completed",
    dueDate: "2026-07-28",
  },
];

export default function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    try {
      const storedTasks = localStorage.getItem(STORAGE_KEY);
      return storedTasks ? JSON.parse(storedTasks) : initialTasks;
    } catch (err) {
      console.error("Unable to load tasks", err);
      return initialTasks;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.error("Unable to save tasks", err);
    }
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      id: crypto.randomUUID(),
      ...taskData,
    };

    setTasks((prevTask) => [newTask, ...prevTask]);
  };

  const editTask = (taskId, updatedTask) => {
    setTasks((prevTask) => {
      return prevTask.map((task) =>
        task.id === taskId
          ? {
              ...task,
              ...updatedTask,
            }
          : task,
      );
    });
  };

  const deleteTask = (taskId) => {
    setTasks((prevTask) => prevTask.filter((task) => task.id !== taskId));
  };

  const taskSummary = useMemo(() => {
    return tasks.reduce(
      (summary, task) => {
        summary.total += 1;
        if (task.status === "Pending") {
          summary.pending += 1;
        }
        if (task.status === "In Progress") {
          summary.inProgress += 1;
        }
        if (task.status === "Completed") {
          summary.completed += 1;
        }

        return summary;
      },
      {
        total: 0,
        pending: 0,
        inProgress: 0,
        completed: 0,
      },
    );
  }, [tasks]);

  const value = { tasks, taskSummary, addTask, editTask, deleteTask };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
