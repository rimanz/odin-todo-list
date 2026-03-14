import {
  getActiveProjectId,
  getProjectById,
  getTodos,
} from "../projectManager.js";
import "../styles/projectView.css";
import { createNode } from "./layout.js";
import createTodoCard from "./todoCard.js";

const projectTitleEl = document.getElementById("project-view-header");
const todoSectionEl = document.getElementById("todos");
const todoListEl = document.getElementById("todo-list");

export default function createProjectDetails() {
  const activeProject = getProjectById(getActiveProjectId());
  const todos = getTodos(activeProject.id);
  const placeholderText = "For now there are no todos to show. Please add one.";

  projectTitleEl.textContent = activeProject.name;
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
