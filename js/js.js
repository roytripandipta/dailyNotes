/* Follow the instructions found in the description to complete the JavaScript functionality.*/

let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");
let taskTotal = document.getElementById("taskTotal");
let taskCompleted = document.getElementById("taskCompleted");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

saveTodoButton.onclick = function () {
    let r = confirm("Do you want to save changes?");
    if (r === true) {
        localStorage.setItem("todoList", JSON.stringify(todoList));
        taskTotal.innerHTML = todoList.length;
        let completed = 0;
        for (let todo of todoList) {
            if (todo.isChecked === true) {
                completed = completed + 1;
            }
        }
        taskCompleted.innerHTML = completed;
    }

};

function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;

    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }

    todosCount = todosCount + 1;

    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
}

addTodoButton.onclick = function () {
    onAddTodo();
};

function onDeleteTodo(todoId) {
    let r = confirm("Do you want to delete this item?");
    if (r === true) {
        let todoElement = document.getElementById(todoId);
        todoItemsContainer.removeChild(todoElement);
        let index = todoList.findIndex(function (item) {
            let itemId = "todo" + item.uniqueNo;
            if (itemId === todoId) {
                return true;
            } else {
                return false;
            }
        });
        todoList.splice(index, 1);
        taskTotal.innerHTML = todoList.length;
        let completed = 0;
        for (let todo of todoList) {
            if (todo.isChecked === true) {
                completed = completed + 1;
            }
        }
        taskCompleted.innerHTML = completed;
    }
    //localStorage.setItem("todoList", JSON.stringify(todoList));
}

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(function (eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;

        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoObjectIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }


}

function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;

    inputElement.onclick = function () {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };

    inputElement.classList.add("checkbox-input");
    inputElement.checked = todo.isChecked;
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;

    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function () {
        onDeleteTodo(todoId);

    };

    deleteIconContainer.appendChild(deleteIcon);
}
let completed = 0;
for (let todo of todoList) {
    createAndAppendTodo(todo);
    if (todo.isChecked === true) {
        completed = completed + 1;
    }
}

taskTotal.innerHTML = todoList.length;
taskCompleted.innerHTML = completed;
