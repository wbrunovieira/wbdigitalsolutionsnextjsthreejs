"use client";

import AnimatedBackgroundWebsiteComponent from "@/components/AnimatedBackgroundWebsite";

import CustomVsGeneric from "@/components/CustomVsGeneric";
import CTAWebsite from "@/components/WebSiteCTA";


import { WebsiteHeader } from "@/components/WebsiteHeader";

import { Metadata } from "next";
import dynamic from "next/dynamic";
import PageHead from "@/components/PageHead";
import Link from "next/link";

const OurApproach = dynamic(() => import("../../components/OurApproach"), { ssr: false });
const Differentiators = dynamic(() => import("../../components/Differentiators"), { ssr: false });
const Comparison = dynamic(() => import("../../components/Comparison"), { ssr: false });




export const metadata: Metadata = {
    title: "Interactive Periodic Table",
    description: "3D Interactive Periodic Table visualization",
};

const Websites: React.FC = () => {


    return (
        <>
            <PageHead pageKey="websites" />
            <main className="relative flex flex-col items-center justify-center bg-modern-gradient min-h-screen mt-16">

         <div className="md:relative flex flex-col md:flex-row w-full h-96 overflow-hidden mt-32">

                 <div className="relative md:absolute inset-0 z-0">
                  <AnimatedBackgroundWebsiteComponent />
                </div>

                <div className="relative z-10 flex flex-col justify-center items-center w-full md:w-auto min-h-[8rem]">
                    <WebsiteHeader scrollIndicatorHidden={true} />
                </div>
                
        </div>
        
        {/* 3D Showcase Buttons - Moved outside the overflow container */}
        <div className="w-full flex justify-center gap-4 my-8">
            <Link href="/3d-showcase">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3 text-lg">
                    <span>🚀</span>
                    <span>3D Office Experience</span>
                </button>
            </Link>
            <Link href="/3d-tunnel">
                <button className="bg-gradient-to-r from-purple-600 to-yellow-500 hover:from-purple-700 hover:to-yellow-600 text-white font-bold py-4 px-8 rounded-lg shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3 text-lg">
                    <span>🌌</span>
                    <span>3D Tunnel Experience</span>
                </button>
            </Link>
        </div>
        
            <CustomVsGeneric />
            <OurApproach />
            <Differentiators />
            <Comparison  />  
            <CTAWebsite />
            </main>
        </>
    );
};

export default Websites;
