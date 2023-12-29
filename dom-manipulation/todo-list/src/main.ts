import './style.css'

const addButton = document.getElementById("add-button")! as HTMLButtonElement
const todoList = document.getElementById("todo-list")!
const todoInput = document.getElementById("todo-input")! as HTMLInputElement

addButton.addEventListener("click", submitTodo)
todoInput.addEventListener("input", updateButtonState)

todoInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    submitTodo();
  }
});

function submitTodo() {
  const listItem = document.createElement('li')

  const heading = document.createElement('h2')
  heading.textContent = todoInput.value

  const deleteButton = document.createElement('button')
  deleteButton.classList.add('delete-button')
  deleteButton.textContent = 'X'
  deleteButton.addEventListener('click', onClickDelete);

  listItem.appendChild(heading)
  listItem.appendChild(deleteButton)
  todoList.appendChild(listItem)

  todoInput.value = ''
  updateButtonState()
}

function updateButtonState() {
  addButton.disabled = todoInput.value.trim() === ''
}

function onClickDelete() {
  this.parentNode.remove()
}
