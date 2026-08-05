export const dummyTasks = Array.from({ length: 100 }, (_, index) => {
  const taskNumber = index + 1;
  const statuses = ["Pending", "In Progress", "Completed"];

  const status = statuses[index % statuses.length];

  return {
    id: crypto.randomUUID(),
    title: `Task ${taskNumber}`,
    status,
    dueDate: `2026-08-01`,
  };
});
