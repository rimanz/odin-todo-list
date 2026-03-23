import {
  getActiveProjectId,
  getProjects,
  setActiveProjectId,
} from "../projectManager.js";
import "../styles/sidebar.css";
import { showProjectDialog } from "./dialog.js";
import { createButton, createNode } from "./layout.js";
import createProjectDetails from "./projectDetails.js";

const projectList = document.getElementById("project-list");
projectList.addEventListener("click", handleProjectClick);

const addProjectButton = document.getElementById("add-project-btn");
addProjectButton.addEventListener("click", () => showProjectDialog());

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
    // list item:
    const item = createNode({
      tag: "li",
      classNames: "sidebar-item" + (project.id === activeId ? " active" : ""),
      attributes: { "data-id": project.id, title: project.name },
      parent,
    });

    // item name:
    createNode({
      classNames: "item-name",
      textContent: project.name,
      parent: item,
    });

    // project actions:
    const projectActions = createNode({
      classNames: "project-actions",
      parent: item,
    });

    // project actions -> edit buttton
    const editProjectButton = createButton({
      tag: "button",
      classNames: "project-action-btn edit-btn",
      parent: projectActions,
    });

    editProjectButton.addEventListener("click", () =>
      showProjectDialog(project),
    );
  });
}

export default () => listProjects(projectList);
