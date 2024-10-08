import React from "react";
import {Link, useParams} from "react-router-dom";

export function TaskDetails({tasks}) {
  const {id} = useParams();
  const task = tasks.find(t => t.id == id);

  if (!task) {
    return (<div>
        <h2>Task not found</h2>
        <Link to={"/"}>Go back to all tasks</Link>
      </div>);
  }

  return <div>
    <h2>Details for task {id}</h2>
    <div>
      <strong>Description </strong>
      <span>{task.description}</span>
    </div>
    <div>
      <strong>Completed? </strong>
      <span>{task.completed ? "true" : "false"}</span>
    </div>
    <div>
      <Link to={"/"}>Show all tasks</Link>
    </div>

  </div>;
}