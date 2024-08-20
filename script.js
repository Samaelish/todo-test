// Достаем поле ввода, кнопки "добавить", "удалить все" и список задач
const todoInput = document.getElementById('todo-input')

const addTodoBtn = document.getElementById('add-todo-btn')
const clearAllBtn = document.getElementById('clear-all-btn')

const todoList = document.getElementById('todo-list')

// Создаём массив пустой массив задач или достаём из localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || []

// Добавляем слушатели события к кнопкам
addTodoBtn.addEventListener('click', addTodo)
clearAllBtn.addEventListener('click', clearAllTodos)

// Функция, добавляющая задачу (todo-item)
// Каждая задача - объект с двумя свойствами.
// Текстом, полученном при вводе от пользователя и boolean значением "completed"

function addTodo() {
  const todoText = todoInput.value.trim()
  if (todoText !== '') {
    const todo = {
      text: todoText,
      completed: false,
    }
    todos.push(todo)
    saveToLocalStorage()
    renderTodoList()
    todoInput.value = ''
  }
}

// Функция для отрисовки списка задач после изменений.
// Требуется для рендеринга приложения на нативном JS, используется при любом изменении списка задач.
// Для каждого todoItem используется дата-атрибут "data-index", для удаления и завершения задачи.
function renderTodoList() {
  todoList.innerHTML = ''
  todos.forEach((todo, index) => {
    const todoItem = document.createElement('li')
    todoItem.classList.add('todo-item')
    if (todo.completed) {
      todoItem.classList.add('completed')
    }
    todoItem.innerHTML = `
            <span>${todo.text}</span>
            <button class="delete-btn" data-index="${index}">Удалить</button>
            <button class="complete-btn" data-index="${index}">Завершить</button>
            `
    todoList.appendChild(todoItem)
  })
}

// Функция для удаления задачи.
// Использует индекс, полученный из data-атрибута "data-index".

function deleteTodo(index) {
  todos.splice(index, 1)
  saveToLocalStorage()
  renderTodoList()
}

// Функция для завершения задачи.
function completeTodo(index) {
  todos[index].completed = !todos[index].completed
  saveToLocalStorage()
  renderTodoList()
}

// Функция для удаления всех задач
function clearAllTodos() {
  todos = []
  saveToLocalStorage()
  renderTodoList()
}

// Функция для сохранения списка задач в localStorage
function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos))
}

// Добавление слушателей события на каждую задачу
todoList.addEventListener('click', e => {
  if (e.target.classList.contains('delete-btn')) {
    const index = e.target.dataset.index
    deleteTodo(index)
  } else if (e.target.classList.contains('complete-btn')) {
    const index = e.target.dataset.index
    completeTodo(index)
  }
})

// Запуск приложения, рендер списка задач
renderTodoList()
