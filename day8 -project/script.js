const todoList = document.getElementById("todo-list");
const addBtn = document.getElementById("add-btn");
const clearBtn = document.getElementById("clear-btn");
const filterButtons = document.querySelectorAll(".filters button");
const taskInput = document.getElementById("task-input");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let clearToggle = false;


function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}


function renderTodos(filter = "all") {
    todoList.innerHTML = "";
    let filtered = todos.filter(todo => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    filtered.forEach((todo, index) => {
        const li = document.createElement("li");
        li.className = "todo-item";

        const span = document.createElement("span");
        span.innerHTML = todo.text;
        if (todo.completed) span.classList.add("completed");


        span.addEventListener("click", () => {
            todos[index].completed = !todos[index].completed;
            saveTodos();
            renderTodos(filter);
        });


        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.addEventListener("click", () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos(filter);
        });

        li.appendChild(span);
        li.appendChild(delBtn);
        todoList.appendChild(li);
    });
}


addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text) {
        todos.push({ text, completed: false });
        taskInput.value = "";
        saveTodos();
        renderTodos();
    }
});


clearBtn.addEventListener("click", () => {
    if (!clearToggle) {
        clearBtn.textContent = "⚠️ Confirm Delete All";
        clearToggle = true;
    } else {
        todos = [];
        saveTodos();
        renderTodos();
        clearBtn.textContent = "🗑 Clear All";
        clearToggle = false;
    }
});


filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        renderTodos(btn.id);
    });
});


document.querySelectorAll(".tag-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        taskInput.value += " " + btn.textContent;
        taskInput.focus();
    });
});


renderTodos();