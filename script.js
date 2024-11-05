let taske = JSON.parse(localStorage.getItem("task")) || []; // التأكد من تهيئة taske إذا لم يكن موجودًا

function fillTask() {
    // مسح المحتوى السابق قبل البدء في الإضافة
    document.getElementById("tasks").innerHTML = "";

    // إعادة تعيين قيمة index إلى الصفر
    let index = 0;

    for (let tk of taske) {
        document.getElementById("tasks").innerHTML += `
            <div class="task2 ${tk.isDone ? 'done' : ''}">
                <div class="bod">
                    <h1>${tk.title}</h1>
                    <span class="date">${tk.date}</span>
                </div>
                <div class="btn0">
                    <button onclick="DeletTask(${index})" class="btn1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                    ${tk.isDone ? 
                        `<button onclick="completeTask(${index})" class="btn6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>` 
                    : 
                        `<button onclick="completeTask(${index})" class="btn2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                        </button>`}
                    <button onclick="editTask(${index})" class="btn3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                    </button>
                </div>
            </div>
        `;
        index++;
    }
}

fillTask();

document.getElementById("btn4").addEventListener("click", function () {
    let now = new Date();
    let date = now.toLocaleDateString();  // استخدام تنسيق التاريخ الكامل
    let TaskName = prompt("الرجاء ادخال عنوان المهمة");
    if (TaskName) { // التأكد من أن المستخدم أدخل اسمًا
        let taskObj = {
            "title": TaskName,
            "date": date,
            "isDone": false
        };
        taske.push(taskObj);
        storTask();
        fillTask();
    }
});

function DeletTask(index) {
    let x = confirm("هل انت متأكد من الحذف");
    if (x) {
        taske.splice(index, 1);
        storTask();
        fillTask();
    }
}

function editTask(index) {
    let task = taske[index];
    let newTaskName = prompt("ادخل المهمة المعدلة", task.title);
    if (newTaskName !== null) {
        task.title = newTaskName;
        storTask();
        fillTask();
    }
}

function completeTask(index) {
    taske[index].isDone = !taske[index].isDone;
    storTask();
    fillTask();
}

function storTask() {
    let TaskStreng = JSON.stringify(taske);
    localStorage.setItem("task", TaskStreng);
}
