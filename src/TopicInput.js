import React, { useState } from 'react';
import './TopicInput.css';

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
    <div >
      <div className="rectangleParent">
        <div className="newTopic">New Topic</div>

        <input 
          id="groupItem" 
          type="text"
          value={inputTopic}
          onChange={handleTopicChange}
          placeholder="Topic name..."
        />


      <button onClick={handleAddTopic} className="groupInner">+</button>
       
      </div>
      <input
        type="text"
        value={inputTopic}
        onChange={handleTopicChange}
        placeholder="Enter topic name..."
      />
      <button onClick={handleAddTopic} className="button-55">Add Topic</button>
    </div>
  );
}

export default TopicInput;
