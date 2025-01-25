import AnimatedBackgroundAutomationComponent from '@/components/AnimatedBackgorundAutomation';import AnimatedBackgroundDesignComponent from '@/components/AnimatedBackgroundDesign';
import { AutomationHeader } from '@/components/AutomationHeader';
import React from 'react';

const automation: React.FC = () => {
  return <main>
        <div className="relative w-full h-screen overflow-hidden mt-32">

<div className="absolute inset-0 z-0">
  <AnimatedBackgroundAutomationComponent />
</div>


<div className="relative z-10">
  <AutomationHeader scrollIndicatorHidden={true} />
</div>
</div>
  </main>
};

export default automation;
