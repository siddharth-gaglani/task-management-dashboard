import { useEffect, useMemo, useState } from "react";

import { supabase } from "../lib/supabase";
import { useAuth } from "./useAuth";
import { TaskContext } from "./TaskContext";

function convertDatabaseTask(task) {
  return {
    id: task.id,
    userId: task.user_id,
    title: task.title,
    description: task.description,
    status: task.status,
    dueDate: task.due_date,
    createdAt: task.created_at,
    updatedAt: task.updated_at,
  };
}

export function TaskProvider({ children }) {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      return;
    }

    let cancelled = false;

    async function loadTasks() {
      const { data, error: fetchError } = await supabase
        .from("tasks")
        .select(
          `
        id,
        user_id,
        title,
        description,
        status,
        due_date,
        created_at,
        updated_at
      `,
        )
        .order("due_date", {
          ascending: true,
        });

      if (cancelled) {
        return;
      }

      if (fetchError) {
        console.error("Unable to fetch tasks:", fetchError);
        setError(fetchError.message || "Unable to load tasks.");
        setLoading(false);
        return;
      }

      setTasks((data ?? []).map(convertDatabaseTask));
      setError("");
      setLoading(false);
    }

    loadTasks();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const addTask = async (taskData) => {
    if (!user) {
      throw new Error("You must be logged in to add a task.");
    }

    const { data, error: insertError } = await supabase
      .from("tasks")
      .insert({
        user_id: user.id,
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        due_date: taskData.dueDate,
      })
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    const newTask = convertDatabaseTask(data);

    setTasks((previousTasks) => [newTask, ...previousTasks]);

    return newTask;
  };

  const editTask = async (taskId, taskData) => {
    if (!user) {
      throw new Error("You must be logged in to edit a task.");
    }

    const { data, error: updateError } = await supabase
      .from("tasks")
      .update({
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        due_date: taskData.dueDate,
      })
      .eq("id", taskId)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    const updatedTask = convertDatabaseTask(data);

    setTasks((previousTasks) =>
      previousTasks.map((task) => (task.id === taskId ? updatedTask : task)),
    );

    return updatedTask;
  };

  const deleteTask = async (taskId) => {
    if (!user) {
      throw new Error("You must be logged in to delete a task.");
    }

    const { error: deleteError } = await supabase
      .from("tasks")
      .delete()
      .eq("id", taskId);

    if (deleteError) {
      throw deleteError;
    }

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId),
    );
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

  const value = {
    tasks,
    taskSummary,
    loading,
    error,
    addTask,
    editTask,
    deleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
