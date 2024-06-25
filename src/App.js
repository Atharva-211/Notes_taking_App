import React, { useState } from 'react';
import TopicInput from './TopicInput';
import TopicDisplay from './TopicDisplay';

function NoteTakingApp() {
  const [topics, setTopics] = useState([]);

  const handleAddTopic = (topicName) => {
    setTopics([...topics, { name: topicName, notes: [] }]);
  };

  const handleAddNote = (topic, newNote) => {
    const updatedTopics = topics.map((item) => {
      if (item === topic) {
        return { ...item, notes: [...item.notes, newNote] };
      }
      return item;
    });
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
    <div >
      <h1>Notes taking app</h1>
      <TopicInput onAddTopic={handleAddTopic} />
      <TopicDisplay
        topics={topics}
        onAddNote={handleAddNote}
        onDeleteNote={handleDeleteNote}
        onDeleteTopic={handleDeleteTopic} 
      />
    </div>
  );
}

export default NoteTakingApp;
