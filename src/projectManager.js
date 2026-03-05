import createProject from "./project.js";

let projects = [{ id: "default", name: "default", todos: [] }];

export function addProject(projectName) {
  if (!projectName) {
    throw new Error("A project name must be provided!");
  } else if (projects.some((p) => p.name === projectName)) {
    throw new Error(`The project name '${projectName}' already exists!`);
  } else {
    projects = [...projects, createProject(projectName)];
  }
}

export function deleteProject(projectId) {
  if (getProjectById(projectId) && projects.length > 1) {
    projects = projects.filter((p) => p.id !== projectId);
  } else {
    throw new Error("You must have at least one project!");
  }
}

export function renameProject(projectId, newName) {
  const project = getProjectById(projectId);

  if (
    project &&
    projects.filter((p) => p.id !== projectId).some((p) => p.name === newName)
  ) {
    throw new Error(`The name '${newName}' already exists!`);
  } else {
    project.name = newName;
  }
}

export function getProjects() {
  return [...projects];
}

export function getProjectById(projectId) {
  let project;

  if (projectId) {
    project = projects.find((p) => p.id === projectId);
  } else {
    throw new Error("A project ID must be provided!");
  }

  if (project) {
    return project;
  } else {
    throw new Error(`No project found with ID: ${projectId}`);
  }
}
