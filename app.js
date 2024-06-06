const todoList = document.querySelector("#todo-list");
const addform = document.querySelector("#add-todo");
const newItem = document.querySelector("#new-todo");
// let tasks = document.querySelectorAll("ul li");

// Retrieve from local storage
let todos = JSON.parse(localStorage.getItem("todos")) || [];
for (let todo of todos) {
    createNewToDoItem(todoList, todo.task, todo.isCompleted);
}

// Remove or mark a tast as completed
todoList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        event.target.parentElement.remove();

        // Update local storage
        for (let td of todos) {
            if (td.task === event.target.parentElement.innerText.slice(0, -6)) {
                let idx = todos.indexOf(td);
                let done = todos.splice(idx, 1);
            }
        }
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    else if (event.target.type === "checkbox") {
        event.target.parentElement.classList.toggle("completed");

        // Update the todo status in local storage
        for (td of todos) {
            if (td.task === event.target.parentElement.innerText.slice(0, -6)) {
                td.isCompleted = event.target.checked;
            }
        }
        localStorage.setItem("todos", JSON.stringify(todos));
    }
})

// Add a new item to ToDo List
addform.addEventListener("submit", (event) => {
    event.preventDefault();
    createNewToDoItem(todoList, newItem.value, false);

    // Save to local storage
    todos.push({task: newItem.value, isCompleted: false});
    localStorage.setItem("todos", JSON.stringify(todos));
    addform.reset();
})

function createNewToDoItem(TDList, TDText, status) {
    const newLi = document.createElement("li");
    const newBtn = document.createElement("button");
    const newCB = document.createElement("input");
    newCB.type = "checkbox";
    newLi.classList.add("todo")
    if (status) {
        newCB.checked = true;
        newLi.classList.toggle("completed");
    }
    newLi.innerText = TDText;
    newBtn.innerText = "Remove";
    newLi.append(newBtn);
    newLi.prepend(newCB);
    TDList.append(newLi);
}
