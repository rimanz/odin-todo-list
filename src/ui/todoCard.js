import "../styles/todoCard.css";
import { showTodoDialog } from "./dialog.js";
import { createButton, createNode } from "./layout.js";

export default function createTodoCard(parent, data) {
  // todo card
  const card = createNode({
    classNames: `todo-card priority-${data.priority}`,
    attributes: { id: data.id },
    parent,
  });

  // status toggler:
  createNode({
    tag: "input",
    attributes: { type: "radio" },
    classNames: "status-toggler",
    parent: card,
  });

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

  // todo details -> due date
  createNode({
    tag: "p",
    classNames: "todo-due",
    textContent: data.dueDate,
    parent: todoDetails,
  });

  // todo details -> description
  createNode({
    tag: "p",
    classNames: "todo-description",
    textContent: data.description,
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
  createButton({
    tag: "button",
    classNames: "todo-action-btn delete-btn",
    parent: todoActions,
  });

  // Listeners:
  todoEditBtn.addEventListener("click", (e) => {
    showTodoDialog(data);
  });
}
