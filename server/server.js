const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))


app.get('/', (req,res) => {
    res.status(200).sendFile(path.join(__dirname, '../build/index.html'))
})
app.get('/css', (req,res)=> {
    res.status(200).sendFile(path.join(__dirname, '../build/styles.css'))
})
app.get('/js', (req,res) =>{
    res.status(200).sendFile(path.join(__dirname, '../build/index.js'))
})

let tasks = [
    { id: 1, name: "Task 1", type: "daily" },
    { id: 2, name: "Task 2", type: "weekly" },
    { id: 3, name: "Task 3", type: "monthly" },
  ];

app.get("/tasks", (req, res) => {
    res.json(tasks);
  });

app.get("/tasks/:type", (req, res) => {
    const taskType = req.params.type;
    const filteredTasks = tasks.filter((t) => t.type === taskType);
    if (filteredTasks.length > 0) {
      res.json(filteredTasks);
    } else {
      res.status(404).send("Tasks not found");
    }
  });

app.get("/tasks/:type/:id", (req, res) => {
    const taskType = req.params.type;
    const taskId = parseInt(req.params.id);
    const task = tasks.find((t) => t.id === taskId && t.type === taskType);
    if (task) {
      res.json(task);
    } else {
      res.status(404).send("Task not found");
    }
  });

app.post("/tasks", (req, res) => {
    const newTaskName = req.body.name;
    const newTaskType = req.body.type;
    const newTaskId = tasks.length + 1;
    const newTask = { id: newTaskId, name: newTaskName, type: newTaskType };
    tasks.push(newTask);
    res.json({ id: newTaskId });
  });

app.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      res.json({ message: "Task deleted successfully" });
    } else {
      res.status(404).send("Task not found");
    }
  });

app.listen(4000, console.log(`App running on 4000`))
