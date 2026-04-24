"use client";

import dynamic from "next/dynamic";
const AnimatedBackgroundWebsiteComponent = dynamic(() => import("@/components/AnimatedBackgroundWebsite"), { ssr: false, loading: () => <div className="w-full h-96" /> });

import CustomVsGeneric from "@/components/CustomVsGeneric";
import CTAWebsite from "@/components/WebSiteCTA";
import { WebsiteHeader } from "@/components/WebsiteHeader";
import PageHead from "@/components/PageHead";
import Link from "next/link";

const OurApproach = dynamic(() => import("../../components/OurApproach"), { ssr: false });
const Differentiators = dynamic(() => import("../../components/Differentiators"), { ssr: false });
const Comparison = dynamic(() => import("../../components/Comparison"), { ssr: false });
const ThreeDExperiencesSection = dynamic(() => import("../../components/3DExperiencesSection"), { ssr: false });




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

            {/* 3D Experiences Section */}
            <ThreeDExperiencesSection />

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
