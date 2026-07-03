import Head from "next/head";
import DevHero from "@/components/cv/DevHero";
import DevTimeline from "@/components/cv/DevTimeline";
import DevStack from "@/components/cv/DevStack";
import DevProjects from "@/components/cv/DevProjects";
import DevPhilosophy from "@/components/cv/DevPhilosophy";
import DevLanguages from "@/components/cv/DevLanguages";
import DevAbout from "@/components/cv/DevAbout";
import DevContact from "@/components/cv/DevContact";

const TITLE = "Bruno Vieira — Senior Full-Stack & AI Engineer";
const DESCRIPTION =
  "Walter Bruno Prado Vieira — Senior Full-Stack & AI Engineer. I turn complex problems into scalable software: production platforms, AI systems (LangGraph, RAG) and interactive 3D, owned end to end from architecture to deploy.";
const URL = "https://brunodev.wbdigitalsolutions.com/";
const OG_IMAGE = "https://www.wbdigitalsolutions.com/img/herobg5-optimized.jpg";

export default function DevCV() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={URL} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={URL} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Head>
      <DevHero />
      <DevPhilosophy variant="problem" id="filosofia" />
      <DevTimeline />
      <DevStack />
      <DevProjects />
      <DevLanguages />
      <DevAbout />
      <DevPhilosophy variant="people" id="oficio" />
      <DevContact />
    </>
  );
}
