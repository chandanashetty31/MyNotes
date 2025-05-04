import React, { useEffect, useState } from 'react';
import CreateArea from './CreateArea';
import Footer from './footer';
import Header from './header';
import Note from './note';

function App() {
  const [notes, setNotes] = useState([]);

  // Fetch notes from the backend
  useEffect(() => {
    fetch('http://localhost:5000/notes')
      .then(response => response.json())
      .then(data => setNotes(data));
  }, []);

  // Add a new note
  function addNote(newNote) {
    fetch('http://localhost:5000/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    })
      .then(response => response.json())
      .then(data => {
        setNotes(prevNotes => [...prevNotes, data]);  // Add the new note
      });
  }

  // Delete a note
  function deleteNote(id) {
    fetch(`http://localhost:5000/notes/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));  // Remove the deleted note
    });
  }

  // Edit a note
  function editNote(id, updatedNote) {
    fetch(`http://localhost:5000/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedNote),
    })
      .then((response) => response.json())
      .then((updatedNoteData) => {
        setNotes((prevNotes) =>
          prevNotes.map((note) => (note.id === id ? updatedNoteData : note))
        );
      })
      .catch((err) => console.error('Error updating note:', err));
  }
  

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => (
        <Note
          key={noteItem.id}
          id={noteItem.id}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
          onEdit={editNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
