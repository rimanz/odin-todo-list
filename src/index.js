import {
  addProject,
  deleteProject,
  getProjectById,
  getProjects,
  renameProject,
} from "./projectManager.js";
import "./styles/index.css";
// import createSidebar from "./ui/sidebar.js";

const root = document.querySelector("#root");

// createSidebar();

// Test Codes:
console.log("Initial projects: ", getProjects());
addProject("Test");
// deleteProject("0001");
console.log("After adding new project: ", getProjects());
renameProject("0001", "Original");
console.log("After renaming a project: ", getProjects());
console.log("Project retrived by Id: ", getProjectById("0001"));
deleteProject("0001");
console.log("After successfully deleting a project: ", getProjects());
