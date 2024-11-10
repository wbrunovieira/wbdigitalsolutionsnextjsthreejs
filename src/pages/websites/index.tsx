"use client";

import { Metadata } from "next";
import dynamic from "next/dynamic";

const PathNavigator = dynamic(() => import("@/components/PathNavigator"), {
    ssr: false,
});

export const metadata: Metadata = {
    title: "Interactive Periodic Table",
    description: "3D Interactive Periodic Table visualization",
};

const Websites: React.FC = () => {
    return (
        <section className="relative flex items-center justify-center bg-modern-gradient min-h-screen">
            <div
                className="absolute inset-0 flex justify-center items-center"
                style={{ zIndex: 200 }}
            >
                <PathNavigator />
            </div>
        </section>
    );
};

export default Websites;
