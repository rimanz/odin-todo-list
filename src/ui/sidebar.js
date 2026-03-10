import {
  addProject,
  getActiveProjectId,
  getProjects,
  setActiveProjectId,
} from "../projectManager.js";
import "../styles/sidebar.css";
import { createItemGroup, createNode } from "./layout.js";
import createProjectDetails from "./projectDetails.js";

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

export default function createSidebar() {
  const sidebar = createNode({ tag: "aside", classNames: "sidebar" });

  // brand:
  createNode({
    tag: "h2",
    classNames: "brand",
    textContent: "Odin Todo List",
    parent: sidebar,
  });

  // Project listing:
  const itemGroup = createItemGroup({
    classNames: "sidebar-group projects",
    heading: { tag: "h4", textContent: "Projects" },
    parent: sidebar,
  });

  itemGroup.addEventListener("click", (e) => {
    const item = e.target.closest(".sidebar-item");

    if (item) {
      setActiveProjectId(item.dataset.id);
    }

    listProjects(itemGroup);
    createProjectDetails();
  });

  listProjects(itemGroup);

  // Add Project button:
  const addProjectButton = createNode({
    tag: "button",
    classNames: "add-project-btn",
    textContent: "Add Project",
    parent: sidebar,
  });

  addProjectButton.addEventListener("click", (e) => {
    const projectName = prompt("Project Name: ");
    addProject(projectName);
    listProjects(itemGroup);
  });
}
