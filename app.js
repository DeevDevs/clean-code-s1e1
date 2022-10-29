const taskInput = document.querySelector(".add-task-box__input");
const btnAddTask = document.querySelector(".add-task-box__btn");
const incompleteTasksBox = document.querySelector(".incomplete-tasks-box");
const completedTasksBox = document.querySelector(".completed-tasks-box");

function createNewTaskElement(taskString) {
  const newTask = document.createElement("li");
  newTask.classList.add("task");
  const checkBox = document.createElement("input");
  checkBox.classList.add("task__checkbox");
  const label = document.createElement("label");
  label.classList.add("task__label");
  const editInput = document.createElement("input");
  editInput.classList.add("task__input");
  const editButton = document.createElement("button");
  editButton.classList.add("task__btn-edit");
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("task__btn-delete");
  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.classList.add("task__btn-delete-img");

  label.innerText = taskString;
  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  newTask.appendChild(checkBox);
  newTask.appendChild(label);
  newTask.appendChild(editInput);
  newTask.appendChild(editButton);
  newTask.appendChild(deleteButton);

  return newTask;
}

function addTask() {
  if (!taskInput.value) return;

  const listItem = createNewTaskElement(taskInput.value);
  incompleteTasksBox.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

function editTask() {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector(".task__input");
  const label = listItem.querySelector(".task__label");
  const editBtn = listItem.querySelector(".task__btn-edit");
  let containsClass = listItem.classList.contains("task_edit-mode");
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("task_edit-mode");
}

function deleteTask() {
  const listItem = this.parentNode;
  const listParent = listItem.parentNode;
  listParent.removeChild(listItem);
}

function taskCompleted() {
  const listItem = this.parentNode;
  listItem.querySelector(".task__label").classList.add("task__label_completed");
  completedTasksBox.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
  const listItem = this.parentNode;
  listItem
    .querySelector(".task__label")
    .classList.remove("task__label_completed");
  incompleteTasksBox.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector(".task__checkbox");
  const editButton = taskListItem.querySelector(".task__btn-edit");
  const deleteButton = taskListItem.querySelector(".task__btn-delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

////////////////// initiation starts here ///////////////
btnAddTask.onclick = addTask;
btnAddTask.addEventListener("click", addTask);

for (let i = 0; i < incompleteTasksBox.children.length; i++) {
  bindTaskEvents(incompleteTasksBox.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksBox.children.length; i++) {
  bindTaskEvents(completedTasksBox.children[i], taskIncomplete);
}