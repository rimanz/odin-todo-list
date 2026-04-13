import createProject from "./project.js";
import { getState, setState } from "./storage.js";
import createTodo from "./todo.js";

const state = getState();

export function getActiveProjectId() {
  return state.activeProjectId;
}

export function setActiveProjectId(projectId) {
  state.activeProjectId = projectId;
  setState(state);
}

export function addProject(projectName) {
  if (!projectName) {
    throw new Error("A project name must be provided!");
  } else if (state.projects.some((p) => p.name === projectName)) {
    throw new Error(`The project name '${projectName}' already exists!`);
  } else {
    state.projects = [...state.projects, createProject(projectName)];
    setState(state);
  }
}

export function deleteProject(projectId) {
  if (getProjectById(projectId) && state.projects.length > 1) {
    state.projects = state.projects.filter((p) => p.id !== projectId);
    setState();
  } else {
    throw new Error("You must have at least one project!");
  }
}

export function renameProject(projectId, newName) {
  const project = getProjectById(projectId);

  if (
    project &&
    state.projects
      .filter((p) => p.id !== projectId)
      .some((p) => p.name === newName)
  ) {
    throw new Error(`The name '${newName}' already exists!`);
  } else {
    project.name = newName;
    setState(state);
  }
}

export function getProjects() {
  return state.projects;
}

export function getProjectById(projectId) {
  let project;

  if (projectId) {
    project = state.projects.find((p) => p.id === projectId);
  } else {
    throw new Error("A project ID must be provided!");
  }

  if (project) {
    return project;
  } else {
    throw new Error(`No project found with ID: ${projectId}`);
  }
}

export function addTodo(projectId, todoData) {
  const project = getProjectById(projectId);
  project.todos = [...structuredClone(project.todos), createTodo(todoData)];
  state.projects = state.projects.map((p) =>
    p.id === projectId ? project : p,
  );
  setState(state);
}

export function getTodoById(projectId, todoId) {
  const project = getProjectById(projectId);
  let todo;

  if (todoId) {
    todo = project.todos.find((t) => t.id === todoId);
  } else {
    throw new Error("A todo ID must be provided!");
  }

  if (todo) {
    return todo;
  } else {
    throw new Error(`No todo found with id ${todoId} in  ${project.name}`);
  }
}

export function deleteTodo(projectId, todoId) {
  const project = getProjectById(projectId);

  if (getTodoById(projectId, todoId) && project.todos.length > 0) {
    project.todos = project.todos.filter((t) => t.id !== todoId);
    state.projects = state.projects.map((p) =>
      p.id === projectId ? project : p,
    );
    setState(state);
  }
}

export function moveTodo(todoId, sourceProjectId, destinationProjectId) {
  const todo = getTodoById(sourceProjectId, todoId);
  deleteTodo(sourceProjectId, todoId);
  addTodo(destinationProjectId, todo);
}

export function getTodos(projectId) {
  return getProjectById(projectId).todos;
}

export function editTodo(projectId, todoId, prop, value) {
  const todo = getTodoById(projectId, todoId);
  todo[prop] = value;

  const project = getProjectById(projectId);
  project.todos = project.todos.map((t) => (t.id === todoId ? todo : t));
  state.projects = getProjects().map((p) => (p.id === projectId ? project : p));
  setState(state);
}

export function toggleTodo(projectId, todoId) {
  const status = getTodoById(projectId, todoId).completed;

  editTodo(projectId, todoId, "completed", !status);
}
