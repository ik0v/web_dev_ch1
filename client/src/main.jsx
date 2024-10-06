import React, {useEffect, useState} from 'react';
import {createRoot} from "react-dom/client";
import {NewTaskForm} from "./components/newTaskForm";

const root = createRoot(document.getElementById("root"));

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
    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
    await loadTasks();
  }

  async function changeStatus(id) {
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }
    })
    await loadTasks();
  }

  return <>
    <h1>The tasks we need to do:</h1>

    <ul>
      {tasks.map((task) => (
              <div key={task.id}>
                <label>
                  <input type={"checkbox"} checked={task.completed} onChange={() => changeStatus(task.id)}/>
                  {task.id}. {task.description}{task.completed && ' - done'}
                </label>
              </div>))}
    </ul>

    <NewTaskForm onNewTask={handleNewTask} />

    </>;
}

root.render(<TaskApplication />)