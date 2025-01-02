
import AnimatedBackgroundDesignComponent from '@/components/AnimatedBackgroundDesign';

import { DesignHeader } from '@/components/DesignHero';
import React from 'react';




const design: React.FC = () => {


  return (

    <div className="relative w-full h-screen overflow-hidden mt-32">

      <div className="absolute inset-0 z-0">
        <AnimatedBackgroundDesignComponent />
      </div>


      <div className="relative z-10">
        <DesignHeader scrollIndicatorHidden={true} />
      </div>
    </div>


  );
};

export default design;
