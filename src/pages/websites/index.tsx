"use client";

import PeriodicTable from "@/components/PeriodicTable";

const Websites: React.FC = () => {
    return (
        <section className="relative bg-[#350545] min-h-screen">
            <div className="absolute inset-0" style={{ zIndex: 0 }}>
                <PeriodicTable />
            </div>
        </section>
    );
};

export default Websites;
