import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { makeI18nStaticProps } from '@/lib/i18n';
import logo from '/public/svg/logo-white.svg';

type ServerErrorCopy = {
  kicker: string;
  headline: string;
  description: string;
  retry: string;
  home: string;
  ariaCode: string;
  ariaLogo: string;
};

// Pure copy Record (exempt from the 200-line rule). Server-error tone: reassuring
// ("on us, not you"), a light touch of personality, written natively per locale.
const content: Record<'pt-BR' | 'en' | 'es' | 'it', ServerErrorCopy> = {
  'pt-BR': {
    kicker: 'Erro 500',
    headline: 'Algo quebrou do nosso lado.',
    description:
      'Foi um erro nosso, não seu. Nossa equipe já deve estar de olho. Tente de novo em instantes ou volte para a home.',
    retry: 'Tentar de novo',
    home: 'Voltar para a home',
    ariaCode: 'Erro 500: falha no servidor',
    ariaLogo: 'WB Digital Solutions, ir para a página inicial',
  },
  en: {
    kicker: 'Error 500',
    headline: 'Something broke on our end.',
    description:
      'This one is on us, not you. Our team is likely already on it. Try again in a moment, or head back home.',
    retry: 'Try again',
    home: 'Back to home',
    ariaCode: 'Error 500: server error',
    ariaLogo: 'WB Digital Solutions, go to the homepage',
  },
  es: {
    kicker: 'Error 500',
    headline: 'Algo se rompió de nuestro lado.',
    description:
      'Fue culpa nuestra, no tuya. Nuestro equipo ya debe estar en ello. Inténtalo de nuevo en un momento o vuelve al inicio.',
    retry: 'Intentar de nuevo',
    home: 'Volver al inicio',
    ariaCode: 'Error 500: fallo del servidor',
    ariaLogo: 'WB Digital Solutions, ir a la página de inicio',
  },
  it: {
    kicker: 'Errore 500',
    headline: 'Qualcosa si è rotto da parte nostra.',
    description:
      'È colpa nostra, non tua. Il nostro team probabilmente ci sta già lavorando. Riprova tra un istante o torna alla home.',
    retry: 'Riprova',
    home: 'Torna alla home',
    ariaCode: 'Errore 500: errore del server',
    ariaLogo: 'WB Digital Solutions, vai alla home page',
  },
};

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb947] focus-visible:ring-offset-2 focus-visible:ring-offset-[#350545]';

// Per-locale static generation, same pattern as the 404 / other static pages.
export const getStaticProps = makeI18nStaticProps();

export default function ServerErrorPage() {
  const { language } = useLanguage();
  const lang = (language === 'pt' ? 'pt-BR' : language) as keyof typeof content;
  const t = content[lang] || content['pt-BR'];
  const reducedMotion = useReducedMotion();

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
        <title>500 | WB Digital Solutions</title>
        <meta name="robots" content="noindex" />
      </Head>

      {/* Layout.tsx already renders the <main> landmark around pages. */}
      <section className="min-h-screen bg-custom-gradient flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
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

          {/* Big 500: middle zero in brand yellow, gentle floating loop. */}
          <motion.div variants={fadeUp} role="img" aria-label={t.ariaCode} className="select-none">
            <motion.div
              animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="font-mono font-bold leading-none text-[7rem] sm:text-[10rem] text-white drop-shadow-[0_0_35px_rgba(121,41,144,0.45)]"
            >
              <span aria-hidden="true">5</span>
              <span aria-hidden="true" className="text-[#ffb947]">0</span>
              <span aria-hidden="true">0</span>
            </motion.div>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-balance text-2xl sm:text-4xl font-extrabold text-white leading-tight max-w-xl">
            {t.headline}
          </motion.h1>

          <motion.p variants={fadeUp} className="text-balance text-white/60 text-base sm:text-lg leading-relaxed max-w-lg">
            {t.description}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
            <motion.div whileHover={reducedMotion ? undefined : { scale: 1.03 }} whileTap={reducedMotion ? undefined : { scale: 0.97 }}>
              <Link
                href="/"
                className={`inline-block bg-[#ffb947] hover:bg-[#ffb947]/90 text-[#350545] font-bold px-8 py-4 rounded-xl text-base transition-colors duration-200 ${FOCUS_RING}`}
              >
                {t.home}
              </Link>
            </motion.div>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className={`rounded-xl border border-white/15 bg-white/5 px-6 py-4 text-base font-medium text-white/80 transition-colors duration-200 hover:border-[#792990] hover:text-white ${FOCUS_RING}`}
            >
              {t.retry}
            </button>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
