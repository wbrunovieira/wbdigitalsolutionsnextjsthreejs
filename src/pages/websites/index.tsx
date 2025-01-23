"use client";

import AnimatedBackgroundDesignComponent from "@/components/AnimatedBackgroundDesign";

import CustomVsGeneric from "@/components/CustomVsGeneric";
import CTAWebsite from "@/components/WebSiteCTA";


import { WebsiteHeader } from "@/components/WebsiteHeader";

import { Metadata } from "next";
import dynamic from "next/dynamic";

const OurApproach = dynamic(() => import("../../components/OurApproach"), { ssr: false });
const Differentiators = dynamic(() => import("../../components/Differentiators"), { ssr: false });
const Comparison = dynamic(() => import("../../components/Comparison"), { ssr: false });




export const metadata: Metadata = {
    title: "Interactive Periodic Table",
    description: "3D Interactive Periodic Table visualization",
};

const Websites: React.FC = () => {


    return (
        <main className="relative flex  flex-col items-center justify-center bg-modern-gradient min-h-screen">
         <div className="relative w-full h-96 overflow-hidden mt-32">

              <div className="absolute inset-0 z-0 ">
                <AnimatedBackgroundDesignComponent />
              </div>

              <div className=" z-10 px-4">
                <WebsiteHeader scrollIndicatorHidden={true} />
              </div>
                
            </div>
            <CustomVsGeneric />
            <OurApproach />
            <Differentiators />
            <Comparison  />  
            <CTAWebsite />
        </main>
    );
};

export default Websites;
