// pages/3d-reveal.tsx
import React from 'react';
import dynamic from 'next/dynamic';


const ThreeDScene = dynamic(() => import('./ThreeDScene'), {
    ssr: false,
});

const ThreeDRevealPage: React.FC = () => {
    return (
        <div className="h-screen bg-primary w-full">

            <ThreeDScene />
        </div>
    );
};

export default ThreeDRevealPage;
