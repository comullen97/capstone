const addTaskForm = document.querySelector("#add-task-form");
const newTaskInput = document.querySelector("#new-task");
const taskTypeSelect = document.querySelector("#task-type");
const dailyTasksList = document.querySelector("#daily-tasks");
const weeklyTasksList = document.querySelector("#weekly-tasks");
const monthlyTasksList = document.querySelector("#monthly-tasks");
const dailyLink = document.querySelector("#daily-link");
const weeklyLink = document.querySelector("#weekly-link");
const monthlyLink = document.querySelector("#monthly-link");
let motive = document.querySelector('img')


let tasks = [
  { id: 1, name: "Task 1", type: "daily" },
  { id: 2, name: "Task 2", type: "weekly" },
  { id: 3, name: "Task 3", type: "monthly" },
];

function displayTasks(type) {
  dailyTasksList.style.display = "none";
  weeklyTasksList.style.display = "none";
  monthlyTasksList.style.display = "none";
  if (type === "daily") {
    dailyTasksList.style.display = "block";
  } else if (type === "weekly") {
    weeklyTasksList.style.display = "block";
  } else if (type === "monthly") {
    monthlyTasksList.style.display = "block";
  }
}


addTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newTask = newTaskInput.value.trim();
  const taskType = taskTypeSelect.value;

  axios.post("http://localhost:4000/tasks", { name: newTask, type: taskType })
    .then((response) => {
      const taskId = response.data.id;
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = taskId;
      checkbox.name = newTask;
      const label = document.createElement("label");
      label.htmlFor = taskId;
      label.textContent = newTask;
      li.appendChild(checkbox);
      li.appendChild(label);
      if (taskType === "daily") {
        dailyTasksList.appendChild(li);
      } else if (taskType === "weekly") {
        weeklyTasksList.appendChild(li);
      } else if (taskType === "monthly") {
        monthlyTasksList.appendChild(li);
      }
      newTaskInput.value = "";
    })
    .catch((error) => {
      console.error(error);
    });
});

dailyTasksList.addEventListener("change", (event) => {
    if (event.target.checked) {
      const taskId = parseInt(event.target.id);
      axios.delete(`http://localhost:4000/tasks/${taskId}`)
        .then((response) => {
          event.target.parentNode.remove();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  weeklyTasksList.addEventListener("change", (event) => {
    if (event.target.checked) {
      const taskId = parseInt(event.target.id);
      axios.delete(`http://localhost:4000/tasks/${taskId}`)
      .then((response) => {
        event.target.parentNode.remove();
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

monthlyTasksList.addEventListener("change", (event) => {
  if (event.target.checked) {
    const taskId = parseInt(event.target.id);
    axios.delete(`http://localhost:4000/tasks/${taskId}`)
      .then((response) => {
        event.target
    })
    .catch((error) => {
      console.error(error);
    });
  }
});

motive.addEventListener('click', (evt) => {
    alert("Take a deep breathe. You are taking the steps to get back on track! Don't get overwhelmed, all these small steps have a big impact.")
})

  dailyLink.addEventListener("click", () => {
    displayTasks("daily");
  });

  weeklyLink.addEventListener("click", () => {
    displayTasks("weekly");
  });

  monthlyLink.addEventListener("click", () => {
    displayTasks("monthly");
  });

  displayTasks("daily");
