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

const Systems: React.FC = () => {
    return (
        <section className="flex w-full items-center justify-center bg-[#350545] min-h-screen">
            <div
                className="flex  w-full justify-center items-center"
                style={{ zIndex: 200 }}
            >
                <PeriodicTable />
            </div>
        </section>
    );
};

export default Systems;






