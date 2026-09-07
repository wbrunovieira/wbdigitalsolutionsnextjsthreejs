import { useEffect, useRef, useState } from 'react';
import { Decal, useTexture } from '@react-three/drei';
import { Texture, Mesh } from 'three';
import { useMediaQuery } from 'react-responsive';

type BallProps = {
    imgUrl: string;
    fallbackUrl?: string;
    onError?: (errorInfo: string) => void;
};

const Ball = ({ imgUrl, fallbackUrl, onError }: BallProps) => {
    const [error, setError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const [currentUrl, setCurrentUrl] = useState(imgUrl);
    const meshRef = useRef<Mesh>(null);
    const isMobile = useMediaQuery({ maxWidth: 768 });

    useEffect(() => {
        setError(false);
        setRetryCount(0);
        setCurrentUrl(imgUrl);
    }, [imgUrl]);

    const applyRetryOrFallback = () => {
        if (retryCount === 0) {
            setRetryCount(1);
            setTimeout(() => setCurrentUrl((url) => url + '?retry=1'), 500);
        } else if (fallbackUrl && currentUrl !== fallbackUrl) {
            setCurrentUrl(fallbackUrl);
        } else {
            setError(true);
            onError?.(
                `Erro ao carregar textura de ${imgUrl} com fallback ${fallbackUrl}`,
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

    useEffect(() => () => {
            if (meshRef.current) {
                meshRef.current.geometry?.dispose();
                if (meshRef.current.material) {
                    if (Array.isArray(meshRef.current.material)) {
                        meshRef.current.material.forEach(mat => mat.dispose());
                    } else {
                        meshRef.current.material.dispose();
                    }
                }
            }
            decal?.dispose();
        }, [decal]);

    if ((error && !fallbackUrl) || !decal?.image) {
        return null;
    }

    return (
        <>
            <ambientLight intensity={isMobile ? 0.5 : 0.75} />
            <directionalLight position={[0, 0, 0.1]} intensity={isMobile ? 0.5 : 1} />
            <mesh
                ref={meshRef}
                castShadow={!isMobile}
                receiveShadow={!isMobile}
                scale={2.75}
            >
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
        </>
    );
};

export default Ball;
