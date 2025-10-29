const taskInput = document.getElementById("new-task");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, i) => {
        const li = document.createElement("li");
        li.textContent = task.text;
        if (task.done) li.classList.add("done");

        li.addEventListener("click", () => {
            tasks[i].done = !tasks[i].done;
            saveTasks();
        });

        const delBtn = document.createElement("button");
        delBtn.textContent = "✕";
        delBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            tasks.splice(i, 1);
            saveTasks();
        });

        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, done: false });
        taskInput.value = "";
        saveTasks();
    }
});

renderTasks();

// --- TIMER ---
let timer;
let seconds = 25 * 60;
const timeDisplay = document.getElementById("time");

function updateTimerDisplay() {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    timeDisplay.textContent = `${m.toString().padStart(2, "0")}:${s
        .toString()
        .padStart(2, "0")}`;
}

document.getElementById("start").addEventListener("click", () => {
    if (timer) return;
    timer = setInterval(() => {
        seconds--;
        updateTimerDisplay();
        if (seconds <= 0) {
            clearInterval(timer);
            timer = null;
            alert("Time to take a break!");
            seconds = 25 * 60;
            updateTimerDisplay();
        }
    }, 1000);
});

document.getElementById("reset").addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    seconds = 25 * 60;
    updateTimerDisplay();
});

updateTimerDisplay();


const noteArea = document.getElementById("note-area");
const saveNoteBtn = document.getElementById("save-note");

noteArea.value = localStorage.getItem("note") || "";

saveNoteBtn.addEventListener("click", () => {
    localStorage.setItem("note", noteArea.value);
    alert("Notes saved!");
});
