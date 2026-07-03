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
        {/* CV pages bypass Layout/PageHead, so the full viewport meta must be
            set here; Next's default lacks initial-scale and Safari renders
            the page zoomed-out without it. */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Exclusive favicon: amber growth arrow on a graphite disc (SVG + PNG/apple fallbacks) */}
        <link rel="icon" type="image/svg+xml" href="/favicon-vendas.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-vendas-32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-vendas.png" />
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
