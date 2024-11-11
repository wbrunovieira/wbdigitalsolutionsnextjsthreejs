
import AnimatedBackgroundDesingDComponent from '@/components/AnimatedBackgroundDesign';
import { DesignHeader } from '@/components/DesignHero';
import React from 'react';




const design: React.FC = () => {


  return (


    <div>
      <DesignHeader scrollIndicatorHidden={false} />
      <AnimatedBackgroundDesingDComponent />
    </div>


  );
};

export default design;
