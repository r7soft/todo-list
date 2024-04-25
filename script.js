const createTodoContainerElem = document.querySelector('#create-todo-container');
const closeCreateTodoContainerElem = document.querySelector('#close-create-todo-container');
const addTodoButtonElem = document.querySelector('#add-todo-button');
const todoFormElem = document.querySelector("#todo_form");

const searchInput = document.querySelector("#search-input");

const taskInputElem = document.querySelector("#todo_input");
const dateInputElem = document.querySelector("#todo_date");
const timeInputElem = document.querySelector("#todo_time");
const submitBtnElem = document.querySelector('#submit_btn')


const todoContainer = document.querySelector('#todo-container');


const allFilterButtonElem = document.querySelector('#allFilterButton');
const completeFilterButtonElem = document.querySelector('#completeFilterButton');
const activeFilterButtonElem = document.querySelector('#activeFilterButton');

let todoList = JSON.parse(localStorage.getItem("todos")) || [];

const EDIT_BTN_TEXT = 'Edit'
const SUBMIT_BTN_TEXT = "Submit";

let editTodoIndex;

const renderTodoList = (array) => {
    todoContainer.innerHTML = "";

    array.forEach((todo) => {
        const clutter = `
            <div class="todo">
                <div class="todo-name">
                    <p>${todo.task}</p>
                    <input class="checkbox" type="checkbox" ${todo.taskStatus ? 'checked' : ''} >
                </div>
                <div class="timeDate-container">
                    <div class="time-container">
                        <p>${todo.time}</p>
                    </div>
                    <div class="date-container">
                        <p>${todo.date}</p>
                    </div>
                </div>
                <div class="bottom">                 
                    <div class="submit-date-container">
                        <p>${new Date().toDateString()}</p>
                    </div>
                    <div class="button-container">
                        <div class="edit-button"><i class="ri-pencil-fill"></i></div>
                        <div class="delete-button"><i class="ri-delete-bin-7-fill"></i></div>
                    </div>
                </div>
            </div>`;
        todoContainer.innerHTML += clutter;
    });

    const checkboxElem = document.querySelectorAll(".checkbox");

    checkboxElem.forEach((checkbox, index) => {
        checkbox.addEventListener("change", () => {
            handleCheckbox(array[index].ID);
        });
    });



    const deleteButtonElem = document.querySelectorAll('.delete-button');
    deleteButtonElem.forEach((deleteButton, index) => {
        deleteButton.addEventListener("click", () => {
            deleteTodo(array[index].ID);
        });
    });

    const editButtonElem = document.querySelectorAll('.edit-button');
    editButtonElem.forEach((editButton, index) => {
        editButton.addEventListener("click", () => {
            editTodo(array[index].ID);
        });
    });



};

const allFilter = () => {
    allFilterButtonElem.style.backgroundColor = '#fff'
    allFilterButtonElem.style.color = '#000'
    completeFilterButtonElem.style.backgroundColor = '#1B1B1B'
    completeFilterButtonElem.style.color = '#fff'
    activeFilterButtonElem.style.backgroundColor = '#1B1B1B'
    activeFilterButtonElem.style.color = '#fff'
    renderTodoList(todoList);
};

const deleteTodo = (ID) => {
    const elementIndex = todoList.findIndex((todo) => todo.ID === ID);
    todoList.splice(elementIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todoList));
    allFilter();
};

const editTodo = (ID) => {

    const elementIndex = todoList.findIndex((todo) => todo.ID === ID);
    editTodoIndex = elementIndex;
    taskInputElem.value = todoList[elementIndex].task;
    timeInputElem.value = todoList[elementIndex].time;
    dateInputElem.value = todoList[elementIndex].date;
    submitBtnElem.innerHTML = EDIT_BTN_TEXT;
    createTodoContainerElem.style.display = 'flex';
};

const handleCheckbox = (ID) => {
    const elementIndex = todoList.findIndex((todo) => todo.ID === ID);
    const currentElem = todoList[elementIndex];
    currentElem.taskStatus = !currentElem.taskStatus;
    localStorage.setItem("todos", JSON.stringify(todoList));
    allFilter();
};

allFilterButtonElem.addEventListener('click', () => {
    allFilter();
});

completeFilterButtonElem.addEventListener("click", () => {
    const filterTodos = todoList.filter((elem) => elem.taskStatus === true);
    completeFilterButtonElem.style.backgroundColor = '#fff'
    completeFilterButtonElem.style.color = '#000'
    allFilterButtonElem.style.backgroundColor = '#1B1B1B'
    allFilterButtonElem.style.color = '#fff'
    activeFilterButtonElem.style.backgroundColor = '#1B1B1B'
    activeFilterButtonElem.style.color = '#fff'
    renderTodoList(filterTodos);
});

activeFilterButtonElem.addEventListener("click", () => {
    const filterTodos = todoList.filter((elem) => elem.taskStatus === false);
    activeFilterButtonElem.style.backgroundColor = '#fff'
    activeFilterButtonElem.style.color = '#000'
    allFilterButtonElem.style.backgroundColor = '#1B1B1B'
    allFilterButtonElem.style.color = '#fff'
    completeFilterButtonElem.style.backgroundColor = '#1B1B1B'
    completeFilterButtonElem.style.color = '#fff'
    renderTodoList(filterTodos);
});

addTodoButtonElem.addEventListener('click', () => {
    createTodoContainerElem.style.display = 'flex';
});

closeCreateTodoContainerElem.addEventListener('click', () => {
    createTodoContainerElem.style.display = 'none';
});

todoFormElem.addEventListener("submit", function (event) {
    event.preventDefault();

    if (submitBtnElem.innerText === EDIT_BTN_TEXT) {

        todoList[editTodoIndex].task = taskInputElem.value;
        todoList[editTodoIndex].date = dateInputElem.value;
        todoList[editTodoIndex].time = timeInputElem.value;
        localStorage.setItem("todos", JSON.stringify(todoList));
        renderTodoList(todoList);
        submitBtnElem.innerText = SUBMIT_BTN_TEXT;
        taskInputElem.value = "";
        createTodoContainerElem.style.display = 'none';

    } else {

        const todoItem = {
            task: taskInputElem.value,
            taskStatus: false,
            date: dateInputElem.value,
            time: timeInputElem.value,
            ID: Date.now()
        };

        todoList.push(todoItem);

        localStorage.setItem("todos", JSON.stringify(todoList));

        taskInputElem.value = "";
        dateInputElem.value = "";
        timeInputElem.value = "";

        renderTodoList(todoList);

        createTodoContainerElem.style.display = 'none';
    }
});




const searchFeature = (array) => {
    searchInput.addEventListener("input", () => {
        const searchInputValue = searchInput.value.toLowerCase();
        const filterTodos = array.filter((elem) => elem.todo.toLowerCase().includes(searchInputValue));
        renderTodoList(filterTodos);
    });
};

searchFeature(todoList);


allFilter();
