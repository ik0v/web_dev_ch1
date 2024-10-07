import React, { useEffect, useRef, useState } from "react";

export function EditTaskDialog({ description, onUpdateTask, onClose }) {
  const dialogRef = useRef();
  const [inputValue, setInputValue] = useState(description);

  useEffect(() => {
    dialogRef.current.addEventListener("close", onClose);
  }, []);

  useEffect(() => {
    setInputValue(description); // Update the input value when the description changes
    dialogRef.current.showModal(); // Show the dialog
  }, [description]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateTask(inputValue); // Call onUpdateTask with the new description
    dialogRef.current.close();
  }

  return (
    <dialog ref={dialogRef}>
      <form onSubmit={handleSubmit}>
        <h2>Updating {description}</h2>
        <div>
          <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
        </div>
        <button>Update</button>
      </form>
    </dialog>
  );
}