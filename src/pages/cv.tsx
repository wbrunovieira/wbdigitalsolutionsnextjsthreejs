import Head from "next/head";
import CVPage from "@/components/cv/CVPage";

const TITLE = "Bruno Vieira — Senior Full-Stack & AI Engineer · Technical Sales";
const DESCRIPTION =
  "Walter Bruno Prado Vieira — Senior Full-Stack & AI Engineer and Technical Sales leader. I build scalable platforms, AI systems and 3D experiences, and I run the full commercial cycle. 25+ years in B2B sales.";
const URL = "https://bruno.wbdigitalsolutions.com/";
const OG_IMAGE = "https://www.wbdigitalsolutions.com/img/herobg5-optimized.jpg";

export default function CV() {
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
      <CVPage />
    </>
  );
}
