import CanvasTextMasterclass from '@/components/CanvasTextMasterclass';
import React from 'react';

const websites: React.FC = () => {
  return (
    <CanvasTextMasterclass
      text='WB'
      size={{ width: 200, height: 100 }}
      colors={['#ff0000', '#00ff00', '#0000ff']}
    />
  );
};

export default websites;
