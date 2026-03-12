import createProject from "./project.js";
import createTodo from "./todo.js";

let projects = [
  {
    id: "default",
    name: "Default",
    todos: [createTodo("Test 1", "Testing...", "20-02-2002", "high")],
    todos: [createTodo("Test 2", "Testing again", "20-02-2002")],
  },
];
let activeProjectId = "default";

export function getActiveProjectId() {
  return activeProjectId;
}

export function setActiveProjectId(projectId) {
  activeProjectId = projectId;
}

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

export function addTodo(projectId, todoData) {
  const project = getProjectById(projectId);
  project.todos = [...structuredClone(project.todos), createTodo(todoData)];
  projects = projects.map((p) => (p.id === projectId ? project : p));
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
    projects = projects.map((p) => (p.id === projectId ? project : p));
  }
}

export function moveTodo(todoId, sourceProjectId, destinationProjectId) {
  const todo = getTodoById(sourceProjectId, todoId);
  deleteTodo(sourceProjectId, todoId);
  addTodo(destinationProjectId, todo);
}

export function listTodos(projectId) {
  return getProjectById(projectId).todos;
}

function editTodo(projectId, todoId, prop, value) {
  const todo = getTodoById(projectId, todoId);
  todo[prop] = value;

  const project = getProjectById(projectId);
  project.todos = project.todos.map((t) => (t.id === todoId ? todo : t));
  projects = getProjects().map((p) => (p.id === projectId ? project : p));
}

export function editTodoTitle(projectId, todoId, value) {
  editTodo(projectId, todoId, "title", value);
}

export function editTodoDescription(projectId, todoId, value) {
  editTodo(projectId, todoId, "description", value);
}

export function edtitTodoNotes(projectId, todoId, value) {
  editTodo(projectId, todoId, "notes", value);
}

export function editDueDate(projectId, todoId, value) {
  editTodo(projectId, todoId, "dueDate", value);
}

export function setTodoPriority(projectId, todoId, value) {
  const validPriorities = ["high", "medium", "low"];
  value = value.toLowerCase();

  if (validPriorities.includes(value)) {
    editTodo(projectId, todoId, "priority", value);
  } else {
    throw new Error(`${value} is not a valid priority!`);
  }
}

export function toggleTodo(projectId, todoId) {
  const status = getTodoById(projectId, todoId).completed;

  editTodo(projectId, todoId, "completed", !status);
}
