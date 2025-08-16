// /js/render.js

import { saveTodoLocalStorage } from './storage.js';
import { todoForm, todoInput, todoList, editForm } from './dom.js';

export function saveTodo(text, done = 0, save = 1) {
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
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteTodo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    if (done) { todo.classList.add("done"); }

    if (save) { saveTodoLocalStorage({ text, done: 0 }); }

    todoList.appendChild(todo);
    todoInput.value = "";
    todoInput.focus();
}

export function toggleForms() {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

export function updateTodo(oldInputValue, editInputValue) {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");
        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = editInputValue;
        }
    })
}

export function filterTodo(filterValue) {
    const todos = document.querySelectorAll(".todo");
    switch (filterValue) {
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

export function getSearchedTodos(search) {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
        const todoTitle = todo.querySelector("h3").innerText.toLowerCase();
        todo.style.display = "flex";
        if (!todoTitle.includes(search.toLowerCase())) {
            todo.style.display = "none";
        }
    });
};