import {
  getListTask,
  addTask,
  deleteTask,
  getTaskById,
  updateTask,
} from "./../src/utils/TaskService.js";
import { checkNull, checkLoading } from "./utils/validate.js";
import Task from "../src/models/Task.js";
const getEle = (id) => document.getElementById(id);

const renderHTML = () => {
  const content = `
    <div class="card__header">
        <img src="./img/X2oObC4.png" />
      </div>
      <!-- <h2>hello!</h2> -->
      <div class="card__body">
        <div class="card__content">
          <div class="card__title">
            <h2>My Tasks</h2>
            <p>September 9,2020</p>
          </div>
          <div class="card__add">
            <input
              id="newTask"
              type="text"
              placeholder="Enter an activity..."
            />
            <button id="addItem" onClick="handleAddTask()">
              <i class="fa fa-plus"></i>
            </button>
          </div>
          <div id="notiInput" class="alert-danger" style="display: none"></div>
          <div class="card__todo">
            <!-- Uncompleted tasks -->
            <ul class="todo" id="todo"></ul>
            <!-- Completed tasks -->
            <ul class="todo" id="completed"></ul>
          </div>
        </div>
      </div>
    `;

  getEle("root").innerHTML = content;
};

function renderListTask() {
  getListTask()
    .then((result) => {
      let content = "";
      // console.log(result.data);

      result.data.forEach((Task) => {
        if(Task.taskStatus==="todo"){
        content += `
      <li id="${Task.id}" class=" alert alert-white d-flex">
          <p class="text-left my-1">${Task.taskName}</p>
          <span class="item${Task.id}">
            <button class="btn btn-light" onClick="deleteUserTask(${Task.id})"><i class="fa fa-trash-alt " ></i></button>
            <button class="btn btn-light" onClick="getTaskComplete(${Task.id})"><i class="fa fa-check-circle" ></i></button>

          </span>
         
      </li>
    `;
        }
      });
      getEle("todo").innerHTML = content;
    })
    .catch((err) => {
      console.log(err);
    });
}
const renderCompList = () => {
  getListTask()
    .then((list) => {
      let content = "";

      list.data.forEach((Task,index) => {
        if (Task.taskStatus === "completed") {
          content += `
      <li id="${Task.id}"  class=" alert alert-white d-flex">
      <p class="text-left my-1">${Task.taskName}</p>
      <span class="item${Task.id}">
        <button class="btn btn-light" onClick="deleteUserTask(${Task.id})"><i class="fa fa-trash-alt " ></i></button>
        <button class="btn btn-light" onClick="getTaskComplete(${Task.id})"><i class="fa fa-check-circle" ></i></button>
      </span>

      </li>
      `;
        }
      });
      getEle("completed").innerHTML = content;
    })
    .catch((err) => {
      console.log(err);
    });
};
renderHTML();
renderListTask();
renderCompList();
/**
 * add task
 */

window.handleAddTask = handleAddTask;
function handleAddTask() {
  const newTaskName = getEle("newTask").value;
  const task = new Task("", newTaskName, "todo");
  let flag = checkNull(newTaskName);
  if (flag) {
    getEle("notiInput").style.display = "none";
    addTask(task)
      .then(() => {
        alert("Add Success");
        renderListTask("todo");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    getEle("notiInput").style.display ="block";
    getEle("notiInput").innerHTML = "please input your task name";
  }
}
/**
 * delete Task
 */
window.deleteUserTask = deleteUserTask;
function deleteUserTask(id) {
  console.log(id);
  deleteTask(id)
    .then(() => {
      alert("Delete Success");
      renderListTask();
      renderCompList();
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateTaskById(task) {
  updateTask(task)
    .then(() => {
      // alert("update completed task");
    })
    .catch((err) => {
      console.log(err);
    });
}
/**
 * get task complete
 */

window.getTaskComplete = getTaskComplete;
function getTaskComplete(id) {
  console.log(id);
  checkLoading(id);
  getTaskById(id)
    .then((task) => {
      let newTask = new Task(
        task.data.id,
        task.data.taskName,
        task.data.taskStatus
      );
      
      if (newTask.taskStatus === "todo") {
        newTask.taskStatus = "completed";
        // if task status is completed render to complete html
        updateTaskById(newTask);
        console.log(newTask);
        order(newTask.taskStatus);
      } else {
        newTask.taskStatus = "todo";
        // if task status is completed render to complete html
        updateTaskById(newTask);
        console.log(newTask);
        order(newTask.taskStatus);
      }
      
    })
    .catch((err) => {
      console.log(err);
    });
    
}
function wait(){
  return new Promise (function(resolve,reject){
    setTimeout(function(){
      resolve(renderCompList());
    },1000);
  })
}
function waitComp(){
  return new Promise (function(resolve,reject){
    setTimeout(function(){
      resolve(renderListTask());
    },1000);
  })
}
async function order(status){
  if(status==="todo"){
    await wait();
    await waitComp();
  }else{
    await waitComp();
    await wait();
  }
}



