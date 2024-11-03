import React from "react";
import { Vector3 } from "three";
import Lighting from "./Lighting";
import CubeLabel from "./CubeLabel";

interface CubeProps {
    position: Vector3 | [number, number, number];
    color: string;
    label?: string;
}

const Cube: React.FC<CubeProps> = ({ position, color, label }) => {
    const pos = Array.isArray(position) ? new Vector3(...position) : position;

    return (
        <mesh position={pos}>
            <boxGeometry />
            <meshStandardMaterial color={color} />
            <Lighting />
            {label && <CubeLabel text={label} />}
        </mesh>
    );
};

export default Cube;
