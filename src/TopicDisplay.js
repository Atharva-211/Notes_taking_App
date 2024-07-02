import React, { useState, useEffect } from 'react';
import styles from './TopicDisplay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
// import { ToastContainer, toast } from 'react-toastify';

function TopicDisplay({ topics, setTopics }) {
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
    if (topics.length > 0) {
      localStorage.setItem('topics', JSON.stringify(topics));
    } else {
      localStorage.removeItem('topics');
    }
  }, [topics]);

  const handleTopicClick = (index, event) => {
    event.stopPropagation();
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
    // if (noteTitle.trim() === '') {
    //   toast.error('Please enter a note title');
    //   return;
    // }

    if (noteTitle.trim() !== '' && noteContent.trim() !== '' && selectedTopicIndex !== null) {
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
      <div className="rectangleDiv">
        {/* <div className="rectangleDiv"></div> */}
        <div className="rectangleContainer">
          <div className="groupChild1">
          <div className="topics">{`Topics `}</div>
          </div>
        </div>
        <ul className="topicsList">
          {topics.map((topic, topicIndex) => (
            <li key={topicIndex} style={{ marginTop: '10px' }}>
              <div onClick={(event) => handleTopicClick(topicIndex, event)} className="topic1Parent">
                <div className="topic1">
                  {topic && topic.name.length > 11 ? `${topic.name.slice(0, 8)}..` : topic.name}
                </div>
                <div onClick={(event) => {
                  event.stopPropagation();
                  handleDeleteTopic(topicIndex);
                }} className="d">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </div>
                <div onClick={(event) => {
                  event.stopPropagation();
                  handleEditTopic(topicIndex);
                }} className="p">
                  <FontAwesomeIcon icon={faPen} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="notesSectionParent">
        <div className="notesSection">Notes section</div>
        {selectedTopicIndex !== null && topics[selectedTopicIndex] && (
          <>
            <div className="groupDiv"  onClick={openAddNoteModal}>
              <div className="name">{topics[selectedTopicIndex].name}</div> 
              <button id="addtopic">ADD NOTE</button>
            </div>

              <div className="groupParent">
                {topics[selectedTopicIndex].notes.map((note, noteIndex) => (
                  <div className="groupChild3" key={noteIndex} onClick={() => openEditNoteModal(noteIndex, note)}>
                    <div className="title">{note.title}</div>
                    <div className="notes">
                      {note.content.split('\n').slice(0, 1).join('')}
                      {note.content.split('\n').length > 2 && '... more'}
                    </div>
                    <div className="d2" onClick={(event) => { event.stopPropagation(); handleDeleteNote(selectedTopicIndex, noteIndex); }}>
                      D
                    </div>
                  </div>
                ))}
              </div>
          </>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCancelEditTopic}
        contentLabel="Edit Topic"
        ariaHideApp={false}
        className="custom-modal2"
      >
        <div>Edit Topic</div>
        <input
        id="Anote2"
          type="text"
          value={topicInput}
          onChange={handleTopicInputChange}
          placeholder="Enter new topic name..."
          maxLength="13"
        /> <br />
        <button id="addtopic2" onClick={handleSubmitEditTopic}>
          Save
        </button>
        <button id="addtopic3" onClick={handleCancelEditTopic}>
          Cancel
        </button>
      </Modal>

      <Modal
        isOpen={noteModalIsOpen}
        onRequestClose={() => setNoteModalIsOpen(false)}
        contentLabel={isEditingNote ? "Edit Note" : "Add Note"}
        ariaHideApp={false}
        className="custom-modal"
      >
        <div id='h2'>{isEditingNote ? "Edit Note" : "Add Note"}</div>  
        <input
         id="Anote"
          type="text"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          placeholder="Enter note title..."
        />  <br />
        <textarea 
          id='textarea'
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Enter your note..."
        /> <br />
        <div className='butt'>
        <button onClick={isEditingNote ? handleSaveEditedNote : handleAddNote} id='butt1'>
          {isEditingNote ? "Save" : "Add"}
        </button> <br /><br />
        <button onClick={() => setNoteModalIsOpen(false)} id='butt1'>Cancel</button>
        </div>
      </Modal>

      {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar /> */}
    </div>
  );
}

export default TopicDisplay;
