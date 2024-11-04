"use client";

import { Metadata } from "next";
import dynamic from "next/dynamic";

const PeriodicTable = dynamic(() => import("@/components/PeriodicTable"), {
    ssr: false,
});

export const metadata: Metadata = {
    title: "Interactive Periodic Table",
    description: "3D Interactive Periodic Table visualization",
};

const Websites: React.FC = () => {
    return (
        <section className="relative bg-[#350545] min-h-screen">
            <div className="absolute inset-0" style={{ zIndex: 200 }}>
                <PeriodicTable />
            </div>
        </section>
    );
};

export default Websites;
