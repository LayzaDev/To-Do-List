import { saveTodo } from './render.js';
import { getTodosLocalStorage } from './storage.js';
import './events.js';

function loadTodos() {
  const todos = getTodosLocalStorage();
  todos.forEach((todo) => {
    saveTodo(todo.text, todo.done, 0);
  });
}

loadTodos();