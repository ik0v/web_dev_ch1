import express from 'express';

const app = express();

app.get("/api/tasks", (req, res) => {
  res.send([{
    title: "the one task",
  }])
})

app.listen(3000);