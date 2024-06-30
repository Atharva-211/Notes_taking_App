import React, { useState, useEffect } from 'react';
import TopicInput from './TopicInput';
import TopicDisplay from './TopicDisplay';
import './index.css';

function NoteTakingApp() {
  // Initialize topics state with data from localStorage or empty array
  const [topics, setTopics] = useState(() => {
    const storedTopics = localStorage.getItem('topics');
    return storedTopics ? JSON.parse(storedTopics) : [];
  });

  // Update localStorage whenever topics state changes
  useEffect(() => {
    localStorage.setItem('topics', JSON.stringify(topics));
  }, [topics]);

  const handleAddTopic = (topicName) => {
    const newTopic = { name: topicName, notes: [] };
    setTopics([...topics, newTopic]);
  };

  const handleAddNote = (topic, newNote) => {
    const updatedTopics = topics.map((item) =>
      item === topic ? { ...item, notes: [newNote, ...item.notes] } : item
    );
    setTopics(updatedTopics);
  };

  const handleDeleteNote = (topicIndex, noteIndex) => {
    const updatedTopics = [...topics];
    updatedTopics[topicIndex].notes.splice(noteIndex, 1);
    setTopics(updatedTopics);
  };

  const handleDeleteTopic = (topicIndex) => {
    const updatedTopics = [...topics];
    updatedTopics.splice(topicIndex, 1);
    setTopics(updatedTopics);
  };

  return (
    <div>
      
      <div className="notesTakingApp">Notes taking app</div>
      <TopicInput onAddTopic={handleAddTopic} />
      <TopicDisplay
        topics={topics}
        setTopics={setTopics}
        onAddNote={handleAddNote}
        onDeleteNote={handleDeleteNote}
        onDeleteTopic={handleDeleteTopic}
      />
      <img className="slide1691Item" alt="" src={`${process.env.PUBLIC_URL}/group-1.svg`} />
    </div>
  );
}

export default NoteTakingApp;
