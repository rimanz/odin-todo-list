import createProject from "./project.js";

let projects = [{ id: "default", name: "default", todos: [] }];

export function addProject(projectName) {
  if (projects.some((p) => p.name === projectName)) {
    throw new Error(`Project name '${projectName}' already exists!`);
  } else {
    projects = [...projects, createProject(projectName)];
  }
}

export function deleteProject(projectId) {
  if (projectId && projects.length > 1) {
    projects = projects.filter((p) => p.id !== projectId);
  } else {
    throw new Error("You must have at least one project!");
  }
}

export function renameProject(projectId, newName) {
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    throw new Error(`No project found with ID: ${projectId}`);
  } else if (
    projects.filter((p) => p.id !== projectId).some((p) => p.name === newName)
  ) {
    throw new Error(`The name '${newName}' already exists!`);
  }

  project.name = newName;
}

export function getProjects() {
  return [...projects];
}

export function getProjectById(projectId) {
  return projects.find((p) => p.id === projectId);
}
