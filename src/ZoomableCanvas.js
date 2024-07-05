import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

const ZoomableCanvas = ({ children }) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(1.0, 1.0, 1.5); // Adjust camera position
    camera.zoom = 1; // Reset zoom to default (optional)
    camera.updateProjectionMatrix();
  }, [camera]);

  return <>{children}</>;
};

export default ZoomableCanvas;