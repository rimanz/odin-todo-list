const STORAGE_KEY = "appData";
const InitialState = {
  projects: [
    {
      id: "default",
      type: "project",
      name: "Default",
      todos: [],
    },
  ],
  activeProjectId: "default",
};

let state = loadState();

function loadState() {
  if (localStorage.getItem(STORAGE_KEY)) {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      console.error(e);
    }
  }
  return InitialState;
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
}

export function getState() {
  return { ...state };
}

export function setState(newState) {
  state = { ...newState };
  saveState();
}
