var data = JSON.parse(localStorage.getItem("tasks")) || [];
var counter = data.length;
var taskInput = document.getElementById("taskInput");
var list = document.getElementById("taskList");
var tasksTotal = document.getElementById("tasksTotal");
// تحديث localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(data));
} 
function addTask() {
    var task = taskInput.value.trim();
    if (task !== "") {
        data[counter] = {
            id: counter,
            name: task,
            done: false
        };
        counter++;
        taskInput.value = "";
        saveTasks(); // حفظ بعد الإضافة
        taskData();
        totalTasks()
    }
}
function totalTasks() {
    tasksTotal.innerHTML = `Total: ${counter}`
    if (counter >= 5 && counter < 10) {
        tasksTotal.style.backgroundColor = "#e75a5a"
    }else if(counter >= 10) {
        tasksTotal.style.backgroundColor = "red"
    }else{
        tasksTotal.style.backgroundColor = "#10b981"
    }
}
function taskData() { 
    list.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        if (!data[i]) continue;
        const li = document.createElement("li");
        li.dataset.index = i;

        li.innerHTML = `
        <div class="task-cont ${data[i].done ? "done" : ""}">
            <span class="task-name ${data[i].done ? "done" : ""}">${data[i].name}</span>
            <div class="btns-task">
                <button class="btn1-task ${data[i].done ? "done" : ""}"><i class="fas fa-check"></i></button>
                <button class="btn2-task"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `;
        list.appendChild(li);
        // console.log(data); 
    }
}

// Event Delegation
list.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const li = btn.closest("li");
    const i = +li.dataset.index;

    if (btn.classList.contains("btn1-task")) {
        // نقلب الحالة في الداتا
        data[i].done = !data[i].done;
        saveTasks();
        taskData(); // يعيد الرسم ويطبق الكلاسات الجديدة
    }

    if (btn.classList.contains("btn2-task")) {
        data.splice(i, 1); // حذف فعلي
        counter -=1;
        saveTasks();
        taskData();
        totalTasks()
    }
});


document.getElementById('myForm').addEventListener('submit', function (e) {
    e.preventDefault();
});


// زرار الإضافة
document.querySelector(".button").onclick = () => {
    if (taskInput.value == "") {
        taskInput.focus()
    } else {
        addTask()
        totalTasks()
        over()
    }
}

// أول ما الصفحة تفتح
taskData();
totalTasks()