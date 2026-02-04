/**
 * Experience Platform Page
 * Full-screen 3D experience hub
 */

import Head from 'next/head';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with Three.js
const ExperiencePlatform = dynamic(
  () => import('@/components/3d-experience/ExperiencePlatform'),
  { ssr: false }
);

export default function ExperiencePage() {
  return (
    <>
      <Head>
        <title>3D Experience Platform | WB Digital Solutions</title>
        <meta
          name="description"
          content="Explore nossa plataforma de experiências 3D interativas. Conheça 7 formas diferentes de apresentar conteúdo imersivo."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <ExperiencePlatform />
    </>
  );
}

// Disable layout for full-screen experience
ExperiencePage.getLayout = (page: React.ReactElement) => page;
