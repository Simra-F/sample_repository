// All task persistence goes through these functions (see CONTRIBUTING.md and docs/storage-api.md).
const STORAGE_KEY = "taskbox.tasks";

function fetchTasks() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function addTask(title) {
  const tasks = fetchTasks();
  const id = tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
  tasks.push({ id: id, title: title, done: false, createdAt: Date.now() });
  saveTasks(tasks);
  return tasks;
}

function toggleTask(id) {
  const tasks = fetchTasks().map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  saveTasks(tasks);
  return tasks;
}

function removeTask(id) {
  const tasks = fetchTasks().filter((t) => t.id !== id);
  saveTasks(tasks);
  return tasks;
}

if (typeof module !== "undefined") {
  module.exports = { STORAGE_KEY, fetchTasks, saveTasks, addTask, toggleTask, removeTask };
}
