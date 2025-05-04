import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import React, { useEffect, useState } from "react";

function CreateArea({ onAdd, onUpdate, editMode = false, noteToEdit = {} }) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  useEffect(() => {
    if (editMode && noteToEdit) {
      setExpanded(true);
      setNote({
        title: noteToEdit.title,
        content: noteToEdit.content
      });
    }
  }, [editMode, noteToEdit]);

  function handleChange(event) {
    const { name, value } = event.target;
    setNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (editMode) {
      onUpdate(noteToEdit.id, note);
    } else {
      onAdd(note);
    }
    setNote({ title: "", content: "" });
    setExpanded(false);
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={handleSubmit}>
            {editMode ? <EditIcon /> : <AddIcon />}
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
