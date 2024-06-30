import React, { useState, useEffect } from 'react';
import styles from'./TopicDisplay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';


function TopicDisplay({ topics, setTopics, onDeleteNote, onDeleteTopic }) {
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteModalIsOpen, setNoteModalIsOpen] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [editedNoteIndex, setEditedNoteIndex] = useState(null);
  const [topicInput, setTopicInput] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
    setNoteTitle('');
    setNoteContent('');
    setEditedNoteIndex(null);
  };

  const openAddNoteModal = () => {
    setIsEditingNote(false);
    setNoteTitle('');
    setNoteContent('');
    setNoteModalIsOpen(true);
  };

  const handleAddNote = () => {
    if (noteTitle.trim() === '') {
      toast.error('Please enter a note title');
      return;
    }

    if (noteContent.trim() !== '' && selectedTopicIndex !== null) {
      const updatedTopics = topics.map((topic, index) =>
        index === selectedTopicIndex
          ? { ...topic, notes: [{ title: noteTitle, content: noteContent }, ...topic.notes] }
          : topic
      );
      setTopics(updatedTopics);
      setNoteModalIsOpen(false);
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

  const openEditNoteModal = (noteIndex, note) => {
    setIsEditingNote(true);
    setEditedNoteIndex(noteIndex);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setNoteModalIsOpen(true);
  };

  const handleSaveEditedNote = () => {
    if (noteTitle.trim() !== '' && noteContent.trim() !== '' && selectedTopicIndex !== null) {
      const updatedTopics = topics.map((topic, index) =>
        index === selectedTopicIndex
          ? {
              ...topic,
              notes: topic.notes.map((note, idx) =>
                idx === editedNoteIndex ? { title: noteTitle, content: noteContent } : note
              ),
            }
          : topic
      );
      setTopics(updatedTopics);
      setEditedNoteIndex(null);
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
    <div className={styles.slide1691}>

<div className="rectangleGroup">
  <div className="rectangleDiv"></div>
  <div className="rectangleContainer">
    <div className="groupChild1"></div>
    <div className="topics">{`Topics `}</div>
  </div>
  <ul className="topicsList">
    {topics.map((topic, topicIndex) => (
      <li key={topicIndex} style={{ marginTop: '10px' }}>
        <div onClick={() => handleTopicClick(topicIndex)} className="topic1Parent">
          <div className="topic1"> {topic.name.length > 12 ? `${topic.name.slice(0, 12)}...` : topic.name}</div>
          <div onClick={() => handleDeleteTopic(topicIndex)} className="d">
            <FontAwesomeIcon icon={faTrashAlt} />
          </div>
          <div onClick={() => handleEditTopic(topicIndex)} className="p">
            <FontAwesomeIcon icon={faPen} />
          </div>
        </div>
      </li>
    ))}
  </ul>
</div>



      {/* <ul>
        {topics.map((topic, topicIndex) => (
          <li key={topicIndex}>
            <button onClick={() => handleTopicClick(topicIndex)}>
              {topic.name}
            </button>
            <button onClick={() => handleDeleteTopic(topicIndex)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            <button onClick={() => handleEditTopic(topicIndex)}>
              <FontAwesomeIcon icon={faPen} />
            </button>
          </li>
        ))}
      </ul> */}

      <h2>Notes Section</h2>
      {selectedTopicIndex !== null && (
        <div className="topic-container">
          <h3>{topics[selectedTopicIndex].name}</h3>
          <div className="add-note-section">
            <button className="add-note" onClick={openAddNoteModal}>
              Add Note
            </button>
          </div>
          <div className="notes-list">
            {topics[selectedTopicIndex].notes.map((note, noteIndex) => (
              <div key={noteIndex} className="note-container">
                <p className="note-title" onClick={() => openEditNoteModal(noteIndex, note)}>
                  {note.title}
                </p>
                <p className="note-content" onClick={() => openEditNoteModal(noteIndex, note)}>
                  {note.content.split('\n').slice(0, 1).join('')}
                  {note.content.split('\n').length > 2 && '... more'}
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
        contentLabel={isEditingNote ? "Edit Note" : "Add Note"}
        ariaHideApp={false}
      >
        <h2>{isEditingNote ? "Edit Note" : "Add Note"}</h2>
        <input
          type="text"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          placeholder="Enter note title..."
        />
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Enter your note..."
        />
        <button onClick={isEditingNote ? handleSaveEditedNote : handleAddNote}>
          {isEditingNote ? "Save" : "Add"}
        </button>
        <button onClick={() => setNoteModalIsOpen(false)}>Cancel</button>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default TopicDisplay;
