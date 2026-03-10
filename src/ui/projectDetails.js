import { getActiveProjectId, getProjectById } from "../projectManager.js";
import "../styles/projectView.css";
import { createNode } from "./layout.js";

const projectView = createNode({
  tag: "section",
  classNames: "project-view",
  textContent: "",
});

export default function createProjectDetails() {
  const activeProject = getProjectById(getActiveProjectId());
  projectView.textContent = "";

  // Header:
  const header = createNode({
    tag: "header",
    parent: projectView,
  });

  createNode({
    tag: "h2",
    textContent: activeProject.name,
    classNames: "project-name",
    parent: header,
  });
}
