import {
  getActiveProjectId,
  getProjectById,
  getTodos,
} from "../projectManager.js";
import "../styles/projectView.css";
import { showAddTaskDialog } from "./dialog.js";
import { createNode } from "./layout.js";
import createTodoCard from "./todoCard.js";

const projectTitleEl = document.getElementById("project-view-header");
const todoSectionEl = document.getElementById("todos");
const todoListEl = document.getElementById("todo-list");
const addTodoBtn = document.getElementById("add-todo-btn");

export function listTodos(projectId) {
  const todos = getTodos(projectId);
  todoListEl.textContent = "";

  if (todos.length > 0) {
    todos.forEach((todo) => {
      const item = createNode({ tag: "li", parent: todoListEl });
      createTodoCard(item, todo);
    });
  } else {
    const item = createNode({ tag: "li", parent: todoListEl });
    createNode({
      tag: "p",
      classNames: "placeholder-text",
      textContent: placeholderText,
      parent: item,
    });
  }
}

export default function createProjectDetails() {
  const activeProject = getProjectById(getActiveProjectId());
  const placeholderText = "For now there are no todos to show. Please add one.";

  projectTitleEl.textContent = activeProject.name;
  listTodos(activeProject.id);
}

// Listeners:
addTodoBtn.addEventListener("click", (e) => {
  showAddTaskDialog();
});
