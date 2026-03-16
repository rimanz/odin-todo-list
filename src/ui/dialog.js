import {
  addTodo,
  editTodo,
  getActiveProjectId,
  getProjects,
} from "../projectManager.js";
import "../styles/dialog.css";
import { listTodos } from "./projectDetails.js";

const dialog = document.getElementById("dialog");
const dialogHeading = document.getElementById("dialog-heading");
const todoForm = document.getElementById("todo-form");
const inputFields = document.querySelectorAll("[name]");
const cancelBtn = document.getElementById("cancel-btn");
const submitBtn = document.getElementById("submit-btn");
let editMode;
let todoId;

export function showTaskDialog(todoData = null) {
  editMode = todoData !== null;
  todoId = todoData?.id;

  dialog.showModal();
  todoForm.removeAttribute("hidden");
  dialogHeading.textContent = `${editMode ? "Edit" : "Add New"} Todo`;

  if (editMode) {
    inputFields.forEach((field) => {
      field.value = todoData[field.name];
    });
  }
}

// Listeners:
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const projectId = getActiveProjectId();
  const data = Object.fromEntries(new FormData(todoForm));
  console.log(data);

  if (editMode) {
    Object.keys(data).forEach((key) => {
      editTodo(projectId, todoId, key, data[key]);
    });
    console.log(getProjects());
  } else {
    addTodo(projectId, data);
  }

  listTodos(projectId);
  todoForm.reset();
  dialog.close();
});

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  todoForm.reset();
  dialog.close();
});
