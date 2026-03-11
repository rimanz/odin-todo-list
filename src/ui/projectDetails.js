import { getActiveProjectId, getProjectById } from "../projectManager.js";
import "../styles/projectView.css";

const projectTitleEl = document.getElementById("project-view-header");
const todoListEl = document.getElementById("todo-list");

export default function createProjectDetails() {
  const activeProject = getProjectById(getActiveProjectId());

  projectTitleEl.textContent = activeProject.name;
}
