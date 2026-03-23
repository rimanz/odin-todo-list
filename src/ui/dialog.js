import {
  addProject,
  addTodo,
  deleteProject,
  deleteTodo,
  editTodo,
  getActiveProjectId,
  getProjects,
  renameProject,
  setActiveProjectId,
} from "../projectManager.js";
import "../styles/dialog.css";
import createProjectDetails, { listTodos } from "./projectDetails.js";
import listProjects from "./sidebar.js";

const dialog = document.getElementById("dialog");
const dialogHeading = document.getElementById("dialog-heading");
const forms = document.querySelectorAll(".dialog-form");
const projectForm = document.getElementById("project-form");
const todoForm = document.getElementById("todo-form");
const confirmationForm = document.getElementById("confirmation-form");
const inputFields = document.querySelectorAll("[name]");
const cancelButtons = document.querySelectorAll(".cancel-btn");
let editMode;
let projectId;
let todoId;

function showForm(formId) {
  const activeForm = document.getElementById(formId);

  forms.forEach((form) => {
    form.hidden = true;
    form.classList.remove("active");
  });

  activeForm.hidden = false;
  activeForm.classList.add("active");
}

export function showProjectDialog(projectData = null) {
  editMode = projectData !== null;
  projectId = projectData?.id;

  dialog.showModal();
  showForm("project-form");
  dialogHeading.textContent = `${editMode ? "Edit" : "Add New"} Project`;

  if (editMode) {
    inputFields.forEach((field) => {
      field.value = projectData[field.name];
    });
  }
}

export function showTodoDialog(todoData = null) {
  editMode = todoData !== null;
  todoId = todoData?.id;

  dialog.showModal();
  showForm("todo-form");
  dialogHeading.textContent = `${editMode ? "Edit" : "Add New"} Todo`;

  if (editMode) {
    inputFields.forEach((field) => {
      field.value = todoData[field.name];
    });
  }
}

export function showDeleteConfirmation(id, type = "todo") {
  if (type === "todo") {
    projectId = getActiveProjectId();
    toodId = id;
  } else if (type === "project") {
    projectId = id;
    todoId = null;
  } else {
    console.error("Invalid type provided!");
  }

  dialog.showModal();
  showForm("confirmation-form");
  dialogHeading.textContent = "Confirm";
}

// Listeners:
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const projectId = getActiveProjectId();
  const data = Object.fromEntries(new FormData(todoForm));

  if (editMode) {
    Object.keys(data).forEach((key) => {
      editTodo(projectId, todoId, key, data[key]);
    });
  } else {
    addTodo(projectId, data);
  }

  listTodos(projectId);
  todoForm.reset();
  todoForm.setAttribute("hidden", "");
  dialog.close();
});

projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(projectForm));

  if (editMode) {
    Object.keys(data).forEach((key) => {
      renameProject(projectId, data.name);
    });
  } else {
    addProject(data.name);
  }

  listProjects();
  createProjectDetails();
  dialog.close();
});

confirmationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (todoId === null) {
    console.log(getProjects());
    deleteProject(projectId);
    console.log(getProjects());
    listProjects();
    setActiveProjectId(getProjects()[0].id);
    createProjectDetails();
  } else {
    deleteTodo(projectId, todoId);
    listTodos(projectId);
  }

  dialog.close();
});

cancelButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    todoForm.reset();
    dialog.close();
  });
});
