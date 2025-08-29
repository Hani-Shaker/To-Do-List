// var data = [];
// var counter = 0;
// var taskInput = document.getElementById("taskInput");
// var list = document.getElementById("taskList");


// function addTask() {
//     var task = taskInput.value;
//     if (task !== "" && task !== " ") {
//         data[counter] = {
//             id: counter,
//             name: task,
//             done: false
//         };
//         counter++;
//         taskInput.value = "";
//         taskData();
//     }
// }



// function taskData() {
//     list.innerHTML = "";
//     for (let i = 0; i < data.length; i++) {
//         if (!data[i]) continue;

//         const li = document.createElement("li");
//         li.dataset.index = i; // هنستخدمه نعرف رقم المهمة
//         li.innerHTML = `
//         <span class="task-name ${data[i].done ? "done" : ""}">${data[i].name}</span>
//         <div class="btns-task">
//           <button class="btn1-task"><i class="fas fa-check"></i></button>
//           <button class="btn2-task"><i class="fas fa-trash"></i></button>
//         </div>
//       `;
//         list.appendChild(li);
//     }
// }

// // تفويض أحداث على القائمة كلها
// list.addEventListener("click", (e) => {
//     const btn = e.target.closest("button");
//     if (!btn) return;

//     const li = btn.closest("li");
//     const i = +li.dataset.index;

//     if (btn.classList.contains("btn1-task")) {
//         if (btn) {
//             btn.style.backgroundColor = btn.style.backgroundColor === "green" ? "" : "green";
//             btn.style.color = btn.style.color === "green" ? "" : "#fff";
//         }
//         data[i].done = !data[i].done;
//         li.querySelector(".task-name").classList.toggle("done");
//     }

//     if (btn.classList.contains("btn2-task")) {
//         //   deleteTask(i);
//         data[i] = undefined; // BAD PRACTICE: Leaves holes in array
//         taskData();
//     }
// });



// document.getElementById('myForm').addEventListener('submit', function (e) {
//     e.preventDefault(); // يمنع إعادة التحميل
//     // حط لوجيكك هنا
// });

// document.querySelector(".button").onclick = () => {
//     // console.log("hello"); test
//     if (taskInput.value == "") {
//         taskInput.focus()
//     } else if (taskInput.value !== "") {
//         addTask()
//     }

// }



var data = JSON.parse(localStorage.getItem("tasks")) || [];
var counter = data.length; // عشان يكمل العد من آخر id
var taskInput = document.getElementById("taskInput");
var list = document.getElementById("taskList");

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
    }
}

function taskData() {
    list.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        if (!data[i]) continue;

        const li = document.createElement("li");
        li.dataset.index = i;

        // error here
        if (!data[i].done) {
            li.className = "test"
        }
        // اضفنا class "done" للزر لما data[i].done = true
        li.innerHTML = `
        <span class="task-name ${data[i].done ? "done" : ""}">${data[i].name}</span>
        <div class="btns-task">
          <button class="btn1-task ${data[i].done ? "done" : ""}"><i class="fas fa-check"></i></button>
          <button class="btn2-task"><i class="fas fa-trash"></i></button>
        </div>
      `;
        list.appendChild(li);

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
        saveTasks();
        taskData();
    }
});


// منع الريلود عند السبمت
document.getElementById('myForm').addEventListener('submit', function (e) {
    e.preventDefault();
});


// زرار الإضافة
document.querySelector(".button").onclick = () => {
    if (taskInput.value == "") {
        taskInput.focus()
    } else {
        addTask()
    }
}

// أول ما الصفحة تفتح
taskData();