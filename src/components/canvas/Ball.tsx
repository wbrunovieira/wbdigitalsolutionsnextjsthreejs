import { Suspense, useState, useEffect } from "react";
import {
    Decal,
    Float,
    OrbitControls,
    Preload,
    useTexture,
} from "@react-three/drei";
import { Texture } from "three";
import CanvasLoader from "../Loader";
import { PauseableCanvas } from "../PauseableCanvas";
import { useMediaQuery } from "react-responsive";

type BallProps = {
    imgUrl: string;
    fallbackUrl?: string;
    onError?: (errorInfo: string) => void;
};

type BallCanvasProps = {
    icon: string;
    fallbackIcon?: string;
    skipIfError?: boolean;
    width?: number;
    height?: number;
};

const Ball = ({ imgUrl, fallbackUrl, onError }: BallProps) => {
    const [error, setError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const [currentUrl, setCurrentUrl] = useState(imgUrl);

    useEffect(() => {
        setError(false);
        setRetryCount(0);
        setCurrentUrl(imgUrl);
    }, [imgUrl]);

    const applyRetryOrFallback = () => {
        if (retryCount === 0) {
            setRetryCount(1);
            setTimeout(() => setCurrentUrl((url) => url + "?retry=1"), 500);
        } else if (fallbackUrl && currentUrl !== fallbackUrl) {
            setCurrentUrl(fallbackUrl);
        } else {
            setError(true);
            onError?.(
                `Erro ao carregar textura de ${imgUrl} com fallback ${fallbackUrl}`
            );
        }
    };

    const [decal] = useTexture([currentUrl], (textures: Texture[]) => {
        if (textures[0]?.image) {
            setError(false);
        } else {
            applyRetryOrFallback();
        }
    });

    useEffect(() => {
        if (decal) {
            const checkTexture = () => {
                if (!decal.image || decal.image.width === 0) {
                    applyRetryOrFallback();
                }
            };

            checkTexture();
            const timeoutId = setTimeout(checkTexture, 100);
            return () => clearTimeout(timeoutId);
        }
    }, [decal]);

    if ((error && !fallbackUrl) || !decal?.image) {
        return null;
    }

    return (
        <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
            <ambientLight intensity={0.75} />
            <directionalLight position={[0, 0, 0.1]} />
            <mesh castShadow receiveShadow scale={2.75}>
                <icosahedronGeometry args={[1, 1]} />
                <meshStandardMaterial
                    color="#DECBEF"
                    polygonOffsetFactor={-1}
                    flatShading
                />
                {decal.image && (
                    <Decal
                        position={[0, 0, 1]}
                        rotation={[0, 0, 0]}
                        scale={1}
                        map={decal}
                    />
                )}
            </mesh>
        </Float>
    );
};

const CanvasLights = () => (
    <>
        <ambientLight intensity={0.75} />
        <directionalLight position={[0, 0, 0.1]} />
    </>
);

const CanvasControls = () => (
    <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
    />
);

const BallCanvas = ({
    icon,
    fallbackIcon,
    skipIfError = false,
    width = 112,
    height = 112,
}: BallCanvasProps) => {
    const [hasError, setHasError] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 768 });


    const adjustedWidth = isMobile ? width / 2 : width;
    const adjustedHeight = isMobile ? height / 2 : height;

    if (hasError && skipIfError) {
        return null;
    }

    return (
        <PauseableCanvas
            frameloop="demand"
            gl={{ preserveDrawingBuffer: true }}
            className="w-full h-28"
            style={{
                width: `${adjustedWidth}px`,
                height: `${adjustedHeight}px`,
                display: "block",
            }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <CanvasControls />
                <CanvasLights />
                <Ball
                    imgUrl={icon}
                    fallbackUrl={fallbackIcon}
                    onError={(errorInfo) => {
                        console.error(errorInfo);
                        setHasError(true);
                    }}
                />
            </Suspense>
            <Preload all />
        </PauseableCanvas>
    );
};

export default BallCanvas;