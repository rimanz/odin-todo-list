export default function createTodo(
  title,
  description,
  dueDate,
  priority,
  notes = "",
  checklist = [],
) {
  return {
    id: crypto.randomUUID(),
    title,
    description,
    dueDate,
    priority: "medium",
    notes,
    checklist,
    completed: false,
  };
}
