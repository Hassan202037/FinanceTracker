const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const todoCount = document.getElementById("todo-count");
const searchInput = document.getElementById("search-input");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text !== "") {
    todos.push({ text });
    input.value = "";
    saveAndRender();
  }
});

searchInput.addEventListener("input", () => {
  renderTodos(searchInput.value.trim().toLowerCase());
});

function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos(searchInput.value.trim().toLowerCase());
}

function renderTodos(filter = "") {
  todoList.innerHTML = "";

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(filter)
  );

  filteredTodos.forEach((todo, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = todo.text;

    const actions = document.createElement("div");
    actions.className = "actions";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      const originalIndex = todos.findIndex(t => t.text === todo.text);
      todos.splice(originalIndex, 1);
      saveAndRender();
    };

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit";
    editBtn.onclick = () => {
      const newText = prompt("Edit your task:", todo.text);
      if (newText !== null && newText.trim() !== "") {
        const originalIndex = todos.findIndex(t => t.text === todo.text);
        todos[originalIndex].text = newText.trim();
        saveAndRender();
      }
    };

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(actions);

    todoList.appendChild(li);
  });

  todoCount.textContent = todos.length;
}

// أول مرة تحميل
renderTodos();
