import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { makeI18nStaticProps } from '@/lib/i18n';
import logo from '/public/svg/logo-white.svg';

type ShortcutKey = 'websites' | 'systems' | 'automation' | 'ai' | 'blog' | 'contact';

type NotFoundCopy = {
  kicker: string;
  headline: string;
  description: string;
  cta: string;
  shortcutsIntro: string;
  shortcuts: Record<ShortcutKey, string>;
  aria404: string;
  ariaNav: string;
  ariaLogo: string;
};

// Pure copy Record (exempt from the 200-line rule). Humor is written natively
// per locale, not translated literally.
const content: Record<'pt-BR' | 'en' | 'es' | 'it', NotFoundCopy> = {
  'pt-BR': {
    kicker: 'Erro 404',
    headline: 'Essa página a gente ainda não desenhou.',
    description:
      'O link pode ter mudado ou nunca ter existido. Acontece até nos melhores projetos. Enquanto isso, o resto do site está funcionando lindamente.',
    cta: 'Voltar para a home',
    shortcutsIntro: 'Ou siga por um destes caminhos:',
    shortcuts: {
      websites: 'Websites', systems: 'Sistemas', automation: 'Automação',
      ai: 'IA', blog: 'Blog', contact: 'Contato',
    },
    aria404: 'Erro 404: página não encontrada',
    ariaNav: 'Atalhos para as principais páginas',
    ariaLogo: 'WB Digital Solutions, ir para a página inicial',
  },
  en: {
    kicker: 'Error 404',
    headline: "This page didn't make the final design.",
    description:
      'The link may have moved, or it never existed in the first place. Either way, the rest of the site is pixel-perfect and one click away.',
    cta: 'Back to home',
    shortcutsIntro: 'Or take a shortcut:',
    shortcuts: {
      websites: 'Websites', systems: 'Systems', automation: 'Automation',
      ai: 'AI', blog: 'Blog', contact: 'Contact',
    },
    aria404: 'Error 404: page not found',
    ariaNav: 'Shortcuts to the main pages',
    ariaLogo: 'WB Digital Solutions, go to the homepage',
  },
  es: {
    kicker: 'Error 404',
    headline: 'Esta página no pasó del boceto.',
    description:
      'Puede que el enlace haya cambiado o que nunca haya existido. Tranquilo: el resto del sitio está impecable y a un clic de distancia.',
    cta: 'Volver al inicio',
    shortcutsIntro: 'O sigue por aquí:',
    shortcuts: {
      websites: 'Websites', systems: 'Sistemas', automation: 'Automatización',
      ai: 'IA', blog: 'Blog', contact: 'Contacto',
    },
    aria404: 'Error 404: página no encontrada',
    ariaNav: 'Atajos a las páginas principales',
    ariaLogo: 'WB Digital Solutions, ir a la página de inicio',
  },
  it: {
    kicker: 'Errore 404',
    headline: 'Questa pagina è rimasta sul tavolo da disegno.',
    description:
      'Forse il link è cambiato, forse non è mai esistito. In ogni caso il resto del sito è al suo posto, a un clic da qui.',
    cta: 'Torna alla home',
    shortcutsIntro: 'Oppure prosegui da qui:',
    shortcuts: {
      websites: 'Websites', systems: 'Sistemi', automation: 'Automazione',
      ai: 'IA', blog: 'Blog', contact: 'Contatti',
    },
    aria404: 'Errore 404: pagina non trovata',
    ariaNav: 'Scorciatoie alle pagine principali',
    ariaLogo: 'WB Digital Solutions, vai alla home page',
  },
};

// All six shortcut routes exist under src/pages/.
const SHORTCUT_ROUTES: Record<ShortcutKey, string> = {
  websites: '/websites', systems: '/systems', automation: '/automation',
  ai: '/ai', blog: '/blog', contact: '/contact',
};

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb947] focus-visible:ring-offset-2 focus-visible:ring-offset-[#350545]';

// Per-locale static generation, same pattern as the other static pages.
export const getStaticProps = makeI18nStaticProps();

export default function NotFoundPage() {
  const { language } = useLanguage();
  const lang = (language === 'pt' ? 'pt-BR' : language) as keyof typeof content;
  const t = content[lang] || content['pt-BR'];
  const reducedMotion = useReducedMotion();

  // Static fallback when the visitor prefers reduced motion.
  const stagger: Variants = {
    hidden: {},
    show: { transition: reducedMotion ? undefined : { staggerChildren: 0.12 } },
  };
  const fadeUp: Variants = reducedMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };

  return (
    <>
      <Head>
        <title>404 | WB Digital Solutions</title>
        {/* Next already answers with a 404 status; noindex is belt and braces. */}
        <meta name="robots" content="noindex" />
      </Head>

      {/* Layout.tsx already renders the <main> landmark around pages. */}
      <section className="min-h-screen bg-custom-gradient flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
        {/* Glow blobs, same recipe as newsletter.tsx */}
        <div aria-hidden="true" className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#792990]/20 rounded-full blur-[120px] pointer-events-none" />
        <div aria-hidden="true" className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-[#ffb947]/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="w-full max-w-2xl flex flex-col items-center gap-6 text-center"
        >
          <motion.div variants={fadeUp}>
            <Link href="/" aria-label={t.ariaLogo} className={`inline-block rounded-md ${FOCUS_RING}`}>
              <Image src={logo} alt="" width={150} height={45} priority />
            </Link>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="px-4 py-1.5 rounded-full border border-[#792990] bg-[#792990]/10 text-[#ffb947] text-xs font-mono font-semibold tracking-widest uppercase"
          >
            {t.kicker}
          </motion.p>

          {/* Big 404: middle zero in brand yellow, gentle floating loop. */}
          <motion.div
            variants={fadeUp}
            role="img"
            aria-label={t.aria404}
            className="select-none"
          >
            <motion.div
              animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="font-mono font-bold leading-none text-[7rem] sm:text-[10rem] text-white drop-shadow-[0_0_35px_rgba(121,41,144,0.45)]"
            >
              <span aria-hidden="true">4</span>
              <span aria-hidden="true" className="text-[#ffb947]">0</span>
              <span aria-hidden="true">4</span>
            </motion.div>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-balance text-2xl sm:text-4xl font-extrabold text-white leading-tight max-w-xl">
            {t.headline}
          </motion.h1>

          <motion.p variants={fadeUp} className="text-balance text-white/60 text-base sm:text-lg leading-relaxed max-w-lg">
            {t.description}
          </motion.p>

          <motion.div variants={fadeUp}>
            <motion.div whileHover={reducedMotion ? undefined : { scale: 1.03 }} whileTap={reducedMotion ? undefined : { scale: 0.97 }}>
              <Link
                href="/"
                className={`inline-block bg-[#ffb947] hover:bg-[#ffb947]/90 text-[#350545] font-bold px-8 py-4 rounded-xl text-base transition-colors duration-200 ${FOCUS_RING}`}
              >
                {t.cta}
              </Link>
            </motion.div>
          </motion.div>

          <motion.nav variants={fadeUp} aria-label={t.ariaNav} className="mt-2 flex flex-col items-center gap-3">
            <p className="text-white/40 text-sm">{t.shortcutsIntro}</p>
            <ul className="flex flex-wrap justify-center gap-2">
              {(Object.keys(SHORTCUT_ROUTES) as ShortcutKey[]).map((key) => (
                <li key={key}>
                  <Link
                    href={SHORTCUT_ROUTES[key]}
                    className={`inline-block px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white/70 text-sm hover:border-[#792990] hover:text-white transition-colors duration-200 ${FOCUS_RING}`}
                  >
                    {t.shortcuts[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        </motion.div>
      </section>
    </>
  );
}
