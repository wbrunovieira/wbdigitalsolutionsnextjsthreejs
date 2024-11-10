"use client";
import PeriodicTableClient from "./PeriodicTableClient";

export default function PeriodicTablePage() {
    return (
        <div
            className="flex items-center justify-center w-full min-h-screen bg-modern-gradient"
            style={{ zIndex: 0 }}
        >
            <PeriodicTableClient />
        </div>
    );
}
