import { addTodo, getActiveProjectId } from "../projectManager.js";
import "../styles/dialog.css";
import { listTodos } from "./projectDetails.js";

const dialog = document.getElementById("dialog");
const dialogHeading = document.getElementById("dialog-heading");
const todoForm = document.getElementById("todoForm");
const dueDate = document.getElementById("dueDate");
const cancelBtn = document.getElementById("cancel-btn");
const submitBtn = document.getElementById("submit-btn");

export function showAddTaskDialog() {
  dialog.showModal();
  todoForm.removeAttribute("hidden");
  dialogHeading.textContent = "Add new todo";
}

// Listeners:
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(todoForm));
  addTodo(getActiveProjectId(), data);
  listTodos(getActiveProjectId());
  todoForm.reset();
  dialog.close();
});

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  todoForm.reset();
  dialog.close();
});
