import { format, isValid } from "date-fns";
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
const dialogViews = document.querySelectorAll(".dialog-view");
const projectForm = document.getElementById("project-view");
const todoForm = document.getElementById("todo-view");
const confirmationForm = document.getElementById("confirmation-view");
const messageBox = document.getElementById("message-box");
const errorInfoView = document.getElementById("error-info-view");
const errorInfoBox = document.getElementById("error-info-box");
const inputFields = document.querySelectorAll("input, textarea, select");
const cancelButtons = document.querySelectorAll(".cancel-btn");
let editMode;
let projectId;
let todoId;

function showView(viewId) {
  const activeView = document.getElementById(viewId);

  dialogViews.forEach((view) => {
    view.hidden = true;
    view.classList.remove("active");
  });

  activeView.hidden = false;
  activeView.classList.add("active");
  bringFocus(".active [autofocus]");
}

function bringFocus(selector) {
  const targetEl = document.querySelector(selector);
  targetEl.focus();
}

export function showProjectDialog(projectData = null) {
  editMode = projectData !== null;
  projectId = projectData?.id;

  dialog.showModal();
  showView("project-view");
  dialogHeading.textContent = `${editMode ? "Edit" : "New"} Project`;

  inputFields.forEach((field) => {
    field.value = editMode ? projectData[field.name] : "";
  });
}

export function showTodoDialog(todoData = null) {
  editMode = todoData !== null;
  todoId = todoData?.id;

  dialog.showModal();
  showView("todo-view");
  dialogHeading.textContent = `${editMode ? "Edit" : "New"} Todo`;

  inputFields.forEach((field) => {
    if (editMode && field.type === "date") {
      const dateValue = todoData[field.name];

      if (isValid(dateValue)) field.value = format(dateValue, "yyyy-MM-dd");
    } else if (field.type === "select-one") {
      field.value = editMode ? todoData[field.name] : "medium";
    } else {
      field.value = editMode ? todoData[field.name] : "";
    }
  });
}

export function showDeleteConfirmation(id, type = "todo") {
  if (type === "todo") {
    projectId = getActiveProjectId();
    todoId = id;
  } else if (type === "project") {
    projectId = id;
    todoId = null;
  } else {
    console.error("Invalid type provided!");
  }

  dialog.showModal();
  showView("confirmation-view");
  dialogHeading.textContent = "Confirm";
  messageBox.textContent = "Are you sure to delete?";
}

// Listeners:
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const parentForm = e.target.closest("form");
  const projectId = getActiveProjectId();
  const data = Object.fromEntries(new FormData(parentForm));

  if (editMode) {
    Object.keys(data).forEach((key) => {
      editTodo(projectId, todoId, key, data[key]);
    });
  } else {
    parentForm.reset();
    addTodo(projectId, data);
  }

  listTodos(projectId);
  parentForm.reset();
  parentForm.setAttribute("hidden", "");
  dialog.close();
});

projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const parentForm = e.target.closest("form");
  const data = Object.fromEntries(new FormData(parentForm));

  if (editMode) {
    Object.keys(data).forEach((key) => {
      renameProject(projectId, data.name);
    });
  } else {
    parentForm.reset();
    addProject(data.name);
  }

  listProjects();
  createProjectDetails();
  parentForm.reset();
  parentForm.setAttribute("hidden", "");
  dialog.close();
});

confirmationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (todoId === null) {
    try {
      deleteProject(projectId);
    } catch (error) {
      showView("error-info-view");
      dialogHeading.textContent = "Error";
      console.dir(error);
      errorInfoBox.textContent = String(error.message);
      return;
    }

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
    e.target.closest("form").reset();
    dialog.close();
  });
});
