
import { AIHeader } from '@/components/AIHeader';
import AnimatedBackgroundAIComponent from '@/components/AnimatedBackgoundAIComponent';
import React from 'react';

const ai: React.FC = () => {
  return <main>
      <div className="relative w-full h-screen overflow-hidden mt-32">
        <div className="absolute inset-0 z-0">

              <AnimatedBackgroundAIComponent />
        </div>
        <div className="relative z-10">
          <AIHeader scrollIndicatorHidden={true} />
        </div>
    </div>
  </main>
};

export default ai;
