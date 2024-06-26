import React, { useState, useEffect } from 'react';
import './TopicDisplay.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function TopicDisplay({ topics, setTopics, onDeleteNote, onDeleteTopic }) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [editedNoteIndex, setEditedNoteIndex] = useState(null);
  const [editedNoteContent, setEditedNoteContent] = useState('');
  const [expandedNotes, setExpandedNotes] = useState({});
  const [topicInput, setTopicInput] = useState('');
  const [isEditingTopic, setIsEditingTopic] = useState(false);

  useEffect(() => {
    // Load topics from local storage on component mount
    const storedTopics = JSON.parse(localStorage.getItem('topics'));
    if (storedTopics) {
      setTopics(storedTopics);
    }
  }, [setTopics]);

  useEffect(() => {
    // Save topics to local storage whenever topics change
    localStorage.setItem('topics', JSON.stringify(topics));
  }, [topics]);

  const handleTopicClick = (topic) => {
    setSelectedTopic((prevSelectedTopic) => (prevSelectedTopic === topic ? null : topic));
    setNewNote('');
    setEditedNoteIndex(null);
    setEditedNoteContent('');
  };

  const handleAddNoteClick = () => {
    setNewNote('');
    setEditedNoteIndex(null);
    setEditedNoteContent('');
  };

  const handleAddNote = () => {
    if (newNote.trim() !== '' && selectedTopic) {
      const updatedNotes = [newNote, ...selectedTopic.notes];
      const updatedTopics = topics.map((topic) =>
        topic === selectedTopic ? { ...topic, notes: updatedNotes } : topic
      );

      setTopics(updatedTopics);
      setSelectedTopic((prevSelectedTopic) => ({
        ...prevSelectedTopic,
        notes: updatedNotes,
      }));

      setNewNote('');
    }
  };

  const handleDeleteNote = (topicIndex, noteIndex) => {
    onDeleteNote(topicIndex, noteIndex);
    setExpandedNotes((prevExpandedNotes) => {
      const newExpandedNotes = { ...prevExpandedNotes };
      delete newExpandedNotes[noteIndex];
      return newExpandedNotes;
    });
  };

  const handleDeleteTopic = (topicIndex) => {
    onDeleteTopic(topicIndex);
    setSelectedTopic(null);
    setExpandedNotes({});
  };

  const handleEditNote = (noteIndex, noteContent) => {
    setEditedNoteIndex(noteIndex);
    setEditedNoteContent(noteContent);
  };

  const handleSaveEditedNote = () => {
    if (editedNoteContent.trim() !== '' && selectedTopic) {
      const updatedNotes = [...selectedTopic.notes];
      updatedNotes[editedNoteIndex] = editedNoteContent;

      const updatedTopics = topics.map((topic) =>
        topic === selectedTopic ? { ...topic, notes: updatedNotes } : topic
      );

      setTopics(updatedTopics);
      setSelectedTopic({ ...selectedTopic, notes: updatedNotes });
      setEditedNoteIndex(null);
      setEditedNoteContent('');
    }
  };

  const toggleNoteExpansion = (noteIndex) => {
    setExpandedNotes((prevExpandedNotes) => ({
      ...prevExpandedNotes,
      [noteIndex]: !prevExpandedNotes[noteIndex],
    }));
  };

  const handleTopicInputChange = (event) => {
    setTopicInput(event.target.value);
  };

  const handleEditTopic = () => {
    setIsEditingTopic(true);
    setTopicInput(selectedTopic.name);
  };

  const handleCancelEditTopic = () => {
    setIsEditingTopic(false);
    setTopicInput('');
  };

  const handleSubmitEditTopic = () => {
    if (topicInput.trim() !== '' && selectedTopic) {
      const updatedTopics = topics.map((topic) =>
        topic === selectedTopic ? { ...topic, name: topicInput } : topic
      );
      setTopics(updatedTopics);
      setIsEditingTopic(false);
      setTopicInput('');
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const updatedTopics = [...topics];
      const [removed] = updatedTopics.splice(source.index, 1);
      updatedTopics.splice(destination.index, 0, removed);

      setTopics(updatedTopics);
    }
  };

  return (
    <div>
      <h2>All Topics</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="topics">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {topics.map((topic, topicIndex) => (
                <Draggable key={topicIndex} draggableId={`topic-${topicIndex}`} index={topicIndex}>
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <button className="button-55" onClick={() => handleTopicClick(topic)}>
                        {topic.name}
                      </button>
                      <button className="button-55" onClick={() => handleDeleteTopic(topicIndex)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                      <button className="button-55" onClick={handleEditTopic}>
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <h2>Notes Section</h2>
      {selectedTopic && (
        <div className="topic-container">
          <h3>
            {isEditingTopic ? (
              <div>
                <input
                  type="text"
                  value={topicInput}
                  onChange={handleTopicInputChange}
                  placeholder="Enter new topic name..."
                />
                <button className="button-55" onClick={handleSubmitEditTopic}>
                  Save
                </button>
                <button className="button-55" onClick={handleCancelEditTopic}>
                  Cancel
                </button>
              </div>
            ) : (
              <>
                {selectedTopic.name}
                <button className="button-55" onClick={handleEditTopic}>
                  <FontAwesomeIcon icon={faPen} />
                </button>
              </>
            )}
          </h3>
          <div className="add-note-section">
            <button className="add-note" onClick={handleAddNoteClick}>
              Add Note
            </button>
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Enter your note..."
            />
            <button className="submit-note" onClick={handleAddNote}>
              Submit
            </button>
          </div>
          <div className="notes-list">
            {selectedTopic.notes.map((note, noteIndex) => (
              <div key={noteIndex} className="note-container">
                <p
                  className={`note-content ${
                    expandedNotes[noteIndex] ? 'expanded' : 'collapsed'
                  }`}
                  onClick={() => toggleNoteExpansion(noteIndex)}
                >
                  {expandedNotes[noteIndex] || note.split('\n').length <= 3
                    ? note
                    : `${note.split('\n').slice(0, 3).join('\n')} ....more`}
                </p>
                {editedNoteIndex === noteIndex ? (
                  <div>
                    <textarea
                      value={editedNoteContent}
                      onChange={(e) => setEditedNoteContent(e.target.value)}
                    />
                    <button onClick={handleSaveEditedNote}>Save</button>
                    <button onClick={() => setEditedNoteIndex(null)}>Cancel</button>
                  </div>
                ) : (
                  <div className="edit-buttons">
                    <button
                      onClick={() =>
                        handleDeleteNote(topics.indexOf(selectedTopic), noteIndex)
                      }
                    >
                      Delete Note
                    </button>
                    <button onClick={() => handleEditNote(noteIndex, note)}>Edit Note</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TopicDisplay;
