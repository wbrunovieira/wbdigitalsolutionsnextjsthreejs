"use client";

import React, { useEffect, useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { BaseCanvasProps, useIsVisible } from "./BaseCanvas";

export interface PreloadedCanvasProps extends BaseCanvasProps {
    preloadAssets?: string[];
    
}

const loadAsset = async (url: string): Promise<any> => {
    if (url.endsWith(".gltf")) {
        return new Promise((resolve) => {
            useGLTF.preload(url);
            setTimeout(resolve, 100);
        });
    }

    if (url.endsWith(".jpg") || url.endsWith(".png")) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
        });
    }

    return Promise.resolve();
};

export const PreloadedCanvas: React.FC<PreloadedCanvasProps> = ({
    children,
    className = "",
    preloadAssets = [],
    frameloop = "demand",
    ...canvasProps
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isVisible = useIsVisible(containerRef);
    const [isPreloaded, setIsPreloaded] = useState(false);
    const assetsCache = useRef<Map<string, any>>(new Map());

    useEffect(() => {
        const preloadAll = async () => {
            try {
                await Promise.all(
                    preloadAssets.map(async (url) => {
                        if (!assetsCache.current.has(url)) {
                            const asset = await loadAsset(url);
                            assetsCache.current.set(url, asset);
                        }
                    })
                );
                setIsPreloaded(true);
            } catch (error) {
                console.error("Failed to preload assets:", error);
                setIsPreloaded(true);
            }
        };

        preloadAll();

        return () => {
            assetsCache.current.clear();
        };
    }, [preloadAssets]);

    useEffect(() => {
        if (!canvasRef.current) return; 

       
        const handleResize = () => {
           
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize); 
        };
    }, [canvasRef]);

    if (!isPreloaded || !isVisible) {
        return (
            <div ref={containerRef} className={className}>
                <div className="flex items-center justify-center w-full h-full">
                    <span>Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className={className}>
            <Suspense fallback={<span>Carregando...</span>}>
                <Canvas
                    {...canvasProps}
                    ref={canvasRef}
                    frameloop="demand"
                    style={{
                        visibility: isVisible ? "visible" : "hidden",
                        ...canvasProps.style,
                    }}
                >
                    {children}
                </Canvas>
            </Suspense>
        </div>
    );
};
