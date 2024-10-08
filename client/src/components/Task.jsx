import React, { useState } from "react";
import { EditTaskDialog } from "./EditTaskDialog";
import {Link} from "react-router-dom";

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
              <input type="checkbox" checked={completed} onChange={() => onStatusChange(id)}/>
              {id}. {description} {completed && ' - done'}
            </label>
            <a href={"#"} onClick={(e) => {
              e.preventDefault();
              handleOpenDialog();
            }}>[update]</a>
            <Link to={`/tasks/${id}`}>[details]</Link>
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
