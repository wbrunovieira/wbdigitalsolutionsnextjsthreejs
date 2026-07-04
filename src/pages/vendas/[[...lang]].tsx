import Head from "next/head";
import { useEffect, useMemo } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { LanguageContext, useLanguage } from "@/contexts/LanguageContext";
import type { CVLang } from "@/content/cv";
import SalesHero from "@/components/cv/SalesHero";
import SalesPhilosophy from "@/components/cv/SalesPhilosophy";
import SalesTimeline from "@/components/cv/SalesTimeline";
import SalesSkills from "@/components/cv/SalesSkills";
import SalesEducation from "@/components/cv/SalesEducation";
import SalesLanguages from "@/components/cv/SalesLanguages";
import SalesAbout from "@/components/cv/SalesAbout";
import SalesContact from "@/components/cv/SalesContact";
import SalesSkeleton from "@/components/cv/SalesSkeleton";

// URL-localized routes (SEO pilot). Audience-first default: the sales
// profile leads in Portuguese (Brazil-first market), so / = pt-BR +
// x-default and /en /it /es are the localized variants. (The dev page is
// the mirror case: its root is en.)
const BASE = "https://brunov.wbdigitalsolutions.com";
const SLUG: Record<CVLang, string> = { "pt-BR": "", en: "/en", it: "/it", es: "/es" };
const SLUG_TO_LANG: Record<string, CVLang> = { en: "en", it: "it", es: "es" };
/** One OG card per locale URL (same identity, localized eyebrow + role). */
const OG_IMG: Record<CVLang, string> = {
  "pt-BR": "/img/og-vendas.jpg",
  en: "/img/og-vendas-en.jpg",
  it: "/img/og-vendas-it.jpg",
  es: "/img/og-vendas-es.jpg",
};

const SEO: Record<CVLang, { title: string; description: string }> = {
  en: {
    title: "Bruno Vieira · Technical Sales & Business Development",
    description:
      "Walter Bruno Prado Vieira, salesman with 25+ years in B2B: from the shop counter to key accounts, technical and consultative selling, market development and relationships that retain. Selling is understanding: the product, the need and the person.",
  },
  "pt-BR": {
    title: "Bruno Vieira · Vendas Técnicas & Desenvolvimento Comercial B2B",
    description:
      "Walter Bruno Prado Vieira, vendedor com 25+ anos em B2B: do balcão às grandes contas, venda técnica e consultiva, abertura de mercados e relacionamento que fideliza. Vender é entender: o produto, a necessidade e a pessoa.",
  },
  it: {
    title: "Bruno Vieira · Vendite Tecniche & Sviluppo Commerciale B2B",
    description:
      "Walter Bruno Prado Vieira, venditore con 25+ anni nel B2B: dal bancone ai grandi clienti, vendita tecnica e consulenziale, sviluppo di mercati e relazioni che fidelizzano. Vendere è capire: il prodotto, il bisogno e la persona.",
  },
  es: {
    title: "Bruno Vieira · Ventas Técnicas & Desarrollo Comercial B2B",
    description:
      "Walter Bruno Prado Vieira, vendedor con 25+ años en B2B: del mostrador a las grandes cuentas, venta técnica y consultiva, apertura de mercados y relaciones que fidelizan. Vender es entender: el producto, la necesidad y la persona.",
  },
};

type Props = { lang: CVLang };

export default function SalesCV({ lang }: Props) {
  const globalLang = useLanguage();
  const seo = SEO[lang];
  const canonical = `${BASE}${SLUG[lang]}`;

  // Keep the site-wide language (localStorage) in sync with the route locale.
  useEffect(() => {
    if (globalLang.language !== lang) globalLang.setLanguage(lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Pin the language from the URL for every CV component (they all consume
  // useLanguage). Switching languages navigates to the sibling URL with a
  // full load so the subdomain host-rewrites resolve.
  const langValue = useMemo(
    () => ({
      language: lang as string,
      isLoaded: true,
      setLanguage: (l: string) => {
        globalLang.setLanguage(l);
        const base = window.location.pathname.startsWith("/vendas") ? "/vendas" : "";
        window.location.assign(base + SLUG[(l as CVLang) ?? "en"] || "/");
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang],
  );

  return (
    <LanguageContext.Provider value={langValue}>
      <Head>
        {/* CV pages bypass Layout/PageHead, so the full viewport meta must be
            set here; Next's default lacks initial-scale and Safari renders
            the page zoomed-out without it. */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* SSR-inline background: kills the WB purple flash (global.css paints
            html #350545 + a body gradient and can land AFTER this style in
            the cascade, hence the !important). */}
        <style dangerouslySetInnerHTML={{ __html: "html,body{background:#f7f7f8!important}" }} />
        <link rel="icon" type="image/svg+xml" href="/favicon-vendas.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-vendas-32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-vendas.png" />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonical} />
        {/* hreflang matrix: every locale URL lists all versions + x-default */}
        {(Object.keys(SLUG) as CVLang[]).map((l) => (
          <link key={l} rel="alternate" hrefLang={l} href={`${BASE}${SLUG[l]}`} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={BASE} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={`${BASE}${OG_IMG[lang]}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={`${BASE}${OG_IMG[lang]}`} />
      </Head>
      <SalesSkeleton />
      <SalesHero />
      <SalesPhilosophy variant="decide" id="filosofia" />
      <SalesTimeline />
      <SalesSkills />
      <SalesEducation />
      <SalesLanguages />
      <SalesAbout />
      <SalesPhilosophy variant="clarity" id="clareza" />
      <SalesContact />
    </LanguageContext.Provider>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: ["/vendas", "/vendas/en", "/vendas/it", "/vendas/es"],
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = (params?.lang as string[] | undefined)?.[0];
  const lang: CVLang = slug ? SLUG_TO_LANG[slug] : "pt-BR";
  return { props: { lang } };
};
