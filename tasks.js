/**
 * Productivity App
 * @Author Husnain Ahmad
 */
const newTaskInput = document.querySelector('#new-task-input');
const newTaskSubmitBtn = document.querySelector('#new-task-submit');
const taskList = document.querySelector('.tasks-list');

newTaskSubmitBtn.addEventListener('click', addTask);
taskList.addEventListener('click', taskClick);

window.addEventListener('load', renderTasks)

function addTask(event) {
  // Stop from page reloading when submitting
  event.preventDefault();
  // Get input from user
  let input = newTaskInput.value;
  // If empty, don't do anything.
  if(input == '')
    return;
  // Save input to local storage
  saveTask(input);
  createToDoDiv(input);
  newTaskInput.value = ''; // Clear input field
}

function createToDoDiv(userInput) {
  // Create the todo div structure
  const tododiv = document.createElement('div');
  tododiv.classList.add('todo')
  // Create the checkmark done button
  const doneBtn = document.createElement('div');
  doneBtn.classList.add('check-done');
  doneBtn.innerHTML= '<i class="fa-solid fa-check"></i>';
  tododiv.appendChild(doneBtn);
  // Create the actual todo text element
  const text = document.createElement('input');
  text.type = 'text';
  text.classList.add('todo-text');
  text.value = userInput;
  text.setAttribute('readonly', 'readonly');
  tododiv.appendChild(text);
  // Create edit button
  const editBtn = document.createElement('div');
  editBtn.classList.add('edit');
  editBtn.innerHTML= '<i class="fa-solid fa-pen-to-square"></i>';
  tododiv.appendChild(editBtn);
  // Create delete button
  const deleteBtn = document.createElement('div');
  deleteBtn.classList.add('delete');
  deleteBtn.innerHTML= '<i class="fa-solid fa-circle-xmark"></i>';
  tododiv.appendChild(deleteBtn);
  // Append to taskList
  taskList.appendChild(tododiv);
}

function taskClick(event) {
  const clicked = event.target;
  if(clicked.classList[0] === 'check-done') {
    const todoDiv = clicked.parentElement;
    todoDiv.classList.toggle('completed');
  } else if (clicked.classList[0] === 'edit') {
    const child = clicked.parentElement.querySelectorAll('input')[0];
    editClick(clicked, child)
  } else if (clicked.classList[0] === 'delete') {
    const deleteDiv = clicked.parentElement;
    deleteTask(deleteDiv);
    deleteDiv.remove();
  } 
}

function editClick(editButton, inputEl) {
  if(editButton.innerHTML.trim() === '<i class="fa-solid fa-pen-to-square"></i>') {
    inputEl.removeAttribute("readonly");
    inputEl.focus();
    editButton.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';
  } else {
    inputEl.setAttribute('readonly', 'readonly');
    editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  }
}

function getTasksFromLocalStorage() {
  // Check for existing storage
  let todos;
  if (localStorage.getItem('todos') == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  return todos;
}

function saveTask(todo) {
  let todos = getTasksFromLocalStorage();
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTasks() {
  let todos = getTasksFromLocalStorage()
  todos.forEach(function(todo) {
    createToDoDiv(todo);
  })
}

function deleteTask(todo) {
  let todos = getTasksFromLocalStorage();
  // Get index of element to delete
  const todoText = todo.querySelectorAll('input')[0].value;
  // console.log(todoText)
  todos.splice(todos.indexOf(todoText), 1);
  localStorage.setItem('todos', JSON.stringify(todos))
}