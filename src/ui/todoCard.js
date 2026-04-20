import { format, isValid } from "date-fns";
import { getActiveProjectId, toggleTodo } from "../projectManager.js";
import "../styles/todoCard.css";
import { showDeleteConfirmation, showTodoDialog } from "./dialog.js";
import { createButton, createNode } from "./layout.js";

export default function createTodoCard(parent, data) {
  // todo card
  const card = createNode({
    classNames: `todo-card priority-${data.priority}`,
    attributes: { id: data.id },
    parent,
  });

  // status toggler:
  const toggleInput = createNode({
    tag: "input",
    attributes: { type: "checkbox" },
    classNames: "status-toggler",
    parent: card,
  });

  toggleInput.checked = data.completed;

  // todo details:
  const todoDetails = createNode({
    classNames: "todo-details",
    parent: card,
  });

  // todo details -> title
  createNode({
    tag: "p",
    classNames: "todo-title",
    textContent: data.title,
    parent: todoDetails,
  });

  // todo details -> description
  createNode({
    tag: "p",
    classNames: "todo-description",
    textContent: data.description,
    parent: todoDetails,
  });

  // todo details -> priority
  createNode({
    tag: "p",
    classNames: "todo-priority",
    textContent: data.priority,
    parent: todoDetails,
  });

  // todo details -> due date
  const dueDate = data.dueDate ? new Date(data.dueDate) : null;
  isValid(dueDate) &&
    createNode({
      tag: "p",
      classNames: "todo-due",
      textContent: format(dueDate, "dd-MM-yyyy"),
      parent: todoDetails,
    });

  // todo details -> status
  createNode({
    tag: "p",
    classNames: "todo-status",
    textContent: data.completed ? "Completed" : "Pending",
    parent: todoDetails,
  });

  // todo details -> notes
  data.notes &&
    createNode({
      tag: "p",
      classNames: "todo-notes",
      textContent: data.notes,
      parent: todoDetails,
    });

  // todo actions:
  const todoActions = createNode({
    classNames: "todo-actions",
    parent: card,
  });

  // todo actions -> edit buttton
  const todoEditBtn = createButton({
    tag: "button",
    classNames: "todo-action-btn edit-btn",
    parent: todoActions,
  });

  // todo actions -> delete button
  const todoDeleteBtn = createButton({
    tag: "button",
    classNames: "todo-action-btn delete-btn",
    parent: todoActions,
  });

  // Listeners:
  card.addEventListener("click", (e) => {
    card.classList.toggle("expanded");
  });

  todoEditBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showTodoDialog(data);
  });

  todoDeleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showDeleteConfirmation(data.id);
  });

  toggleInput.addEventListener("click", (e) => e.stopPropagation());

  toggleInput.addEventListener("change", (e) => {
    toggleTodo(getActiveProjectId(), data.id);

    data.completed
      ? card.classList.add("completed")
      : card.classList.remove("completed");
  });
}
