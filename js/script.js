var data = [];
var counter = 0;
var taskInput = document.getElementById("taskInput");
var list = document.getElementById("taskList");


function addTask() {
    var task = taskInput.value;
    if (task !== "" && task !== " ") {
        data[counter] = {
            id: counter,
            name: task,
            done: false
        };
        counter++;
        taskInput.value = "";
        taskData();
    }
}

// function taskData() {
//     list.innerHTML = "";
//     for (let i = 0; i < data.length; i++) {
//         if (typeof data[i] !== "undefined") {
//             var li = document.createElement("li");
//             li.innerHTML = `<span class='task-name' >${data[i].name}</span>` +
//                 "<div class='btns-task'>" +
//                 "<button class='btn1-task' onclick=' toggle(" + i + ")'> <i class='fas fa-check'></i> </button>" +
//                 "<button class='btn2-task' onclick='deleteTask(" + i + ")'><i class='fas fa-trash'></i></button>" +
//                 "</div>"; 

//             if (data[i].done === true) {
//                 li.firstChild.style.textDecoration = "line-through";
//                 li.firstChild.style.textDecorationColor = "red";
//                 li.firstChild.style.textDecorationThickness = "2px";

//             }
//             list.appendChild(li);
//         }
//     }
// }

function taskData() {
    list.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        if (!data[i]) continue;

        const li = document.createElement("li");
        li.dataset.index = i; // هنستخدمه نعرف رقم المهمة
        li.innerHTML = `
        <span class="task-name ${data[i].done ? "done" : ""}">${data[i].name}</span>
        <div class="btns-task">
          <button class="btn1-task"><i class="fas fa-check"></i></button>
          <button class="btn2-task"><i class="fas fa-trash"></i></button>
        </div>
      `;
        list.appendChild(li);
    }
}

// تفويض أحداث على القائمة كلها
list.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const li = btn.closest("li");
    const i = +li.dataset.index;

    if (btn.classList.contains("btn1-task")) {
        if (btn) {
            btn.style.backgroundColor = btn.style.backgroundColor === "green" ? "" : "green";
            btn.style.color = btn.style.color === "green" ? "" : "#fff";
        }
        data[i].done = !data[i].done;
        li.querySelector(".task-name").classList.toggle("done");
    }

    if (btn.classList.contains("btn2-task")) {
        //   deleteTask(i);
        data[i] = undefined; // BAD PRACTICE: Leaves holes in array
        taskData();
    }
});



document.getElementById('myForm').addEventListener('submit', function (e) {
    e.preventDefault(); // يمنع إعادة التحميل
    // حط لوجيكك هنا
});

document.querySelector(".button").onclick = () => {
    // console.log("hello"); test
    if (taskInput.value == "") {
        taskInput.focus()
    } else if (taskInput.value !== "") {
        addTask()
    }

}