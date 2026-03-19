import {
  getActiveProjectId,
  getProjects,
  setActiveProjectId,
} from "../projectManager.js";
import "../styles/sidebar.css";
import { showProjectDialog } from "./dialog.js";
import { createNode } from "./layout.js";
import createProjectDetails from "./projectDetails.js";

const projectList = document.getElementById("project-list");
projectList.addEventListener("click", handleProjectClick);

const addProjectButton = document.getElementById("add-project-btn");
addProjectButton.addEventListener("click", showProjectDialog);

function handleProjectClick(e) {
  const item = e.target.closest(".sidebar-item");
  if (item) setActiveProjectId(item.dataset.id);

  listProjects(projectList);
  createProjectDetails();
}

function listProjects(parent) {
  const projects = getProjects();
  const activeId = getActiveProjectId();

  parent.textContent = "";
  projects.forEach((project, index) => {
    createNode({
      tag: "li",
      classNames: "sidebar-item" + (project.id === activeId ? " active" : ""),
      textContent: project.name,
      attributes: { "data-id": project.id },
      parent,
    });
  });
}

export default () => listProjects(projectList);
