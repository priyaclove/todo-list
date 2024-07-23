// Function to add a user to the user list
function addUserToList(user) {
  const userList = document.getElementById("userList");
  const li = document.createElement("li");
  li.innerHTML = `<a href="#user"><i class="fas fa-user"></i> <span>${user.name}</span></a>`;
  userList.appendChild(li);
}

// Function to add a project to the project list
function addProjectToList(project) {
  const projectList = document.getElementById("projectList");
  const li = document.createElement("li");
  li.innerHTML = `<a href="#projects"><i class="fas fa-tasks"></i> <span>${project.projectname}</span></a>`;
  projectList.appendChild(li);
}

// Function to update the select options with users
function updateSelectOptions() {
  const userSelect = document.getElementById("userSelect");
  const selectedValue = userSelect.value;
  userSelect.innerHTML = '<option value="" disabled selected>USER</option>';
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user.name;
    option.textContent = user.name;
    userSelect.appendChild(option);
  });
  if (selectedValue) {
    userSelect.value = selectedValue;
  }
}

// Load users and projects from local storage
function loadUsersAndProjects() {
  // Load and display users
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const userList = document.getElementById("userList");
  userList.innerHTML = "";
  users.forEach((user) => addUserToList(user));

  // Load and display projects
  let projects = JSON.parse(localStorage.getItem("projects")) || [];
  const projectList = document.getElementById("projectList");
  projectList.innerHTML = ""; // Clear existing list
  projects.forEach((project) => addProjectToList(project));

  // Update user select options
  updateSelectOptions();
}

// Call loadUsersAndProjects when the page loads
window.addEventListener("DOMContentLoaded", loadUsersAndProjects);

// User form submission handler
document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const userName = document.getElementById("userName").value;
    const userEmail = document.getElementById("userEmail").value;
    const workAs = document.getElementById("workAs").value;
    const user = { name: userName, email: userEmail, workAs: workAs };
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    addUserToList(user);
    closeModal("userModal");
    document.getElementById("userForm").reset();
    updateSelectOptions();
  });

// Project form submission handler
document
  .getElementById("projectForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const projectname = document.getElementById("projectname").value;
    const projectdesc = document.getElementById("projectdesc").value;
    const projectuser = document.getElementById("userSelect").value;
    const project = {
      projectname: projectname,
      projectdesc: projectdesc,
      projectuser: projectuser,
    };
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.push(project);
    localStorage.setItem("projects", JSON.stringify(projects));
    addProjectToList(project);
    closeModal("projectModal");
    document.getElementById("projectForm").reset();
  });

// ------------------------------------------------------------------------------------------------------

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var draggedElement = document.getElementById(data);
  var dropzone = ev.target.closest(".stat-card");

  if (dropzone && draggedElement) {
    dropzone.appendChild(draggedElement);
    updateTaskStatus(draggedElement, dropzone.getAttribute("data-status"));
  }
}

function updateTaskStatus(taskElement, newStatus) {
  console.log(newStatus);
  taskElement.setAttribute("data-status", newStatus);

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let taskName = taskElement.textContent.split(",")[0].split(":")[1].trim();

  let taskIndex = tasks.findIndex((task) => task.name === taskName);
  if (taskIndex !== -1) {
    tasks[taskIndex].status = newStatus;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

// -------------------------------------------------------------------------------------------------------------

function showContainer(containerNumber) {
  var containers = document.querySelectorAll(".stat-card");
  var containers = document.querySelectorAll(".stat-card");

  containers.forEach(function (container) {
    container.style.display = "none";
  });

  var selectedContainer;

  switch (containerNumber) {
    case 1:
      selectedContainer = document.getElementById("tasks-container");
      break;
    case 2:
      selectedContainer = document.getElementById("review");
      break;
    case 3:
      selectedContainer = document.getElementById("complete");
      break;
    case 4:
      selectedContainer = document.getElementById("pushlive");
      break;
    default:
      selectedContainer = document.getElementById("tasks-container");
  }
  if (selectedContainer) {
    selectedContainer.style.display = "block";
  }
}

function showAllContainers() {
  // show all the containers
  var containers = document.querySelectorAll(".stat-card");
  containers.forEach(function (container) {
    container.style.display = "block";
  });
}
