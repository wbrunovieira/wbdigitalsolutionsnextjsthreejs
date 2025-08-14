"use client";
import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, ISourceOptions } from "@tsparticles/engine";

const INITIAL_PARTICLES_DESKTOP = 10;
const MAX_PARTICLES_DESKTOP = 15;
const INITIAL_PARTICLES_MOBILE = 5;
const MAX_PARTICLES_MOBILE = 8;

const ParticlesContainer: React.FC = () => {
  const [init, setInit] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const particlesLoaded = async (container?: Container) => {
    console.log("Particles container loaded:", container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: { value: "#1a202c" },
      },
      fpsLimit: isMobile ? 60 : 120,
      interactivity: {
        events: {
          onClick: {
            enable: !isMobile,
            mode: "push",
          },
          onHover: {
            enable: !isMobile,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: isMobile ? 1 : 2,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: { value: "#ffffff" },
        links: {
          color: "#ffffff",
          distance: isMobile ? 100 : 150,
          enable: true,
          opacity: isMobile ? 0.3 : 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" },
          random: false,
          speed: isMobile ? 1 : 2,
          straight: false,
        },
        number: {
          density: {
            enable: false,
          },
          value: isMobile ? INITIAL_PARTICLES_MOBILE : INITIAL_PARTICLES_DESKTOP,
          limit: {
            mode: "delete",
            value: isMobile ? MAX_PARTICLES_MOBILE : MAX_PARTICLES_DESKTOP,
          },
        },
        opacity: { value: isMobile ? 0.3 : 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: isMobile ? 3 : 5 } },
      },
      detectRetina: true,
    }),
    [isMobile]
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={options}
        particlesLoaded={particlesLoaded}
        className="absolute inset-0 w-full h-full -z-10"
      />
    );
  }

  return <></>;
};

export default ParticlesContainer;