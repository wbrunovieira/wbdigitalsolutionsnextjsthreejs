import React, { useEffect, useState } from 'react';
import { Html, useProgress } from '@react-three/drei';
import Loader from '../../Loader';

/** Canvas suspense fallback: the normal loader, with a text fallback if it stalls. */
const CustomLoader: React.FC = () => {
  const { progress, errors } = useProgress();
  const [showFallback, setShowFallback] = useState(false);
  useEffect(() => {
    if (progress === 75) {
      const timer = setTimeout(() => setShowFallback(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [progress]);
  if (showFallback || errors.length > 0) {
    return (
      <Html center>
        <div style={{ color: 'white', textAlign: 'center' }}>
          <p>Loading 3D models...</p>
        </div>
      </Html>
    );
  }
  return <Loader />;
};

export default CustomLoader;
