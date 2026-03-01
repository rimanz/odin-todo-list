import "../styles/sidebar.css";
import { createItemGroup, createNode } from "./layout.js";

export function createSidebarItems(options) {
  const section = createNode({ ...options, tag: options.tag || "section" });
  const container = createNode({ classNames: "container", parent: section });

  if (options.heading) {
    const headingNode = createNode({
      tag: options.heading.tag || "h2",
      classNames: "section-heading",
      textContent: options.heading.textContent,
      parent: container,
    });
  }
}

export default function createSidebar() {
  const sidebar = createNode({ tag: "aside", classNames: "sidebar" });
  const brand = createNode({
    tag: "h2",
    classNames: "brand",
    textContent: "Odin Todo List",
    parent: sidebar,
  });

  const itemGroup = createItemGroup({
    classNames: "sidebar-group projects",
    heading: { tag: "h4", textContent: "Projects" },
    parent: sidebar,
  });

  dummyProjects.forEach((item) => {
    createNode({
      tag: "li",
      classNames: "sidebar-item",
      textContent: item,
      parent: itemGroup,
    });
  });
}

const dummyProjects = ["Default", "Personal", "Hobby", "Work"];
