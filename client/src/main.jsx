import React, {useEffect, useState} from 'react';
import {createRoot} from "react-dom/client";

const root = createRoot(document.getElementById("root"));

function NewTaskForm({onNewTask}) {
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitting task", { title });
    onNewTask({title});
    setTitle("");
  }

  return <form onSubmit={handleSubmit}>
    <div>
      <label>
        Title: <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
      />
      </label>
    </div>
    <button>Submit new task</button>
  </form>;
}

function TaskApplication() {
  const [tasks, setTasks] = useState([]);

  async function loadTasks() {
    const res = await fetch("/api/tasks");
    if (res.ok) {
      setTasks(await res.json());
    } else {
      console.log("Smthing went wrong");
    }
  }

  useEffect(() => {
    loadTasks();
  }, [])

  async function handleNewTask(task) {
    setTasks((prevTasks) => [...prevTasks, task]);

    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })

  }

  return <>
    <h1>The tasks we need to do:</h1>

    <ul>
      {tasks.map((task) => (
              <div key={task.title}>
                <label>
                  <input type={"checkbox"} />
                  {task.title}
                </label>
              </div>))}
    </ul>

    <NewTaskForm onNewTask={handleNewTask} />

    </>;
}

root.render(<TaskApplication />)