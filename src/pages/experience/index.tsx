/**
 * Experience Platform Page
 * Full-screen 3D experience hub
 */

import dynamic from 'next/dynamic';
import PageHead from '@/components/PageHead';

// Dynamic import to avoid SSR issues with Three.js
const ExperiencePlatform = dynamic(
  () => import('@/components/3d-experience/ExperiencePlatform'),
  { ssr: false }
);

export default function ExperiencePage() {
  return (
    <>
      <PageHead pageKey="experience" />
      <ExperiencePlatform />
    </>
  );
}

// Disable layout for full-screen experience
ExperiencePage.getLayout = (page: React.ReactElement) => page;
