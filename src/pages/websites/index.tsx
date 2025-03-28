"use client";

import AnimatedBackgroundWebsiteComponent from "@/components/AnimatedBackgroundWebsite";

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
        <main className="relative flex flex-col items-center justify-center bg-modern-gradient min-h-screen mt-16">

         <div className="md:relative flex flex-col md:flex-row w-full h-96 overflow-hidden mt-32 ml-16">

                 <div className="relative md:absolute inset-0 z-0">
                  <AnimatedBackgroundWebsiteComponent />
                </div>

                <div className="relative z-10 flex flex-col justify-center items-center w-full md:w-auto min-h-[8rem]">
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
