// Date

const dateInput = document.getElementById("selectedDate");
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

const months = [
"January","February","March","April","May","June",
"July","August","September","October","November","December"
];

function updateDate(date){
day.textContent = date.getDate();
month.textContent = months[date.getMonth()];
year.textContent = date.getFullYear();
}

const today = new Date();
dateInput.value = today.toISOString().split("T")[0];
updateDate(today);

dateInput.addEventListener("change",function(){
updateDate(new Date(this.value));
});

// Hourly Schedule

const schedule = document.getElementById("schedule");

for(let hour=9;hour<=21;hour++){

const row=document.createElement("div");
row.className="row";

const time=document.createElement("div");
time.className="time";
time.textContent=(hour<10?"0":"")+hour+":00";

const line=document.createElement("input");
line.type="text";
line.className="line";
line.placeholder="Write here...";

row.appendChild(time);
row.appendChild(line);

schedule.appendChild(row);
// To Do List

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

function showTasks(){

taskList.innerHTML="";

tasks.forEach((task,index)=>{

const div=document.createElement("div");
div.className="task";

if(task.done){
div.classList.add("completed");
}

div.innerHTML=`
<span>${task.title}</span>
<div>
<button class="done">Done</button>
<button class="delete">Delete</button>
</div>
`;

div.querySelector(".done").onclick=function(){
tasks[index].done=!tasks[index].done;
saveTasks();
showTasks();
};

div.querySelector(".delete").onclick=function(){
tasks.splice(index,1);
saveTasks();
showTasks();
};

taskList.appendChild(div);

});

}

addTaskBtn.onclick=function(){

if(taskInput.value.trim()=="") return;

tasks.push({
title:taskInput.value,
done:false
});

taskInput.value="";
saveTasks();
showTasks();

};

showTasks();
// Today's Priorities

let priorities = JSON.parse(localStorage.getItem("priorities")) || [];

const priorityInput = document.getElementById("priorityInput");
const addPriorityBtn = document.getElementById("addPriorityBtn");
const priorityList = document.getElementById("priorityList");

function savePriorities(){
localStorage.setItem("priorities", JSON.stringify(priorities));
}

function showPriorities(){

priorityList.innerHTML = "";

priorities.forEach((item,index)=>{

const div = document.createElement("div");
div.className = "priorityItem";

div.innerHTML = `
<span>${item}</span>
<button class="delete">Delete</button>
`;

div.querySelector(".delete").onclick = function(){

priorities.splice(index,1);

savePriorities();

showPriorities();

};

priorityList.appendChild(div);

});

}

addPriorityBtn.onclick = function(){

if(priorityInput.value.trim()=="") return;

priorities.push(priorityInput.value);

priorityInput.value="";

savePriorities();

showPriorities();

};

showPriorities();
}