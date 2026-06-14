const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if(taskText === "") {
        alert("Please enter a task");
        return;
    }

    const task = {
        text: taskText,
        completed: false
    };

    saveTask(task);
    displayTask(task);

    taskInput.value = "";
}

function displayTask(task) {

    const li = document.createElement("li");

    if(task.completed){
        li.classList.add("completed");
    }

    li.innerHTML = `
        <span>${task.text}</span>

        <div class="task-buttons">
            <button class="complete-btn">✓</button>
            <button class="delete-btn">✕</button>
        </div>
    `;

    li.querySelector(".complete-btn").addEventListener("click", () => {
        li.classList.toggle("completed");
        updateTask(task.text);
    });

    li.querySelector(".delete-btn").addEventListener("click", () => {
        li.remove();
        deleteTask(task.text);
    });

    taskList.appendChild(li);
}

function saveTask(task){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        displayTask(task);
    });
}

function deleteTask(taskText){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks = tasks.filter(task => task.text !== taskText);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTask(taskText){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks = tasks.map(task => {
        if(task.text === taskText){
            task.completed = !task.completed;
        }
        return task;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}