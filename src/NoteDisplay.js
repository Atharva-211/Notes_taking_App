import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './TopicDisplay.css';

function NoteDisplay({ selectedTopic, topics, onAddNote, onEditNote, onDeleteNote }) {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [editingNoteContent, setEditingNoteContent] = useState('');

  const handleAddNoteClick = () => {
    setIsAddingNote(true);
  };

  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      const topicIndex = topics.findIndex((topic) => topic.name === selectedTopic.name);
      onAddNote(topicIndex, newNote);
      setNewNote('');
      setIsAddingNote(false);
    }
  };

  const handleEditNote = () => {
    if (editingNoteContent.trim() !== '') {
      const topicIndex = topics.findIndex((topic) => topic.name === selectedTopic.name);
      onEditNote(topicIndex, editingNote, editingNoteContent);
      setEditingNote(null);
      setEditingNoteContent('');
    }
  };

  if (!selectedTopic) {
    return <div>Please select a topic to view and manage notes.</div>;
  }

  return (
    <div className="notes-section">
      <h2>Notes for {selectedTopic.name}</h2>
      {isAddingNote ? (
        <div>
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Enter your note..."
          />
          <button className="add-note" onClick={handleAddNote}>
            Add Note
          </button>
        </div>
      ) : (
        <button onClick={handleAddNoteClick}>Add Note</button>
      )}
      <Droppable droppableId={`notes-${selectedTopic.name}`} type="NOTE">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {selectedTopic.notes.map((note, noteIndex) => (
              <Draggable key={noteIndex} draggableId={`note-${noteIndex}`} index={noteIndex}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="note-container"
                  >
                    {editingNote === noteIndex ? (
                      <div>
                        <textarea
                          value={editingNoteContent}
                          onChange={(e) => setEditingNoteContent(e.target.value)}
                        />
                        <button onClick={handleEditNote}>Save</button>
                        <button onClick={() => setEditingNote(null)}>Cancel</button>
                      </div>
                    ) : (
                      <div>
                        <p style={{ whiteSpace: 'pre-wrap' }}>{note}</p>
                        <div className="edit-buttons">
                          <button onClick={() => setEditingNote(noteIndex)}>Edit</button>
                          <button onClick={() => onDeleteNote(selectedTopic.name, noteIndex)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default NoteDisplay;
