// DataStructure: An array of objects as todo.

// 1. Chasign the dom.
const textInput = document.querySelector(".input");
const allTodo = document.querySelector(".btnAll");
const completedTodo = document.querySelector(".btnComplete");
const activeTodo = document.querySelector(".btnActive");
const ul = document.querySelector("ul");

// 2. Creating a single source of truth.
const sst = [];

// 3. Make a function view.
function view(data = []) {
    ul.innerHTML = "";

    data.forEach((todo, index) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.setAttribute("data-id", index);
        checkbox.addEventListener("click", checkHandle);
        checkbox.checked = todo.isDone;
        
        const p = document.createElement("p");
        p.textContent = todo.text;

        const span = document.createElement("span");
        span.textContent = "X";
        span.setAttribute("data-id", index);
        span.addEventListener("click", deleteTodos);

        li.appendChild(checkbox);
        li.appendChild(p);
        li.appendChild(span);
        ul.appendChild(li);
    });
}

// 4. Add Todos
function addTodos(e) {
    if(e.keyCode === 13) {
        const singleTodo = {
            text : textInput.value,
            isDone : false,
        };
        if(textInput.value.trim()) {
            sst.push(singleTodo);
            textInput.value = "";
            view(sst);
        }
        console.log(sst);
    }
}

// 5. Delete Todos
function deleteTodos(e) {
    const id = e.target.dataset.id;
    sst.splice(id, 1);
    view(sst);
    console.log(sst);
} 

// 6. Update Todos
// 7. Check Handle - checkbox
function checkHandle(e) {
    const id = e.target.dataset.id;
    sst[id].isDone = !sst[id].isDone;
    view(sst);
}

// 8. Completed
function completed() {
    const done = sst.filter((todo) => todo.isDone);
    view(done);
}

// 9. Active
function active() {
    const done = sst.filter((todo) => todo.isDone == false);
    view(done);
}

// 10. All todos
function allTodos() {
    view(sst);
}
// 11. Subscribe to event listeners.
textInput.addEventListener("keyup", addTodos);
allTodo.addEventListener("click", allTodos);
completedTodo.addEventListener("click", completed);
activeTodo.addEventListener("click", active);