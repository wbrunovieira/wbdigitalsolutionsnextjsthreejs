import Head from "next/head";
import SalesHero from "@/components/cv/SalesHero";
import SalesPhilosophy from "@/components/cv/SalesPhilosophy";
import SalesTimeline from "@/components/cv/SalesTimeline";
import SalesSkills from "@/components/cv/SalesSkills";
import SalesEducation from "@/components/cv/SalesEducation";
import SalesLanguages from "@/components/cv/SalesLanguages";
import SalesAbout from "@/components/cv/SalesAbout";
import SalesContact from "@/components/cv/SalesContact";

const TITLE = "Bruno Vieira — Vendas Técnicas & Desenvolvimento Comercial B2B";
const DESCRIPTION =
  "Walter Bruno Prado Vieira — líder de vendas técnicas e desenvolvimento comercial com 25+ anos em B2B: contas enterprise, ciclo comercial completo e a profundidade técnica de quem constrói o próprio produto e fecha negócios complexos.";
const URL = "https://brunov.wbdigitalsolutions.com/";
const OG_IMAGE = "https://www.wbdigitalsolutions.com/img/herobg5-optimized.jpg";

export default function SalesCV() {
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
      <SalesHero />
      <SalesPhilosophy variant="decide" id="filosofia" />
      <SalesTimeline />
      <SalesSkills />
      <SalesEducation />
      <SalesLanguages />
      <SalesAbout />
      <SalesPhilosophy variant="clarity" id="clareza" />
      <SalesContact />
    </>
  );
}
