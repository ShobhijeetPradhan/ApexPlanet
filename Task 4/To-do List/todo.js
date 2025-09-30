const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAll");

// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => createTaskElement(task.text, task.completed));
});

// Add new task
addBtn.addEventListener("click", () => {
  if (input.value.trim() === "") return;
  createTaskElement(input.value, false);
  saveTasks();
  input.value = "";
});

// Create task element with delete + complete
function createTaskElement(text, completed = false) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;
  span.classList.add("task-text");
  if (completed) li.classList.add("completed");

  // Create a "complete" button on the left
const completeBtn = document.createElement("button");
completeBtn.textContent = "✔️";
completeBtn.classList.add("complete-btn");
completeBtn.style.marginRight = "10px";

// Toggle completion on click
completeBtn.addEventListener("click", () => {
  li.classList.toggle("completed");
  saveTasks();
});

  // Delete task
  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.classList.add("delete-btn");
  delBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(completeBtn); 
  li.appendChild(span);
  li.appendChild(delBtn);
  list.appendChild(li);
}

// Save tasks into localStorage
function saveTasks() {
  const tasks = [];
  list.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.querySelector(".task-text").textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all tasks
clearAllBtn.addEventListener("click", () => {
  list.innerHTML = "";
  localStorage.removeItem("tasks");
});

