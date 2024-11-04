"use client";
import PeriodicTableClient from "./PeriodicTableClient";

export default function PeriodicTablePage() {
    return (
        <div
            className="relative w-full  bg-modern-gradient"
            style={{ zIndex: 0 }}
        >
            <PeriodicTableClient />
        </div>
    );
}
