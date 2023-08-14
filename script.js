// Step 1: Define Essential HTML Elements in JavaScript
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Step 2: Load Tasks from Local Storage
let taskArray = getTasksFromLocalStorage();

// Step 3.1: Implement the getTasksFromLocalStorage() Function
function getTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return tasks;
}

// Step 3.2: Implement the updateTasksInLocalStorage() Function
function updateTasksInLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(taskArray));
}

// Step 3.3: Implement the createTask(taskText) Function
function createTask(taskText) {
  return { text: taskText, completed: false };
}

// Step 3.4: Implement the deleteTask(index) Function
function deleteTask(index) {
  taskArray.splice(index, 1);
  updateTasksInLocalStorage();
  renderTasks();
}

// Step 3.5: Implement the createTaskElement(taskObj) Function
function createTaskElement(taskObj) {
  const taskItem = document.createElement("li");
  taskItem.classList.add("taskItem");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.checked = taskObj.completed;
  checkbox.addEventListener("change", () => {
    taskObj.completed = checkbox.checked;
    taskTextElement.classList.toggle("completed", taskObj.completed);
    updateTasksInLocalStorage();
  });

  const taskTextElement = document.createElement("span");
  taskTextElement.classList.add("taskText");
  taskTextElement.textContent = taskObj.text;
  if (taskObj.completed) {
    taskTextElement.classList.add("completed");
  }

  const removeButton = document.createElement("button");
  removeButton.classList.add("removeButton");
  removeButton.textContent = "X";
  removeButton.addEventListener("click", () => {
    const index = taskArray.indexOf(taskObj);
    if (index !== -1) {
      deleteTask(index);
    }
  });

  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskTextElement);
  taskItem.appendChild(removeButton);

  return taskItem;
}

// Step 4: Implement the Render Tasks Function
function renderTasks() {
  taskList.innerHTML = "";
  for (let i = 0; i < taskArray.length; i++) {
    const taskElement = createTaskElement(taskArray[i]);
    taskList.appendChild(taskElement);
  }
}

// Step 5: Attach an Event Listener to Add Task Button
addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value;
  if (taskText === "") return;

  const newTask = createTask(taskText);
  taskArray.push(newTask);
  updateTasksInLocalStorage();
  taskInput.value = "";
  renderTasks();
});

// Step 6: Render Tasks on Page Load
renderTasks();
