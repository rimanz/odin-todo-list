/**
 * Creates an HTML element with specified attributes and properties.
 * @param {Object} options - Configuration options.
 * @param {string} [options.tag='div'] - HTML tag name.
 * @param {Object} [options.attributes] - Key-value pairs of HTML attributes.
 * @param {string} [options.classNames] - Space-separated CSS class names.
 * @param {string} [options.textContent] - Text content of the element.
 * @param {HTMLElement} [options.parent] - Parent node to append to. Defaults to #root element.
 * @returns {HTMLElement} The created element.
 */
export function createNode(options = {}) {
  const node = document.createElement(options.tag || "div");
  if (options.textContent !== undefined) node.textContent = options.textContent;

  if (options.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => {
      node.setAttribute(key, value);
    });
  }

  if (options.classNames?.length > 0) {
    options.classNames.split(" ").forEach((className) => {
      node.classList.add(className);
    });
  }

  if (options.parent) {
    options.parent.appendChild(node);
  } else {
    document.querySelector("#root").appendChild(node);
  }

  return node;
}

/**
 * Creates a section with an inner container wrapper.
 * @param {Object} options - Configuration options.
 * @param {string} [options.tag='section'] - HTML tag name for the section.
 * @param {Object} [options.attributes] - Key-value pairs of HTML attributes.
 * @param {string} [options.classNames] - Space-separated CSS class names.
 * @param {boolean} [options.isOrderedGroup=false] - Whether to use ol (true) or ul (false) for container.
 * @param {Object} [options.heading] - Section heading configuration.
 * @param {string} [options.heading.tag='h2'] - Heading element tag.
 * @param {string} [options.heading.textContent] - Heading text content.
 * @param {HTMLElement} [options.parent] - Parent node to append to. Defaults to #root element.
 * @returns {HTMLElement} The inner container element.
 */
export function createItemGroup(options) {
  const section = createNode({ ...options, tag: options.tag || "section" });

  if (options.heading) {
    const headingNode = createNode({
      tag: options.heading.tag || "h2",
      classNames: "section-heading",
      textContent: options.heading.textContent,
      parent: section,
    });
  }

  const itmeContainer = createNode({
    tag: options.isOrderedGroup ? "ol" : "ul",
    classNames: "container",
    parent: section,
  });

  // Returns the container inside the section, not the section itself!
  // It makes it easier to refer container to put things inside it.
  return itmeContainer;
}
