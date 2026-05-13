import React, { useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Add or Update Note
  const handleAddNote = () => {
    if (!input.trim()) return;

    if (editIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = input;
      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      setNotes([...notes, input]);
    }

    setInput("");
  };

  // Delete Note
  const handleDelete = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  // Edit Note
  const handleEdit = (index) => {
    setInput(notes[index]);
    setEditIndex(index);
  };

  return (
    <div className="container">
      <h1>Notes App</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a note..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAddNote}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul className="notes-list">
        {notes.length === 0 && <p>No notes available</p>}

        {notes.map((note, index) => (
          <li key={index} className="note-item">
            <span>{note}</span>

            <div className="actions">
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;