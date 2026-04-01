let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTasks(filter = "") {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        let text = tasks[i].text;

        if (filter.length >= 2 && !text.toLowerCase().includes(filter.toLowerCase())) {
            continue;
        }

        if (filter.length >= 2) {
            text = text.replace(
                new RegExp(filter, "gi"),
                match => `<span class="highlight">${match}</span>`
            );
        }

        const li = document.createElement("li");

        li.innerHTML = `
            <span onclick="editTask(${i})">${text}</span>
            <small>${tasks[i].date ? tasks[i].date : ""}</small>
            <button onclick="deleteTask(${i})">Usuń</button>
        `;

        list.appendChild(li);
    }
}

function addTask() {
    const text = document.getElementById("taskInput").value;
    const date = document.getElementById("taskDate").value;
    const error = document.getElementById("error");

    if (text.length < 3 || text.length > 255) {
        error.textContent = "Zadanie musi mieć 3-255 znaków";
        return;
    }

    if (date && new Date(date) <= new Date()) {
        error.textContent = "Data musi być przyszła";
        return;
    }

    tasks.push({ text, date });
    saveTasks();
    showTasks();

    document.getElementById("taskInput").value = "";
    document.getElementById("taskDate").value = "";
    error.textContent = "";
}

function deleteTask(i) {
    tasks.splice(i, 1);
    saveTasks();
    showTasks();
}

function editTask(i) {
    const newText = prompt("Edytuj zadanie:", tasks[i].text);

    if (newText && newText.length >= 3) {
        tasks[i].text = newText;
        saveTasks();
        showTasks();
    }
}

document.getElementById("search").addEventListener("input", function () {
    showTasks(this.value);
});

showTasks();

