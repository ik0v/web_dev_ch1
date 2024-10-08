import express from 'express';

const app = express();
app.use(express.json());

const tasks = [
  {id: 1, description: "Follow the lecture", completed: true},
  {id: 2, description: "Read the exercise", completed: false},
  {id: 3, description: "Complete the exercise", completed: false},
];

app.get("/api/tasks", (req, res) => {
  res.send(tasks)
})

app.post("/api/tasks", (req, res) => {
  const { id, description, completed } = req.body;
  const task = { id, description, completed};
  task.id = tasks.length+1;
  task.completed = false;
  tasks.push(task);
  res.status(201).json(task);
  res.send();
})

app.put("/api/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return res.status(404).send({message: "Task not found"});
  }
  task.completed = !task.completed;
  res.status(200).send(task);
})

app.put("/api/tasks/:id/description", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return res.status(404).send({message: "Task not found"});
  }
  const { description } = req.body;
  task.description = description
  res.status(200).send(task);
})

app.use(express.static("../client/dist"));

app.listen(process.env.PORT || 3000);