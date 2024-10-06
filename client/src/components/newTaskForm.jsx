import React, {useState} from "react";

export function NewTaskForm({onNewTask}) {
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitting task", {description});
    onNewTask({description});
    setDescription("");
  }

  return <form onSubmit={handleSubmit}>
    <div>
      <label>
        Title: <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
      />
      </label>
    </div>
    <button>Submit new task</button>
  </form>;
}