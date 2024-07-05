import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const RotatingModel = ({ url }) => {
  const { scene } = useGLTF(url);
  const modelRef = useRef();

  useFrame(({ clock }) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005; // Adjust rotation speed as needed
      modelRef.current.position.y = Math.sin(clock.elapsedTime) * 0.1; // Adjust floating range
    }
  });

  return <primitive object={scene} ref={modelRef} />;
};

export default RotatingModel;