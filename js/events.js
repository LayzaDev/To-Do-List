// /js/events.js

import * as DOM from './dom.js';
import * as Render from './render.js';
import * as Storage from './storage.js';

let oldInputValue; // Variável para guardar valores de entradas antigas

DOM.todoForm.onsubmit = (e) => {
    e.preventDefault();
    const inputValue = DOM.todoInput.value;
    if (inputValue) {
        Render.saveTodo(inputValue);
    }
};

document.onclick = (e) => {
    const targetElement = e.target; // Captura o elemento alvo
    const parentElement = targetElement.closest("div.todo"); // seleciona o elemento pai mais próximo com a classe "todo"

    if (!parentElement) return;

    const todoTitle = parentElement.querySelector("h3").innerText || "";

    // Quando clicar no botão de feito...
    if (targetElement.classList.contains("finishTodo")) {
        parentElement.classList.toggle("done");
        Storage.updateTodoStatusLocalStorage(todoTitle);
    }

    // Quando clicar no botão de remoção...
    if (targetElement.classList.contains("deleteTodo")) {
        parentElement.remove();
        Storage.removeTodoLocalStorage(todoTitle);
    }

    // Quando clicar no botão de edição...
    if (targetElement.classList.contains("editTodo")) {
        Render.toggleForms();
        DOM.editInput.value = todoTitle; // Input de edição vem com o valor pré-preenchido
        oldInputValue = todoTitle; // Salva o antigo valor do título
    }
}

DOM.cancelEditBtn.onclick = (e) => {
    e.preventDefault();
    Render.toggleForms();
}

DOM.editForm.onsubmit = (e) => {
    e.preventDefault();
    const editInputValue = DOM.editInput.value;
    if (editInputValue) {
        Render.updateTodo(oldInputValue, editInputValue);
        Storage.updateTodoLocalStorage(oldInputValue, editInputValue);
    }
    Render.toggleForms();
}

DOM.filterBtn.onchange = (e) => {
    Render.filterTodo(e.target.value);
}

DOM.searchInput.onkeyup = (e) => {
    Render.getSearchedTodos(e.target.value);
}

DOM.eraseBtn.onclick = (e) => {
    e.preventDefault();
    DOM.searchInput.value = "";
    DOM.searchInput.dispatchEvent(new Event("keyup"));
}