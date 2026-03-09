import { addProject, getProjects } from "../projectManager.js";
import "../styles/sidebar.css";
import { createItemGroup, createNode } from "./layout.js";

function listProjects(parent) {
  const projects = getProjects();

  parent.textContent = "";
  projects.forEach((project, index) => {
    createNode({
      tag: "li",
      classNames: "sidebar-item" + (index === 0 ? " active" : ""),
      textContent: project.name,
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
