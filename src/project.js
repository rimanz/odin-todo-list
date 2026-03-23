export default function createProject(name, todos = []) {
  return {
    id: crypto.randomUUID(),
    type: "project",
    name,
    todos,
  };
}
