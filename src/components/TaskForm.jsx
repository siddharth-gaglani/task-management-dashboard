import { useState } from "react";

const emptyTask = {
  title: "",
  description: "",
  status: "Pending",
  dueDate: "",
};

function TaskForm({ initialTask, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(() => {
    if (!initialTask) {
      return emptyTask;
    }

    return {
      title: initialTask.title,
      description: initialTask.description,
      status: initialTask.status,
      dueDate: initialTask.dueDate,
    };
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!formData.title.trim()) {
      validationErrors.title = "Task title is required.";
    }

    if (!formData.dueDate) {
      validationErrors.dueDate = "Due date is required.";
    }

    return validationErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: formData.status,
      dueDate: formData.dueDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-5">
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Title <span className="text-red-500">*</span>
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
              errors.title
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
            }`}
          />

          {errors.title && (
            <p className="mt-2 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Enter task description"
            className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="status"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Status
            </label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Due date <span className="text-red-500">*</span>
            </label>

            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                errors.dueDate
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
              }`}
            />

            {errors.dueDate && (
              <p className="mt-2 text-sm text-red-600">{errors.dueDate}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-7 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="cursor-pointer rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          {initialTask ? "Save changes" : "Add task"}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
