const inputElem = document.getElementById("form_input");
const btn = document.getElementById("btn");
const list_item = document.getElementById("list_item");
const searchInput = document.getElementById("searchInput");
const form = document.getElementsByTagName("form")[0];

const allFilterButton = document.getElementById("allFilterButton");
const completeFilterButton = document.getElementById("completeFilterButton");
const activeFilterButton = document.getElementById("activeFilterButton");

const todoList = [];
const EDIT_BTN_TEXT = "Edit";
const SUBMIT_BTN_TEXT = "Submit";
let editTodoIndex;

inputElem.addEventListener("change", (e) => {
    inputElem.setAttribute("value", e.target.value);
});

const handleCheckbox = (ID) => {
    const elementIndex = todoList.findIndex((todo) => todo.ID === ID);
    const currentElem = todoList[elementIndex];
    currentElem.taskStatus = !currentElem.taskStatus;
    renderTodoList(todoList);
};

const deleteTodo = (ID) => {
    const elementIndex = todoList.findIndex((todo) => todo.ID === ID);
    todoList.splice(elementIndex, 1);
    renderTodoList(todoList);
};

const editTodo = (ID) => {
    const elementIndex = todoList.findIndex((todo) => todo.ID === ID);
    editTodoIndex = elementIndex;
    inputElem.value = todoList[elementIndex].todo;
    btn.innerHTML = EDIT_BTN_TEXT;
};

const renderTodoList = (array) => {
    list_item.innerHTML = "";

    array.forEach((task, index) => {
        const liElem = document.createElement("li");
        const checkboxElem = document.createElement("input");
        const labelElem = document.createElement("label");
        const deleteButton = document.createElement('button');
        const editButton = document.createElement('button');

        deleteButton.innerText = "Delete";
        editButton.innerText = "Edit";

        checkboxElem.type = "checkbox";
        checkboxElem.checked = task.taskStatus;

        checkboxElem.addEventListener("change", () => {
            handleCheckbox(task.ID);
        });

        deleteButton.addEventListener("click", () => {
            deleteTodo(task.ID);
        });

        editButton.addEventListener("click", () => {
            editTodo(task.ID);
        });

        labelElem.textContent = task.todo;

        liElem.appendChild(checkboxElem);
        liElem.appendChild(labelElem);
        liElem.appendChild(deleteButton);
        liElem.appendChild(editButton);

        list_item.appendChild(liElem);
    });

    console.log(todoList);
};

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (btn.innerText === EDIT_BTN_TEXT) {
        todoList[editTodoIndex].todo = inputElem.value;
        renderTodoList(todoList);
        btn.innerText = SUBMIT_BTN_TEXT;
        inputElem.value = "";
    } else {
        todoList.push({ ID: Date.now(), todo: inputElem.value, taskStatus: false });
        renderTodoList(todoList);
        inputElem.value = "";
    }
});

const searchFeature = (array) => {
    searchInput.addEventListener("keyup", () => {
        const searchInputValue = searchInput.value.toLowerCase();
        const filterTodos = array.filter((elem) => elem.todo.toLowerCase().includes(searchInputValue));
        renderTodoList(filterTodos);
    });
};

allFilterButton.addEventListener("click", () => {
    renderTodoList(todoList);
    searchFeature(todoList);
});

completeFilterButton.addEventListener("click", () => {
    const filterTodos = todoList.filter((elem) => elem.taskStatus === true);
    renderTodoList(filterTodos);
    searchFeature(filterTodos);
});

activeFilterButton.addEventListener("click", () => {
    const filterTodos = todoList.filter((elem) => elem.taskStatus === false);
    renderTodoList(filterTodos);
    searchFeature(filterTodos);
});

searchFeature(todoList);
