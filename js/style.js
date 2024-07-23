document.addEventListener("DOMContentLoaded", function () {
  // Code here will run when the HTML document is fully loaded
  var ctxBar = document.getElementById("bar-chart").getContext("2d");
  var barChart = new Chart(ctxBar, {
    type: "bar",
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Sales",
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(201, 203, 207, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            color: "#ecf0f1",
          },
        },
      },
    },
  });

  // Doughnut Chart
  var ctxDoughnut = document.getElementById("doughnut-chart").getContext("2d");
  var doughnutChart = new Chart(ctxDoughnut, {
    type: "doughnut",
    data: {
      labels: ["Search Engines", "Direct Click", "Bookmarks Click"],
      datasets: [
        {
          label: "Traffic Sources",
          data: [30, 30, 40],
          backgroundColor: [
            "rgba(54, 215, 232, 1)",
            "rgba(6, 185, 157, 1)",
            "rgba(254, 112, 150, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            color: "#ecf0f1",
          },
        },
      },
    },
  });
});

const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const mainContent = document.querySelector(".main-content");
const logo = document.getElementById("logo");

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
  mainContent.classList.toggle("expanded");

  if (sidebar.classList.contains("collapsed")) {
    logo.style.display = "none";
    sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
  } else {
    setTimeout(() => {
      logo.style.display = "block";
    }, 150);
    sidebarToggle.innerHTML = '<i class="fas fa-times"></i>'; // Change icon when expanded
  }
});

// Modal Functions
function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
};

// Active nav item
const navItems = document.querySelectorAll(".top-bar nav ul li a");

navItems.forEach((item) => {
  item.addEventListener("click", function () {
    navItems.forEach((i) => i.classList.remove("active"));
    this.classList.add("active");
  });
});
