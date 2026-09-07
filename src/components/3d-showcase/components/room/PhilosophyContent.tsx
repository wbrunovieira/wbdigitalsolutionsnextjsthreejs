import React from 'react';
import { Text } from '@react-three/drei';
import { PhilosophyTexts } from '../../data/philosophyTexts';
import { PhilosophySection } from './usePhilosophyRotation';

const BODY_COLOR = '#ffffff';

const SECTION_ACCENT: Record<PhilosophySection, string> = {
  mission: '#ffb947',
  vision: '#792990',
  values: '#4a90e2',
};

/** Y offsets of the four value bullets on the values slide. */
const VALUE_LINE_Y = [0.4, -0.05, -0.5, -0.95];

interface ScreenTextProps {
  y: number;
  color: string;
  fontSize: number;
  fontWeight: number;
  outlineWidth: number;
  emissiveIntensity: number;
  opacity: number;
  maxWidth?: number;
  textAlign?: 'center';
  children: string;
}

const ScreenText: React.FC<ScreenTextProps> = ({
  y, color, fontSize, fontWeight, outlineWidth, emissiveIntensity, opacity, maxWidth, textAlign, children,
}) => (
  <Text
    position={[0, y, 0.2]}
    fontSize={fontSize}
    color={color}
    fontWeight={fontWeight}
    anchorX="center"
    anchorY="middle"
    maxWidth={maxWidth}
    textAlign={textAlign}
    outlineWidth={outlineWidth}
    outlineColor="#000000"
    fillOpacity={opacity}
  >
    {children}
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={emissiveIntensity * opacity}
      transparent
      opacity={opacity}
    />
  </Text>
);

const SectionTitle: React.FC<{ y: number; color: string; opacity: number; children: string }> = (props) => (
  <ScreenText fontSize={0.6} fontWeight={900} outlineWidth={0.03} emissiveIntensity={0.3} {...props} />
);

type SectionBodyProps = Pick<ScreenTextProps, 'y' | 'opacity' | 'maxWidth' | 'textAlign' | 'children'> & {
  fontSize: number;
  outlineWidth: number;
};

const SectionBody: React.FC<SectionBodyProps> = (props) => (
  <ScreenText color={BODY_COLOR} fontWeight={600} emissiveIntensity={0.05} {...props} />
);

interface PhilosophyContentProps {
  section: PhilosophySection;
  texts: PhilosophyTexts;
  opacity: number;
}

/** Mission / vision / values slide rendered inside the animated screen group. */
const PhilosophyContent: React.FC<PhilosophyContentProps> = ({ section, texts, opacity }) => {
  const accent = SECTION_ACCENT[section];

  if (section === 'values') {
    const values = [texts.value1, texts.value2, texts.value3, texts.value4];

    return (
      <group>
        <SectionTitle y={1.2} color={accent} opacity={opacity}>
          {texts.values}
        </SectionTitle>
        {values.map((value, index) => (
          <SectionBody key={value} y={VALUE_LINE_Y[index]} fontSize={0.28} outlineWidth={0.015} opacity={opacity}>
            {value}
          </SectionBody>
        ))}
      </group>
    );
  }

  const isMission = section === 'mission';

  return (
    <group>
      <SectionTitle y={1.0} color={accent} opacity={opacity}>
        {isMission ? texts.mission : texts.vision}
      </SectionTitle>
      <SectionBody
        y={-0.2}
        fontSize={0.35}
        outlineWidth={0.02}
        maxWidth={6.5}
        textAlign="center"
        opacity={opacity}
      >
        {isMission ? texts.missionText : texts.visionText}
      </SectionBody>
    </group>
  );
};

export default PhilosophyContent;
