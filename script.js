const todoListElem = document.getElementById("todo_list");
const todoFormElem = document.getElementById("todo_form");
const todoList = [];

const todoInputElem = document.getElementById("todo_input");
const todoTimeElem = document.getElementById("todo_time");
const todoDateElem = document.getElementById("todo_date");

const handleCheckbox = (ID) => {
    const elementIndex = todoList.findIndex((todo) => todo.ID === ID);
    const currentElem = todoList[elementIndex];
    currentElem.taskStatus = !currentElem.taskStatus;
    renderTodoList(todoList);
};

todoFormElem.addEventListener("submit", (e) => {
    e.preventDefault();

    todoList.push({ ID: Date.now(), todo: todoInputElem.value, taskStatus: false, date: todoDateElem.value, time: todoTimeElem.value });

    todoInputElem.value = "";
    todoDateElem.value = "";
    todoTimeElem.value = "";

    renderTodoList(todoList);
});

const renderTodoList = (array) => {
    todoListElem.innerHTML = "";

    array.forEach((task) => {
        const clutter = `
        <div class="todo_container">
            <div class="checkbox_container">
                <input class="checkbox" type="checkbox" ${task.taskStatus ? 'checked' : ''}>
            </div>
            <div class="todo_details">
                <div class="todo_name">
                    <h4>${task.todo}</h4>
                </div>
                <div class="todo_timedate">
                    <div class="todo_date">
                        <h6>Date: ${task.date}</h6>
                    </div>
                    <div class="todo_time">
                        <h6>Time: ${task.time}</h6>
                    </div>
                </div>
            </div>
            <div class="todo_edt_delete_btn">
                <div class="edit_btn">
                    <i class="ri-pencil-fill"></i>
                </div>
                <div class="delete_btn">
                    <i class="ri-close-circle-fill"></i>
                </div>
            </div>
        </div>`;

        todoListElem.innerHTML += clutter;

    });

    const checkboxElem = document.querySelectorAll(".checkbox");

    checkboxElem.forEach((checkbox, index) => {
        checkbox.addEventListener("change", () => {
            handleCheckbox(array[index].ID);
        });
        // console.log(todoList)
    });
};

renderTodoList(todoList);