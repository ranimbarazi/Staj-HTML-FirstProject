const today = new Date();

const months = [
"January","February","March","April","May","June",
"July","August","September","October","November","December"
];

document.getElementById("day").textContent = today.getDate();
document.getElementById("month").textContent = months[today.getMonth()];
document.getElementById("year").textContent = today.getFullYear();

const schedule = document.getElementById("schedule");

let notes = JSON.parse(localStorage.getItem("notes")) || {};

for(let hour = 8; hour <= 20; hour++){

    let row = document.createElement("div");
    row.className = "scheduleRow";

    let time = document.createElement("div");
    time.className = "time";
    time.textContent = (hour < 10 ? "0" : "") + hour + ":00";

    let input = document.createElement("input");
    input.className = "scheduleInput";
    input.placeholder = "Write here...";

    if(notes[hour]){
        input.value = notes[hour];
    }

    input.addEventListener("input",function(){

        notes[hour] = input.value;

        localStorage.setItem(
            "notes",
            JSON.stringify(notes)
        );

    });

    row.appendChild(time);
    row.appendChild(input);

    schedule.appendChild(row);

}
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");


addTaskBtn.addEventListener("click",addTask);

taskInput.addEventListener("keypress",function(e){

    if(e.key==="Enter"){
        addTask();
    }
});

function addTask(){

    if(taskInput.value.trim()===""){
        alert("Please enter a task.");
        return;
    }

    tasks.push({

        title:taskInput.value,
        done:false

    });

    taskInput.value="";

    saveTasks();

    displayTasks();
}

function displayTasks(){

    taskList.innerHTML="";

    tasks.forEach(function(task,index){

        let div=document.createElement("div");
        div.className="task";

        if(task.done){
            div.classList.add("done");
        }

        div.innerHTML=`

        <span>${task.title}</span>

        <div class="actions">

        <button class="completeBtn">✔</button>

        <button class="deleteBtn">🗑</button>

        </div>

        `;

        div.querySelector(".completeBtn").onclick=function(){

            tasks[index].done=!tasks[index].done;

            saveTasks();

            displayTasks();

        };

        div.querySelector(".deleteBtn").onclick=function(){

            tasks.splice(index,1);

            saveTasks();

            displayTasks();

        };

        taskList.appendChild(div);

    });
}

function saveTasks(){

    localStorage.setItem(

        "tasks",

        JSON.stringify(tasks)

    );

}
displayTasks();