import React from 'react';
import Button3D from './Button3D';
import Desk from './Desk';
import HolographicInfo from './HolographicInfo';
import PointerHand from './PointerHand';
import { ServiceType } from '../data/codeSnippets';
import { getServiceName } from '../data/serviceNames';

type Vec3 = [number, number, number];

const BUTTON_POSITION: Vec3 = [2.5, 0.95, 1];
const POINTER_POSITION: Vec3 = [2.5, 3, 1];
const INFO_POSITION: Vec3 = [0, 5.5, 0];

/** The websites desk needs no pointer hand: it is the one already active. */
const DESKS: { service: ServiceType; position: Vec3; pointerDelay?: number }[] = [
  { service: 'websites', position: [0, 0, -5] },
  { service: 'automation', position: [-5, 0, 0], pointerDelay: 500 },
  { service: 'ai', position: [5, 0, 0], pointerDelay: 1000 },
];

interface ServiceDesksProps {
  language: string;
  activeButton: ServiceType;
  onSelect: (service: ServiceType) => void;
  showPointers: boolean;
}

const ServiceDesks: React.FC<ServiceDesksProps> = ({ language, activeButton, onSelect, showPointers }) => (
  <>
    {DESKS.map(({ service, position, pointerDelay }) => (
      <Desk key={service} position={position} service={getServiceName(service, language)}>
        <Button3D
          position={BUTTON_POSITION}
          onClick={() => onSelect(service)}
          isActive={activeButton === service}
          scale={3.5}
        />
        <HolographicInfo
          isActive={activeButton === service}
          serviceType={service}
          language={language}
          position={INFO_POSITION}
        />
        {pointerDelay !== undefined && (
          <PointerHand
            position={POINTER_POSITION}
            rotation={[0, 0, 0]}
            isVisible={showPointers}
            delay={pointerDelay}
            language={language}
          />
        )}
      </Desk>
    ))}
  </>
);

export default ServiceDesks;
