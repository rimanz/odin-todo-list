import "./styles/index.css";
import createProjectDetails from "./ui/projectDetails.js";
import createSidebar from "./ui/sidebar.js";

const root = document.querySelector("#root");

createSidebar();
createProjectDetails();
