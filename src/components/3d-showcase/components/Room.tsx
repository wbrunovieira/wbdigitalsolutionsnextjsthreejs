import React from 'react';
import CodeWallScreen, { CodeTopic } from './room/CodeWallScreen';
import PhilosophyScreen from './room/PhilosophyScreen';
import RoomFloor from './room/RoomFloor';
import RoomWalls from './room/RoomWalls';

interface RoomProps {
  language?: string;
  displayedCode?: string;
  activeButton?: CodeTopic;
  isMobile?: boolean;
}

/**
 * Room component containing walls, floor and window
 * All elements have physics colliders for ball interaction
 */
const Room: React.FC<RoomProps> = ({
  language = 'en',
  displayedCode = '',
  activeButton = 'websites',
  isMobile = false,
}) => (
  <>
    <RoomFloor />
    <RoomWalls isMobile={isMobile} />
    <CodeWallScreen displayedCode={displayedCode} activeButton={activeButton} />
    <PhilosophyScreen language={language} />
  </>
);

export default Room;
