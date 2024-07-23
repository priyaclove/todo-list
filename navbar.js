document.addEventListener("DOMContentLoaded", (event) => {
  // Get the modal
  const modal = document.getElementById("taskModal");

  // Get the link that opens the modal
  const addTaskLink = document.getElementById("addTaskLink");

  // Get the <span> element that closes the modal
  const span = document.getElementById("close_task");

  // Get the button that adds the task
  const addTaskButton = document.getElementById("addTaskButton");

  // When the user clicks the link, open the modal
  addTaskLink.onclick = function (event) {
    event.preventDefault();
    openModal();
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function (event) {
    closeModal();
  };

  // When the user clicks the button, add the task
  addTaskButton.onclick = function (event) {
    addTask();
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target === modal) {
      closeModal();
    }
  };

  // Function to open the modal
  function openModal() {
    modal.style.display = "block";
  }

  // Function to close the modal
  function closeModal() {
    modal.style.display = "none";
    document.getElementById("taskForm").reset();
  }

  function SelectOptions() {
    const projectSelect = document.getElementById("projectSelect");
    const selectedValue = projectSelect.value;
    projectSelect.innerHTML =
      '<option value="" disabled selected>PROJECT..</option>';
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.forEach((project) => {
      const option = document.createElement("option");
      option.value = project.projectname;
      option.textContent = `${project.projectname}`;
      projectSelect.appendChild(option);
    });
    if (selectedValue) {
      projectSelect.value = selectedValue;
    }
  }

  // // Function to add a new task
  function addTask() {
    const taskName = document.getElementById("taskName").value;
    const projectSelect = document.getElementById("projectSelect").value;
    const taskDate = document.getElementById("taskDate").value;
    const taskTime = document.getElementById("taskTime").value;
    var newStatus = "in-progress";

    const task = {
      name: taskName,
      date: taskDate,
      time: taskTime,
      projectSelect: projectSelect,
      status: "progress",
    };
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({
      name: taskName,
      date: taskDate,
      time: taskTime,
      projectSelect: projectSelect,
      status: newStatus,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    addTaskToList(task);
    closeModal(); // Close modal after adding task
  }
  // Function to add task to the list
  function addTaskToList(task) {
    const taskList = document.getElementById("tasks-container");
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.id = "task" + document.querySelectorAll(".task").length;
    taskDiv.draggable = true;
    taskDiv.setAttribute("ondragstart", "drag(event)");
    taskDiv.textContent = `Name :${task.name}, Project: ${task.projectSelect}, Date: ${task.date}, Time: ${task.time}`;
    taskList.appendChild(taskDiv);
  }

  function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      addTaskToList(task);
      const taskElement = document.getElementById(
        "task" + (document.querySelectorAll(".task").length - 1)
      );
      const container = document.querySelector(
        `[data-status="${task.status}"]`
      );
      if (container) {
        container.appendChild(taskElement);
      }
    });
  }

  window.onload = function () {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => addTaskToList(task));
    SelectOptions();
    loadTasks();
  };
});
