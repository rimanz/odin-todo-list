export default function createTodo({
  title,
  description,
  dueDate,
  priority = "medium",
  notes = "",
  checklist = [],
}) {
  return {
    id: crypto.randomUUID(),
    type: "todo",
    title,
    description,
    dueDate,
    priority,
    notes,
    checklist,
    completed: false,
  };
}
