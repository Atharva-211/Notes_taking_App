import React, { useState, useEffect } from 'react';
import './TopicDisplay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

function TopicDisplay({ topics, setTopics, onDeleteNote, onDeleteTopic }) {
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [editedNoteIndex, setEditedNoteIndex] = useState(null);
  const [editedNoteContent, setEditedNoteContent] = useState('');
  const [topicInput, setTopicInput] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteModalIsOpen, setNoteModalIsOpen] = useState(false);

  useEffect(() => {
    const storedTopics = JSON.parse(localStorage.getItem('topics'));
    if (storedTopics) {
      setTopics(storedTopics);
    }
  }, [setTopics]);

  useEffect(() => {
    localStorage.setItem('topics', JSON.stringify(topics));
  }, [topics]);

  const handleTopicClick = (index) => {
    setSelectedTopicIndex((prevIndex) => (prevIndex === index ? null : index));
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
    if (newNote.trim() !== '' && selectedTopicIndex !== null) {
      const updatedTopics = topics.map((topic, index) =>
        index === selectedTopicIndex
          ? { ...topic, notes: [newNote, ...topic.notes] }
          : topic
      );
      setTopics(updatedTopics);
      setNewNote('');
    }
  };

  const handleDeleteNote = (topicIndex, noteIndex) => {
    const updatedTopics = topics.map((topic, index) => {
      if (index === topicIndex) {
        const updatedNotes = topic.notes.filter((_, idx) => idx !== noteIndex);
        return { ...topic, notes: updatedNotes };
      }
      return topic;
    });
    setTopics(updatedTopics);
  };

  const handleDeleteTopic = (topicIndex) => {
    const updatedTopics = topics.filter((_, index) => index !== topicIndex);
    setTopics(updatedTopics);
    setSelectedTopicIndex(null);
  };

  const handleEditNote = (noteIndex, noteContent) => {
    setEditedNoteIndex(noteIndex);
    setEditedNoteContent(noteContent);
    setNoteModalIsOpen(true);
  };

  const handleSaveEditedNote = () => {
    if (editedNoteContent.trim() !== '' && selectedTopicIndex !== null) {
      const updatedTopics = topics.map((topic, index) =>
        index === selectedTopicIndex
          ? {
              ...topic,
              notes: topic.notes.map((note, idx) =>
                idx === editedNoteIndex ? editedNoteContent : note
              ),
            }
          : topic
      );
      setTopics(updatedTopics);
      setEditedNoteIndex(null);
      setEditedNoteContent('');
      setNoteModalIsOpen(false);
    }
  };

  const handleTopicInputChange = (event) => {
    setTopicInput(event.target.value);
  };

  const handleEditTopic = (index) => {
    setSelectedTopicIndex(index);
    setTopicInput(topics[index].name);
    setModalIsOpen(true);
  };

  const handleCancelEditTopic = () => {
    setTopicInput('');
    setModalIsOpen(false);
  };

  const handleSubmitEditTopic = () => {
    if (topicInput.trim() !== '' && selectedTopicIndex !== null) {
      const updatedTopics = topics.map((topic, index) =>
        index === selectedTopicIndex ? { ...topic, name: topicInput } : topic
      );
      setTopics(updatedTopics);
      setTopicInput('');
      setModalIsOpen(false);
    }
  };

  return (
    <div>
      <h2>All Topics</h2>
      <ul>
        {topics.map((topic, topicIndex) => (
          <li key={topicIndex}>
            <button className="button-55" onClick={() => handleTopicClick(topicIndex)}>
              {topic.name}
            </button>
            <button className="button-55" onClick={() => handleDeleteTopic(topicIndex)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            <button className="button-55" onClick={() => handleEditTopic(topicIndex)}>
              <FontAwesomeIcon icon={faPen} />
            </button>
          </li>
        ))}
      </ul>

      <h2>Notes Section</h2>
      {selectedTopicIndex !== null && (
        <div className="topic-container">
          <h3>{topics[selectedTopicIndex].name}</h3>
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
            {topics[selectedTopicIndex].notes.map((note, noteIndex) => (
              <div key={noteIndex} className="note-container">
                <p className="note-content" onClick={() => handleEditNote(noteIndex, note)}>
                  {note.split('\n').slice(0, 3).join('\n')}
                  {note.split('\n').length > 3 && '... more'}
                </p>
                <div className="edit-buttons">
                  <button onClick={() => handleDeleteNote(selectedTopicIndex, noteIndex)}>
                    Delete Note
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCancelEditTopic}
        contentLabel="Edit Topic"
        ariaHideApp={false}
      >
        <h2>Edit Topic</h2>
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
      </Modal>

      <Modal
        isOpen={noteModalIsOpen}
        onRequestClose={() => setNoteModalIsOpen(false)}
        contentLabel="Edit Note"
        ariaHideApp={false}
      >
        <h2>Edit Note</h2>
        <textarea
          value={editedNoteContent}
          onChange={(e) => setEditedNoteContent(e.target.value)}
        />
        <button onClick={handleSaveEditedNote}>Save</button>
        <button onClick={() => setNoteModalIsOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
}

export default TopicDisplay;
