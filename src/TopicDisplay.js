import React, { useState } from 'react';
import './TopicDisplay.css'; // Import the CSS file

function TopicDisplay({ topics, onAddNote, onDeleteNote, onDeleteTopic }) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState('');

  const handleTopicClick = (topic) => {
    setSelectedTopic(selectedTopic === topic ? null : topic);
    setIsAddingNote(false); // Hide the note input box when clicking on a topic
  };

  const handleAddNoteClick = () => {
    setIsAddingNote(true);
  };

  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      onAddNote(selectedTopic, newNote);
      setNewNote('');
      setIsAddingNote(false);
    }
  };

  const handleDeleteNote = (topicIndex, noteIndex) => {
    onDeleteNote(topicIndex, noteIndex);
  };

  const handleDeleteTopic = (topicIndex) => {
    onDeleteTopic(topicIndex);
  };

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        {topics.map((topic, topicIndex) => (
          <li key={topicIndex}>
            <button class="button-55" onClick={() => handleTopicClick(topic)}>{topic.name} </button>
            <button class="button-55" onClick={() => handleDeleteTopic(topicIndex)}>Delete Topic</button>
            {selectedTopic === topic && (
              <div>

                {isAddingNote ? (
                  <div>
                    <textarea
                      type="text"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Enter your note..."
                    />
                    <button class="add-note" onClick={handleAddNote}>Add Note</button>
                  </div>
                ) : (
                  <button onClick={handleAddNoteClick}>Add Note</button>
                )}
                {topic.notes.map((note, noteIndex) => (
                  <div key={noteIndex} className="note-container">
                    <p>{note}</p>
                    <div className="edit-buttons">
                      <button onClick={() => handleDeleteNote(topicIndex, noteIndex)}>Delete Note</button>
                    </div>
                  </div>
                ))}

              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopicDisplay;
