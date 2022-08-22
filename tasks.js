/**
 * Productivity App
 * Allow users to add, delete, mark done, and edit the tasks
 * that they add. It also uses local storage to save tasks upon refresh.
 * 
 * @Author Husnain Ahmad
 */


const newTaskInput = document.querySelector('#new-task-input');
const newTaskSubmitBtn = document.querySelector('#new-task-submit');
const taskList = document.querySelector('.tasks-list');

newTaskSubmitBtn.addEventListener('click', addTask);
taskList.addEventListener('click', taskClick);
// Each time window loads, display locally stored tasks.
window.addEventListener('load', renderTasks);

/**
 * Adds a todo to the taskList.
 * @param {*} event 
 * @returns 
 */
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

/**
 * Create the todo div.
 * @param {*} userInput 
 */
function createToDoDiv(userInput) {
  // Create the todo div structure
  const tododiv = document.createElement('div');
  tododiv.classList.add('todo');
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
  text.setAttribute('readonly', 'readonly'); // Initially make it uneditable.
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

/**
 * Called each time a task is clicked. Only does things if one of the 
 * three button on a task is clicked.
 * @param {*} event 
 */
function taskClick(event) {
  const clicked = event.target;

  if(clicked.classList[0] === 'check-done') {
    // If check mark is clicked, mark that todo Div completed.
    const todoDiv = clicked.parentElement;
    todoDiv.classList.toggle('completed');
  } else if (clicked.classList[0] === 'edit') {
    // If edit is clicked, allow the task input to be edited.
    const child = clicked.parentElement.querySelectorAll('input')[0];
    editClick(clicked, child);
  } else if (clicked.classList[0] === 'delete') {
    // Task gets deleted if this button is clicked.
    const deleteDiv = clicked.parentElement;
    deleteTask(deleteDiv);
    deleteDiv.remove();
  } 
}

/**
 * Change the edit button background depending on if it can be editted
 * or if it can be saved.
 * @param {*} editButton 
 * @param {*} inputEl 
 */
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

/**
 * Gets todos from local storage.
 * @returns 
 */
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

/**
 * Called when a new task is added and needs to be added to local storage.
 * @param {*} todo 
 */
function saveTask(todo) {
  let todos = getTasksFromLocalStorage();
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

/**
 * Displays the tasks from local storage onto the DOM.
 */
function renderTasks() {
  let todos = getTasksFromLocalStorage();
  todos.forEach(function(todo) {
    createToDoDiv(todo);
  })
}

/**
 * Deletes a task from local storage given the text of the todo.
 * @param {*} todo 
 */
function deleteTask(todo) {
  let todos = getTasksFromLocalStorage();
  // Get index of element to delete
  const todoText = todo.querySelectorAll('input')[0].value;
  todos.splice(todos.indexOf(todoText), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}