import React, { useState } from 'react';
import './TopicDisplay.css'; // Import the CSS file

function TopicInput({ onAddTopic }) {
  const [inputTopic, setInputTopic] = useState('');

  const handleTopicChange = (event) => {
    setInputTopic(event.target.value);
  };

  const handleAddTopic = () => {
    if (inputTopic.trim() !== '') {
      onAddTopic(inputTopic);
      setInputTopic('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputTopic}
        onChange={handleTopicChange}
        placeholder="Enter topic name..."
      />
      <button onClick={handleAddTopic} class="button-55">Add Topic</button>
    </div>
  );
}

export default TopicInput;
