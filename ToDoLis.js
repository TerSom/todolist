document.addEventListener('DOMContentLoaded', function () {
  const taskInput = document.getElementById('taskInput');
  const taskDeadline = document.getElementById('taskDeadline');
  const addTaskButton = document.getElementById('addTask');
  const taskList = document.getElementById('taskList');
  const completeTaskList = document.getElementById('completeTaskList');
  const deleteTaskList = document.getElementById('deleteTaskList');

  loadTasks();

  addTaskButton.addEventListener('click', function () {
    const task = taskInput.value;
    const deadline = taskDeadline.value;

    if (task && deadline) {
      addTask(task, deadline);
      taskInput.value = '';
      taskDeadline.value = '';
    }else{
      alert("kamu belum mengisi task")
    }
  });

  function addTask(task, deadline) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ task, deadline, completed: false, deleted: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }

  function renderTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.innerHTML = '';
    completeTaskList.innerHTML = '';
    deleteTaskList.innerHTML = '';

    tasks.forEach((taskObj, index) => {
      const { task, deadline, completed, deleted } = taskObj;

      if (!completed && !deleted) {
        taskList.innerHTML += `
          <tr>
            <td>${task}</td>
            <td>${deadline}</td>
            <td class="action-buttons">
              <button class="edit" onclick="editTask(${index})">Edit</button>
              <button class="complete" onclick="completeTask(${index})">Complete</button>
              <button class="delete" onclick="deleteTask(${index})">Delete</button>
            </td>
          </tr>
        `;
      } else if (completed) {
        completeTaskList.innerHTML += `
          <tr>
            <td>${task}</td>
            <td>${deadline}</td>
            <td>${new Date().toLocaleDateString()}</td>
          </tr>
        `;
      } else if (deleted) {
        deleteTaskList.innerHTML += `
          <tr>
            <td>${task}</td>
            <td>${deadline}</td>
            <td>${new Date().toLocaleDateString()}</td>
          </tr>
        `;
      }
    });
  }

  window.editTask = function (index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskObj = tasks[index];
    const newTask = prompt("Edit your task:", taskObj.task);
    const newDeadline = prompt("Edit your deadline:", taskObj.deadline);
    if (newTask !== null && newDeadline !== null) {
      tasks[index].task = newTask;
      tasks[index].deadline = newDeadline;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    }
  };

  window.completeTask = function (index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = true;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  };

  window.deleteTask = function (index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].deleted = true;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  };

  function loadTasks() {
    renderTasks();
  }
});
