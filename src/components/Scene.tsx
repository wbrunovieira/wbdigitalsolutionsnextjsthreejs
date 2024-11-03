

import React from "react";
import { OrbitControls } from "@react-three/drei";
import { Vector3 } from "three";
import Cube from "./Cube";

const Scene: React.FC = () => {
    return (
        <>
            <OrbitControls />
            <Cube position={new Vector3(1, 0, 0)} color="orange" label="WB Sites" />
            <Cube position={new Vector3(-1, 0, 0)} color="purple" />
        </>
    );
};

export default Scene;
