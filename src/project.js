export default function createProject(name, todos = []) {
  return {
    id: crypto.randomUUID(),
    name,
    todos,
  };
}
