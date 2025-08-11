import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Plane, Image, Text3D, Center, Html } from '@react-three/drei';
import * as THREE from 'three';

// Code snippets for each service
const codeSnippets = {
  websites: `// Next.js Website Component
import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="hero-section"
    >
      <h1>Welcome to WB Digital</h1>
      <p>Building amazing web experiences</p>
    </motion.div>
  );
}`,
  automation: `# Python Automation Script
import requests
import pandas as pd
from datetime import datetime

def automate_report():
    # Fetch data from API
    response = requests.get('api/data')
    data = response.json()
    
    # Process with pandas
    df = pd.DataFrame(data)
    df['timestamp'] = datetime.now()
    
    # Generate automated report
    df.to_excel('report.xlsx')
    print("✅ Report generated!")`,
  ai: `// AI Integration with OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});

async function generateContent(prompt) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt }
    ],
    temperature: 0.7
  });
  
  return completion.choices[0].message;
}`
};

// 3D Button Component
interface ButtonProps {
  position: [number, number, number];
  onClick: () => void;
  isActive: boolean;
  label: string;
}

const Button3D: React.FC<ButtonProps> = ({ position, onClick, isActive, label }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <group position={position}>
      {/* Button Base */}
      <Box 
        args={[0.3, 0.1, 0.3]} 
        position={[0, isActive ? 0.05 : 0, 0]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <meshStandardMaterial 
          color={isActive ? "#ffb947" : (hovered ? "#9747ff" : "#792990")}
          emissive={isActive ? "#ffb947" : "#792990"}
          emissiveIntensity={isActive ? 0.3 : 0.1}
        />
      </Box>
      {/* Button Top (pressable part) */}
      <Box 
        args={[0.25, 0.05, 0.25]} 
        position={[0, isActive ? 0.12 : 0.08, 0]}
        castShadow
      >
        <meshStandardMaterial 
          color={isActive ? "#ffd700" : "#a855f7"}
          metalness={0.5}
          roughness={0.3}
        />
      </Box>
    </group>
  );
};

const OfficeScene: React.FC = () => {
  const [activeButton, setActiveButton] = useState<'websites' | 'automation' | 'ai'>('websites');
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  
  // Typewriter effect
  useEffect(() => {
    const targetCode = codeSnippets[activeButton];
    if (currentCharIndex < targetCode.length) {
      const timeout = setTimeout(() => {
        setDisplayedCode(targetCode.substring(0, currentCharIndex + 1));
        setCurrentCharIndex(currentCharIndex + 1);
      }, 30); // Typing speed
      return () => clearTimeout(timeout);
    }
  }, [currentCharIndex, activeButton]);
  
  // Reset animation when button changes
  useEffect(() => {
    setDisplayedCode('');
    setCurrentCharIndex(0);
  }, [activeButton]);
  return (
    <Canvas
      shadows
      camera={{ position: [8, 5, 8], fov: 60 }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 8, 0]} intensity={2} color="#ffffff" />
      <pointLight position={[-5, 5, 5]} intensity={1} color="#ffb947" />
      <pointLight position={[5, 5, 5]} intensity={1} color="#792990" />
      
      {/* Floor */}
      <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <meshStandardMaterial color="#2a2a2a" />
      </Plane>

      {/* Walls */}
      {/* Back Wall */}
      <Box args={[20, 10, 0.5]} position={[0, 5, -10]} receiveShadow castShadow>
        <meshStandardMaterial color="#3d2f50" />
      </Box>
      
      {/* Front Wall with opening */}
      <Box args={[7, 10, 0.5]} position={[-6.5, 5, 10]} receiveShadow castShadow>
        <meshStandardMaterial color="#3d2f50" />
      </Box>
      <Box args={[7, 10, 0.5]} position={[6.5, 5, 10]} receiveShadow castShadow>
        <meshStandardMaterial color="#3d2f50" />
      </Box>
      <Box args={[6, 3, 0.5]} position={[0, 8.5, 10]} receiveShadow castShadow>
        <meshStandardMaterial color="#3d2f50" />
      </Box>
      
      {/* Left Wall */}
      <Box args={[0.5, 10, 20]} position={[-10, 5, 0]} receiveShadow castShadow>
        <meshStandardMaterial color="#3d2f50" />
      </Box>
      
      {/* Right Wall */}
      <Box args={[0.5, 10, 20]} position={[10, 5, 0]} receiveShadow castShadow>
        <meshStandardMaterial color="#3d2f50" />
      </Box>

      {/* Ceiling */}
      <Plane args={[20, 20]} rotation={[Math.PI / 2, 0, 0]} position={[0, 10, 0]} receiveShadow>
        <meshStandardMaterial color="#1a1a1a" />
      </Plane>

      {/* Office Furniture - Desks */}
      {/* Main Desk - WEBSITES */}
      <group position={[0, 0, -3]}>
        {/* Desk Top */}
        <Box args={[3, 0.1, 1.5]} position={[0, 0.8, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#4a3f36" />
        </Box>
        {/* WB Logo on Desk - Using the actual logo image */}
        <Image 
          url="/svg/logo-white.svg" 
          position={[0, 0.86, 0.2]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.8, 0.3, 1]}
          transparent
          opacity={0.9}
        />
        {/* Desk Legs */}
        <Box args={[0.1, 0.8, 0.1]} position={[-1.4, 0.4, -0.6]} castShadow>
          <meshStandardMaterial color="#2a2520" />
        </Box>
        <Box args={[0.1, 0.8, 0.1]} position={[1.4, 0.4, -0.6]} castShadow>
          <meshStandardMaterial color="#2a2520" />
        </Box>
        <Box args={[0.1, 0.8, 0.1]} position={[-1.4, 0.4, 0.6]} castShadow>
          <meshStandardMaterial color="#2a2520" />
        </Box>
        <Box args={[0.1, 0.8, 0.1]} position={[1.4, 0.4, 0.6]} castShadow>
          <meshStandardMaterial color="#2a2520" />
        </Box>
        
        {/* Button for WEBSITES */}
        <Button3D 
          position={[0.5, 0.85, 0.3]}
          onClick={() => setActiveButton('websites')}
          isActive={activeButton === 'websites'}
          label="WEBSITES"
        />
        
        {/* 3D Text "WEBSITES" */}
        <Center position={[0, 1.2, 0]}>
          <Text3D
            font="/img/assets/fonts/optimer_regular.typeface.json"
            size={0.3}
            height={0.06}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.01}
            bevelSize={0.002}
            bevelOffset={0}
            bevelSegments={5}
            castShadow
            receiveShadow
          >
            WEBSITES
            <meshStandardMaterial 
              color="#792990" 
              emissive="#792990" 
              emissiveIntensity={0.1}
              metalness={0.3}
              roughness={0.4}
            />
          </Text3D>
        </Center>
      </group>

      {/* Side Desk 1 - AUTOMATION */}
      <group position={[-5, 0, 2]}>
        <Box args={[2, 0.1, 1.2]} position={[0, 0.8, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#4a3f36" />
        </Box>
        {/* WB Logo on Side Desk 1 */}
        <Image 
          url="/svg/logo-white.svg" 
          position={[0, 0.86, 0.1]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.6, 0.25, 1]}
          transparent
          opacity={0.9}
        />
        <Box args={[0.1, 0.8, 0.1]} position={[-0.9, 0.4, -0.5]} castShadow>
          <meshStandardMaterial color="#2a2520" />
        </Box>
        <Box args={[0.1, 0.8, 0.1]} position={[0.9, 0.4, -0.5]} castShadow>
          <meshStandardMaterial color="#2a2520" />
        </Box>
        <Box args={[0.1, 0.8, 0.1]} position={[-0.9, 0.4, 0.5]} castShadow>
          <meshStandardMaterial color="#2a2520" />
        </Box>
        <Box args={[0.1, 0.8, 0.1]} position={[0.9, 0.4, 0.5]} castShadow>
          <meshStandardMaterial color="#2a2520" />
        </Box>
        
        {/* Button for AUTOMATION */}
        <Button3D 
          position={[0.4, 0.85, 0.2]}
          onClick={() => setActiveButton('automation')}
          isActive={activeButton === 'automation'}
          label="AUTOMATION"
        />
        
        {/* 3D Text "AUTOMATION" */}
        <Center position={[0, 1.2, 0]}>
          <Text3D
            font="/img/assets/fonts/optimer_regular.typeface.json"
            size={0.24}
            height={0.06}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.01}
            bevelSize={0.002}
            bevelOffset={0}
            bevelSegments={5}
            castShadow
            receiveShadow
          >
            AUTOMATION
            <meshStandardMaterial 
              color="#ffb947" 
              emissive="#ffb947" 
              emissiveIntensity={0.1}
              metalness={0.3}
              roughness={0.4}
            />
          </Text3D>
        </Center>
      </group>

      {/* Side Desk 2 - A.I. */}
      <group position={[5, 0, 2]}>
        <Box args={[2, 0.1, 1.2]} position={[0, 0.8, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#4a3f36" />
        </Box>
        {/* WB Logo on Side Desk 2 */}
        <Image 
          url="/svg/logo-white.svg" 
          position={[0, 0.86, 0.1]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.6, 0.25, 1]}
          transparent
          opacity={0.9}
        />
        <Box args={[0.1, 0.8, 0.1]} position={[-0.9, 0.4, -0.5]} castShadow>
          <meshStandardMaterial color="#2a2520" />
        </Box>
        <Box args={[0.1, 0.8, 0.1]} position={[0.9, 0.4, -0.5]} castShadow>
          <meshStandardMaterial color="#2a2520" />
        </Box>
        <Box args={[0.1, 0.8, 0.1]} position={[-0.9, 0.4, 0.5]} castShadow>
          <meshStandardMaterial color="#2a2520" />
        </Box>
        <Box args={[0.1, 0.8, 0.1]} position={[0.9, 0.4, 0.5]} castShadow>
          <meshStandardMaterial color="#2a2520" />
        </Box>
        
        {/* Button for A.I. */}
        <Button3D 
          position={[0.4, 0.85, 0.2]}
          onClick={() => setActiveButton('ai')}
          isActive={activeButton === 'ai'}
          label="A.I."
        />
        
        {/* 3D Text "A.I." */}
        <Center position={[0, 1.2, 0]}>
          <Text3D
            font="/img/assets/fonts/optimer_regular.typeface.json"
            size={0.36}
            height={0.09}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.01}
            bevelSize={0.003}
            bevelOffset={0}
            bevelSegments={5}
            castShadow
            receiveShadow
          >
            A.I.
            <meshStandardMaterial 
              color="#792990" 
              emissive="#792990" 
              emissiveIntensity={0.2}
              metalness={0.3}
              roughness={0.4}
            />
          </Text3D>
        </Center>
      </group>

      {/* Decorative Elements */}
      <Box args={[0.3, 2, 0.3]} position={[-8, 1, -8]} castShadow>
        <meshStandardMaterial color="#792990" />
      </Box>
      <Box args={[0.3, 1.5, 0.3]} position={[8, 0.75, -8]} castShadow>
        <meshStandardMaterial color="#ffb947" />
      </Box>
      <Box args={[0.3, 1.8, 0.3]} position={[-8, 0.9, 8]} castShadow>
        <meshStandardMaterial color="#350545" />
      </Box>

      {/* Logo on the wall */}
      <Box args={[4, 1, 0.1]} position={[0, 6, -9.9]} castShadow>
        <meshStandardMaterial color="#792990" emissive="#792990" emissiveIntensity={0.2} />
      </Box>

      {/* Large Monitor on Back Wall */}
      <group position={[0, 2, -9.8]}>
        {/* Monitor Frame */}
        <Box args={[4, 2.5, 0.1]} castShadow>
          <meshStandardMaterial color="#000000" />
        </Box>
        {/* Monitor Screen */}
        <Box args={[3.8, 2.3, 0.02]} position={[0, 0, 0.06]} castShadow>
          <meshStandardMaterial color="#1e1e1e" />
        </Box>
        {/* Code Display */}
        <Html
          position={[0, 0, 0.08]}
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
              {activeButton === 'websites' && '// website.jsx'}
              {activeButton === 'automation' && '# automation.py'}
              {activeButton === 'ai' && '// ai-integration.js'}
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

      {/* Controls */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minDistance={2}
        maxDistance={30}
      />
    </Canvas>
  );
};

export default OfficeScene;