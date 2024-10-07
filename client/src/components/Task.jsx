import React, { useState } from "react";
import { EditTaskDialog } from "./EditTaskDialog";

export function Task({ id, description, completed, onStatusChange, onUpdateTask }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleOpenDialog() {
    setIsEditing(true); // Open the dialog
  }

  function handleCloseDialog() {
    setIsEditing(false); // Close the dialog
  }

  function handleUpdateTask(updatedDescription) {
    onUpdateTask(id, updatedDescription);
    handleCloseDialog(); // Close the dialog after updating
  }

  return (
    <div>
      <label>
        <input type="checkbox" checked={completed} onChange={() => onStatusChange(id)} />
        {id}. {description} {completed && ' - done'}
      </label>
      <button onClick={handleOpenDialog}>Edit</button> {}
      {isEditing && (
        <EditTaskDialog
          description={description}
          onUpdateTask={handleUpdateTask}
          onClose={handleCloseDialog}
        />
      )}
    </div>
  );
}
