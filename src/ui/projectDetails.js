import {
  getActiveProjectId,
  getProjectById,
  listTodos,
} from "../projectManager.js";
import "../styles/projectView.css";
import { createNode } from "./layout.js";
import createTodoCard from "./todoCard.js";

const projectTitleEl = document.getElementById("project-view-header");
const todoSectionEl = document.getElementById("todos");
const todoListEl = document.getElementById("todo-list");

export default function createProjectDetails() {
  const activeProject = getProjectById(getActiveProjectId());
  const todos = listTodos(activeProject.id);
  const placeholderText = "For now there is no todo to show!";

  projectTitleEl.textContent = activeProject.name;
  todos.forEach((todo) => {
    const item = createNode({ tag: "li", parent: todoListEl });
    createTodoCard(item, todo);
  });
}
