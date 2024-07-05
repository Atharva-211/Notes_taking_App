import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import TopicInput from './TopicInput';
import TopicDisplay from './TopicDisplay';
import RotatingModel from './RotatingModel';
import ZoomableCanvas from './ZoomableCanvas';
import './index.css';

const NoteTakingApp = () => {
  const [topics, setTopics] = useState(() => {
    const storedTopics = localStorage.getItem('topics');
    return storedTopics ? JSON.parse(storedTopics) : [];
  });

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

      <TopicDisplay
        topics={topics}
        setTopics={setTopics}
        onAddNote={handleAddNote}
        onDeleteNote={handleDeleteNote}
        onDeleteTopic={handleDeleteTopic}
      />
      <TopicInput onAddTopic={handleAddTopic} />

      <img
        className="slide1691Item"
        alt=""
        src={`${process.env.PUBLIC_URL}/group-1.svg`}
        style={{ pointerEvents: 'none' }}
      />

      <div className="canvas-container">
        <Canvas>
          <ambientLight intensity={1.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={0} />
          <ZoomableCanvas>
            <RotatingModel url={`${process.env.PUBLIC_URL}/japanese_study_desk.glb`} />
          </ZoomableCanvas>
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true} // Allow only rotation
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Canvas>
      </div>


    </div>
  );
};

export default NoteTakingApp;
