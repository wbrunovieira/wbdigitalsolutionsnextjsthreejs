"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

// Define types for table data
type ElementData = [string, string, string, number, number];
type LayoutType = "table" | "sphere" | "helix" | "grid";

// Define interface for Element props
interface ElementProps {
    symbol: string;
    name: string;
    mass: string;
    position: [number, number, number];
    layout: LayoutType;
    onClick?: () => void;
}

const table: ElementData[] = [
    ["H", "Hydrogen", "1.00794", 1, 1],
    ["He", "Helium", "4.002602", 18, 1],
    ["Li", "Lithium", "6.941", 1, 2],
    ["Be", "Beryllium", "9.012182", 2, 2],
    ["B", "Boron", "10.811", 13, 2],
    ["C", "Carbon", "12.0107", 14, 2],
    ["N", "Nitrogen", "14.0067", 15, 2],
    ["O", "Oxygen", "15.9994", 16, 2],
    ["F", "Fluorine", "18.9984032", 17, 2],
    ["Ne", "Neon", "20.1797", 18, 2],
    ["Na", "Sodium", "22.98976...", 1, 3],
    ["Mg", "Magnesium", "24.305", 2, 3],
    ["Al", "Aluminium", "26.9815386", 13, 3],
    ["Si", "Silicon", "28.0855", 14, 3],
    ["P", "Phosphorus", "30.973762", 15, 3],
    ["S", "Sulfur", "32.065", 16, 3],
    ["Cl", "Chlorine", "35.453", 17, 3],
    ["Ar", "Argon", "39.948", 18, 3],
    ["K", "Potassium", "39.948", 1, 4],
    ["Ca", "Calcium", "40.078", 2, 4],
];

const Element: React.FC<ElementProps> = ({
    symbol,
    name,
    mass,
    position,
    onClick,
    layout,
}) => {
    const [hovered, setHovered] = React.useState(false);

    const { pos } = useSpring({
        pos: position,
        config: { mass: 1, tension: 170, friction: 26 },
    });

    return (
        <animated.group
            position={pos}
            onClick={onClick}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <Html
                style={{
                    pointerEvents: "auto",
                    zIndex: 1,
                }}
                transform
                distanceFactor={10}
                position={[0, 0, 0]}
                center
            >
                <div
                    style={{
                        width: "60px",
                        height: "80px",
                        background: `rgba(0,127,127,${hovered ? 0.75 : 0.5})`,
                        borderRadius: "4px",
                        padding: "8px",
                        color: "white",
                        fontSize: "12px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        transform: `scale(${hovered ? 1.1 : 1})`,
                        border: "1px solid rgba(127,255,255,0.25)",
                        boxShadow: hovered
                            ? "0px 0px 12px rgba(0,255,255,0.75)"
                            : "0px 0px 12px rgba(0,255,255,0.5)",
                        WebkitTransform: `scale(${hovered ? 1.1 : 1})`,
                        WebkitBackfaceVisibility: "hidden",
                        backfaceVisibility: "hidden",
                    }}
                >
                    <div
                        style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "rgba(255,255,255,0.75)",
                        }}
                    >
                        {symbol}
                    </div>
                    <div
                        style={{
                            fontSize: "8px",
                            textAlign: "center",
                            color: "rgba(127,255,255,0.75)",
                        }}
                    >
                        {name}
                        <br />
                        {mass}
                    </div>
                </div>
            </Html>
        </animated.group>
    );
};

const getPosition = (
    element: ElementData,
    index: number,
    layout: LayoutType
): [number, number, number] => {
    const spacing = 70;

    switch (layout) {
        case "table":
            return [
                (element[3] - 9) * spacing,
                -(element[4] - 2.5) * spacing,
                0,
            ];
        case "sphere": {
            const phi = Math.acos(-1 + (2 * index) / table.length);
            const theta = Math.sqrt(table.length * Math.PI) * phi;
            const r = 400;
            return [
                r * Math.cos(theta) * Math.sin(phi),
                r * Math.cos(phi),
                r * Math.sin(theta) * Math.sin(phi),
            ];
        }
        case "helix": {
            const theta = index * 0.35 + Math.PI;
            const y = -(index * 8) + 150;
            const r = 250;
            return [r * Math.cos(theta), y, r * Math.sin(theta)];
        }
        case "grid": {
            const elements = 5;
            return [
                (index % elements) * 100 - 200,
                (-Math.floor(index / elements) % elements) * 100 + 200,
                Math.floor(index / (elements * elements)) * 200 - 400,
            ];
        }
    }
};

const PeriodicTable: React.FC = () => {
    const [layout, setLayout] = React.useState<LayoutType>("table");

    return (
        <div
            className="relative w-full h-[calc(100vh-4rem)]"
            style={{ zIndex: 0 }}
        >
            {" "}
            {/* Ajustado para considerar nav/footer */}
            <div className="absolute bottom-4 w-full flex justify-center gap-4 z-50">
                {(["table", "sphere", "helix", "grid"] as LayoutType[]).map(
                    (l) => (
                        <button
                            key={l}
                            onClick={() => setLayout(l)}
                            className={`
                                px-4 py-2
                                text-cyan-300
                                border border-cyan-300
                                rounded
                                uppercase
                                transition-colors
                                hover:bg-cyan-900/30
                                ${
                                    layout === l
                                        ? "bg-cyan-900/50"
                                        : "bg-transparent"
                                }
                            `}
                        >
                            {l}
                        </button>
                    )
                )}
            </div>
            <Canvas camera={{ position: [0, 0, 1000], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />

                {table.map((element, index) => (
                    <Element
                        key={element[0]}
                        symbol={element[0]}
                        name={element[1]}
                        mass={element[2]}
                        position={getPosition(element, index, layout)}
                        layout={layout}
                        onClick={() => console.log(`Clicked ${element[1]}`)}
                    />
                ))}

                <OrbitControls
                    minDistance={200}
                    maxDistance={2000}
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                />
            </Canvas>
        </div>
    );
};

export default PeriodicTable;
