import {
  addProject,
  addTodo,
  deleteTodo,
  editTodo,
  getActiveProjectId,
} from "../projectManager.js";
import "../styles/dialog.css";
import { listTodos } from "./projectDetails.js";
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

export function showProjectDialog() {
  dialog.showModal();
  showForm("project-form");
  dialogHeading.textContent = `${editMode ? "Edit" : "Add New"} Project`;
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

export function showDeleteConfirmation(id) {
  todoId = id;
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
  addProject(data.name);
  listProjects();
  dialog.close();
});

confirmationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const projectId = getActiveProjectId();
  deleteTodo(projectId, todoId);
  listTodos(projectId);
  dialog.close();
});

cancelButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    todoForm.reset();
    dialog.close();
  });
});
