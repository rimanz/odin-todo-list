import createProject from "./project.js";

let projects = [{ id: "default", name: "default", todos: [] }];

export function addProject(projectName) {
  const existingNames = projects.map((p) => p.name);

  if (existingNames.includes(projectName)) {
    throw new Error("Project name already exists!");
  } else {
    projects = [...projects, createProject()];
  }
}

export function deleteProject(projectId) {
  if (projects.length > 1) {
    projects = projects.filter((p) => p.id !== projectId);
  } else {
    throw new Error("You must have at least one project!");
  }
}

export function updateProjects(updatedProjects) {
  projects = [...updatedProjects];
}

export function renameProject(projectId, newName) {
  projects = projects.map((p) =>
    p.id === projectId ? { ...p, name: newName } : p,
  );
}

export function getProjects() {
  return projects;
}

export function getProjectById(projectId) {
  let targetProject;

  projects.forEach((p) => {
    if (p.id === projectId) {
      targetProject = { ...p };
    }
  });

  return targetProject;
}
