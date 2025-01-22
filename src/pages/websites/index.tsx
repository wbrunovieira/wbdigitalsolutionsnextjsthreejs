"use client";

import AnimatedBackgroundDesignComponent from "@/components/AnimatedBackgroundDesign";
import { WebsiteHeader } from "@/components/WebsiteHeader";
import { Metadata } from "next";



export const metadata: Metadata = {
    title: "Interactive Periodic Table",
    description: "3D Interactive Periodic Table visualization",
};

const Websites: React.FC = () => {


    return (
        <main className="relative flex items-center justify-center bg-modern-gradient min-h-screen">
         <div className="relative w-full h-screen overflow-hidden mt-32">

              <div className="absolute inset-0 z-0">
                <AnimatedBackgroundDesignComponent />
              </div>

              <div className="relative z-10 px-4">
                <WebsiteHeader scrollIndicatorHidden={true} />
              </div>
                
            </div>
        </main>
    );
};

export default Websites;
