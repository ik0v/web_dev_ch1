import React, {useEffect, useState} from 'react';
import {createRoot} from "react-dom/client";
import {NewTaskForm} from "./components/newTaskForm";
import {Task} from "./components/Task";
import {EditTaskDialog} from "./components/EditTaskDialog";

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

  function handleUpdateTask(id, updatedDescription) {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, description: updatedDescription } : task
      )
    );
  }


  return <>
    <h1>The tasks we need to do:</h1>

    <ul>
      {tasks.map(({id, description, completed}) => (
        <Task key={id} id={id} description={description} completed={completed} onStatusChange={changeStatus} onUpdateTask={handleUpdateTask} />
      ))}
    </ul>

    <NewTaskForm onNewTask={handleNewTask}/>

  </>;
}

root.render(<TaskApplication/>)