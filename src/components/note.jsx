import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";

function Note(props) {
  // Delete handler
  function handleClick() {
    props.onDelete(props.id);
  }

  // Edit handler: Open prompt and send updated values
  function handleEdit() {
    const newTitle = prompt("Edit title:", props.title);
    const newContent = prompt("Edit content:", props.content);

    // Only update if the user provides valid input
    if (newTitle !== null && newContent !== null && newTitle !== "" && newContent !== "") {
      const updatedNote = { title: newTitle, content: newContent };
      props.onEdit(props.id, updatedNote);
    }
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
      <button onClick={handleEdit}>
        <EditIcon />
      </button>
    </div>
  );
}

export default Note;
