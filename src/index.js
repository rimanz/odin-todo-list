import "./styles/index.css";
import createProjectDetails from "./ui/projectDetails.js";
import listProjects from "./ui/sidebar.js";

const root = document.querySelector("#root");

listProjects();
createProjectDetails();
