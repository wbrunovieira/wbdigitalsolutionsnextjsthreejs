import React from 'react';
import { Box, Html } from '@react-three/drei';

interface MonitorProps {
  position: [number, number, number];
  displayedCode: string;
  activeButton: 'websites' | 'automation' | 'ai';
}

/**
 * Large monitor display component with code visualization
 */
const Monitor: React.FC<MonitorProps> = ({ position, displayedCode, activeButton }) => {
  const getFileHeader = () => {
    switch(activeButton) {
      case 'websites': return '// website.jsx';
      case 'automation': return '# automation.py';
      case 'ai': return '// ai-integration.js';
      default: return '';
    }
  };

  return (
    <group position={position}>
      {/* Single black screen background */}
      <mesh>
        <planeGeometry args={[4, 2.5]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>
      
      {/* Code Display */}
      <Html
        position={[0, 0, 0.01]}
        transform
        occlude
        scale={[0.1, 0.1, 0.1]}
        style={{
          width: '3800px',
          height: '2300px',
          background: '#1e1e1e',
          color: '#00ff00',
          fontFamily: 'monospace',
          fontSize: '72px',
          padding: '100px',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          borderRadius: '0px',
          boxShadow: 'inset 0 0 100px rgba(0, 255, 0, 0.1)'
        }}
      >
        <div style={{ position: 'relative' }}>
          <div style={{ 
            color: '#888', 
            marginBottom: '50px',
            paddingBottom: '50px',
            borderBottom: '5px solid #333',
            fontSize: '60px'
          }}>
            {getFileHeader()}
          </div>
          <div>
            {displayedCode}
            <span style={{ 
              animation: 'blink 1s infinite',
              color: '#00ff00',
              fontWeight: 'bold',
              fontSize: '72px'
            }}>|</span>
          </div>
        </div>
        <style>{`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}</style>
      </Html>
    </group>
  );
};

export default Monitor;