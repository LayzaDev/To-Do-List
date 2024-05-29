// Selecionando os elementos HTML
const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const editForm = document.querySelector("#editForm");
const editInput = document.querySelector("#editInput");
const cancelEditBtn = document.querySelector("#cancelEditBtn");
const searchInput = document.querySelector("#searchInput");
const eraseBtn = document.querySelector("#eraseButton");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue; // Variavel para guardar valores de entradas antigas

// Funções
function saveTodo(text, done = 0, save = 1) {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  const doneBtn = document.createElement("button");  
  doneBtn.classList.add("finishTodo");
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'; 
  todo.appendChild(doneBtn);

  const editBtn = document.createElement("button");  
  editBtn.classList.add("editTodo");
  editBtn.innerHTML ='<i class="fa-solid fa-pen"></i>'; 
  todo.appendChild(editBtn);

  const deleteBtn = document.createElement("button");  
  deleteBtn.classList.add("deleteTodo");
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'; 
  todo.appendChild(deleteBtn);

  if(done) {
    todo.classList.add("done");
  }

  if(save) {
    saveTodoLocalStorage({text, done: 0});
  }

  todoList.appendChild(todo);

  todoInput.value = "";
  todoInput.focus();
}

function toggleForms() {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
}

function updateTodo(editInputValue) {
  const todos = document.querySelectorAll(".todo");
  
  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");
  
    if(todoTitle.innerText === oldInputValue){
      todoTitle.innerText = editInputValue;

      updateTodoLocalStorage(oldInputValue, text);
    }
  })
}

function filterTodo(filterValue) {
  const todos = document.querySelectorAll(".todo");

  switch(filterValue) {

    case "all":

      todos.forEach((todo) => todo.style.display = "flex");

      break;

    case "done":

      todos.forEach((todo) => 
        todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );

      break;

    case "todo":

      todos.forEach((todo) => 
        !todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );

      break;

    default:

      break;
  }
}

function getSearchedTodos(search) {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    const todoTitle = todo.querySelector("h3").innerText.toLowerCase();

    todo.style.display = "flex";

    if(!todoTitle.includes(search)) {
      todo.style.display = "none";
    }
  });
};

// Eventos
todoForm.onsubmit = (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;
  
  if(inputValue) {
    saveTodo(inputValue);
  }
}

document.onclick = (e) => {
  const targetElement = e.target; // Captura o elemento alvo

  const parentElement = targetElement.closest("div"); // seleciona o elemento pai mais próximo do alvo

  let todoTitle;

  if(parentElement && parentElement.querySelector("h3")) {
    todoTitle = parentElement.querySelector("h3").innerText || "";
  }

  // Quando clicar no botão de feito...
  if(targetElement.classList.contains("finishTodo")){
    parentElement.classList.toggle("done");

    updateTodoStatusLocalStorage(todoTitle);
  }

  // Quando clicar no botao de remoção...
  if(targetElement.classList.contains("deleteTodo")){
    parentElement.remove();
    removeTodoLocalStorage(todoTitle);
  }

  // Quando clicar no botão de edição...
  if(targetElement.classList.contains("editTodo")){
    toggleForms();
    editInput.value = todoTitle; // Input de edição vem com o valor pré-preenchido
    oldInputValue = todoTitle; // Salva o antigo valor do titulo para depois descobrir o ToDo que deve ser editado
  }
}

cancelEditBtn.onclick = (e) => {
  e.preventDefault();
  toggleForms();
}

editForm.onsubmit = (e) => {
  e.preventDefault();
  
  const editInputValue = editInput.value;
  if(editInputValue){
    updateTodo(editInputValue);
  }

  toggleForms();
}

filterBtn.onchange = (e) => {
  filterValue = e.target.value;

  filterTodo(filterValue);
}

searchInput.onkeyup = (e) => {
  search = e.target.value;

  getSearchedTodos(search);
}

eraseBtn.onclick = (e) => {
  e.preventDefault();

  searchInput.value = "";

  searchInput.dispatchEvent(new Event("keyup"));
}

// Local Storage
function getTodosLocalStorage() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  return todos;
};

function loadTodos() {
  const todos = getTodosLocalStorage();

  todos.forEach((todo) => {
    saveTodo(todo.text, todo.done, 0);
  });
};

function saveTodoLocalStorage(todo) {
  const todos = getTodosLocalStorage();

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
};

function removeTodoLocalStorage(todoText) {
  const todos = getTodosLocalStorage();

  const filteredTodos = todos.filter((todo) => todo.text != todoText);

  localStorage.setItem("todos", JSON.stringify(filteredTodos));
}

const updateTodoStatusLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();

  todos.map((todo) =>
    todo.text === todoText ? (todo.done = !todo.done) : null
  );

  localStorage.setItem("todos", JSON.stringify(todos));
};

const updateTodoLocalStorage = (todoOldText, todoNewText) => {
  const todos = getTodosLocalStorage();

  todos.map((todo) =>
    todo.text === todoOldText ? (todo.text = todoNewText) : null
  );

  localStorage.setItem("todos", JSON.stringify(todos));
};

loadTodos();