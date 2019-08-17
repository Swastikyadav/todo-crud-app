// Todo app with MVC design pattern.

// Model - All the data realated code goes here. Manages the data of application.
class Model {
    constructor() {
         this.sst = [
             {text : 'Run a marathon', isDone: false},
             {text : 'Plant a tree', isDone : false},
         ]; // single source of truth.
    }

    addTodo(text) {
        const singleTodo = {
            text : text,
            isDone : false
        }
        this.sst.push(singleTodo);
    }

    deleteTodo(id) {
        this.sst.splice(id, 1);
    }

    toggleTodo(id) {
        this.sst[id].isDone = !this.sst[id].isDone;
    }
}

// View - The code for User Interface goes here.
class View {
    constructor() {
        
    };
    
    get _todoText() {
        return this.textInput.value;
    }

    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) {
            element.classList.add(className);
        }
        return element;
    }

    getElement(selector) {
        const element = document.querySelector(selector);
        return element;
    };

    displayTodos(data = []) {
        this.ul = this.getElement("ul");
        this.ul.innerHTML = "";

        data.forEach((todo, index) => {
            this.textInput = this.getElement(".input");
            this.allTodo = this.getElement(".btnAll");
            this.completedTodo = this.getElement(".btnComplete");
            this.activeTodo = this.getElement(".btnActive");

            // Creating elements
            this.li = this.createElement("li");

            this.checkbox = this.createElement("input");
            this.checkbox.type = "checkbox";
            this.checkbox.setAttribute("data-id", index);
            this.checkbox.addEventListener("click", this.toggleHandler);
            this.checkbox.checked = todo.isDone;
            
            this.p = this.createElement("p");
            this.p.textContent = todo.text;

            this.span = this.createElement("span");
            this.span.textContent = "X";
            this.span.setAttribute("data-id", index);
            this.span.addEventListener("click", this.deleteHandler);

            // Appending elements.
            this.li.appendChild(this.checkbox);
            this.li.appendChild(this.p);
            this.li.appendChild(this.span);
            this.ul.appendChild(this.li);
        });
    }
}

// Controller
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
}

const app = new Controller(new Model(), new View());