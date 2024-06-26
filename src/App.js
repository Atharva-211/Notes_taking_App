import React, { useState, useEffect } from 'react';
import TopicInput from './TopicInput';
import TopicDisplay from './TopicDisplay';

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
      <h1>Notes taking app</h1>
      <TopicInput onAddTopic={handleAddTopic} />
      <TopicDisplay
        topics={topics}
        setTopics={setTopics}
        onAddNote={handleAddNote}
        onDeleteNote={handleDeleteNote}
        onDeleteTopic={handleDeleteTopic}
      />
    </div>
  );
}

export default NoteTakingApp;
