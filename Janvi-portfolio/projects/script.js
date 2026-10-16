
const todoForm = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");

let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

function saveTasks() {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task) {
        const listItem = document.createElement("li");
        const taskName = document.createElement("span");
        const completeButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        taskName.textContent = task.text;

        completeButton.textContent = "✓";
        completeButton.setAttribute(
            "aria-label",
            "Mark task as complete"
        );

        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");
        deleteButton.setAttribute("aria-label", "Delete task");

        if (task.completed) {
            listItem.classList.add("completed");
        }

        completeButton.addEventListener("click", function () {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        deleteButton.addEventListener("click", function () {
            tasks = tasks.filter(function (item) {
                return item.id !== task.id;
            });

            saveTasks();
            renderTasks();
        });

        listItem.append(taskName, completeButton, deleteButton);
        taskList.appendChild(listItem);
    });

    updateTaskCount();
}

function updateTaskCount() {
    const remainingTasks = tasks.filter(function (task) {
        return !task.completed;
    }).length;

    taskCount.textContent =
        remainingTasks + " tasks remaining out of " + tasks.length;
}

todoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const newTask = {
        id: Date.now() + Math.random(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskInput.focus();
});

renderTasks();

