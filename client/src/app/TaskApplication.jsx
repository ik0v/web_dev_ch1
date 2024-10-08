import React, {useEffect, useState} from 'react';
import {NewTaskForm} from "../components/newTaskForm";
import {Task} from "../components/Task";
import {Route, Routes} from "react-router-dom";
import {TaskDetails} from "../components/TaskDetails";

export function TaskApplication() {
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

  async function handleUpdateTask(id, newDescription) {
    const updatedDescription = { description: newDescription };
    await fetch(`/api/tasks/${id}/description`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDescription),
    })
    await loadTasks();
  }

  return <Routes>
    <Route path={"/"} element={
      <>
      <h1>The tasks we need to do:</h1>
      <ul>
        {tasks.map(({id, description, completed}) => (
          <Task key={id} id={id}
                description={description}
                completed={completed}
                onStatusChange={changeStatus}
                onUpdateTask={handleUpdateTask}
          />))}
      </ul>
      <NewTaskForm onNewTask={handleNewTask}/>
      </>}
    />
    <Route path={"/tasks/:id"} element={<TaskDetails tasks={tasks}/>}/>
    <Route path={"*"} element={<h2>Not found</h2>}/>
  </Routes>
}
