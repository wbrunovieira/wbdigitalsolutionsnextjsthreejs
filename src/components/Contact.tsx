'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ButtonStandard from './ButtonStandard';
import dynamic from 'next/dynamic';
const EarthCanvas = dynamic(() => import('./canvas/Earth'), { ssr: false, loading: () => <div className="w-full h-full" /> });
import { slideIn } from '../utils/motion';
import { useTranslations } from '@/contexts/TranslationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getAttribution } from '@/lib/attribution';
import AnimatedInput from './AnimatedInput';
import AnimatedTextarea from './AnimatedTextarea';
import { FiMail, FiPhone, FiCopy, FiCheck, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CONTACT_DIRECT: Record<string, string> = {
  'pt-BR': 'Ou fale direto com a gente',
  en: 'Or reach us directly',
  es: 'O habla directamente con nosotros',
  it: 'Oppure contattaci direttamente',
};

const PHONE_LABEL: Record<string, string> = {
  'pt-BR': 'Telefone',
  en: 'Phone',
  es: 'Teléfono',
  it: 'Telefono',
};

const COPY_UI: Record<string, { copy: string; copied: string }> = {
  'pt-BR': { copy: 'Copiar', copied: 'Copiado!' },
  en: { copy: 'Copy', copied: 'Copied!' },
  es: { copy: 'Copiar', copied: '¡Copiado!' },
  it: { copy: 'Copia', copied: 'Copiato!' },
};

const SUCCESS_UI: Record<string, { title: string; body: string; backHome: string; sendAnother: string }> = {
  'pt-BR': { title: 'Mensagem enviada!', body: 'Obrigado pelo contato. Retornaremos para você em breve.', backHome: 'Voltar para a home', sendAnother: 'Enviar outra mensagem' },
  en: { title: 'Message sent!', body: "Thanks for reaching out. We'll get back to you soon.", backHome: 'Back to home', sendAnother: 'Send another message' },
  es: { title: '¡Mensaje enviado!', body: 'Gracias por contactarnos. Te responderemos muy pronto.', backHome: 'Volver al inicio', sendAnother: 'Enviar otro mensaje' },
  it: { title: 'Messaggio inviato!', body: 'Grazie per averci contattato. Ti risponderemo a breve.', backHome: 'Torna alla home', sendAnother: 'Invia un altro messaggio' },
};

// Consent/transparency note under the submit button: sending the form attaches
// lead-source attribution (origin, navigation, approximate location) to the
// message, so we point to the privacy policy at the point of collection.
const PRIVACY_NOTICE: Record<string, { before: string; link: string; after: string }> = {
  'pt-BR': { before: 'Ao enviar, você está ciente da nossa ', link: 'Política de Privacidade', after: '.' },
  en: { before: 'By submitting, you acknowledge our ', link: 'Privacy Policy', after: '.' },
  es: { before: 'Al enviar, reconoces nuestra ', link: 'Política de Privacidad', after: '.' },
  it: { before: 'Inviando, prendi atto della nostra ', link: 'Informativa sulla Privacy', after: '.' },
};

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const loadTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    loadTimeRef.current = Date.now();
  }, []);

  const currentMessages = useTranslations();
  const { language } = useLanguage();
  const lang = language === 'pt' ? 'pt-BR' : language;
  const directLabel = CONTACT_DIRECT[lang] ?? CONTACT_DIRECT['pt-BR'];
  const copyUi = COPY_UI[lang] ?? COPY_UI['pt-BR'];
  const phoneLabel = PHONE_LABEL[lang] ?? PHONE_LABEL['pt-BR'];
  const successUi = SUCCESS_UI[lang] ?? SUCCESS_UI['pt-BR'];
  const privacyNotice = PRIVACY_NOTICE[lang] ?? PRIVACY_NOTICE['pt-BR'];

  // Reset back to a blank form so the user can send another message.
  const handleReset = () => {
    setIsSubmitted(false);
    setIsSubmitting(false);
    loadTimeRef.current = Date.now();
  };

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const handleCopy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1800);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — silently ignore.
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting || isSubmitted) {
      return;
    }

    // Honeypot: bots fill hidden fields, humans don't
    if (honeypot) {
      return;
    }

    // Timing: reject submissions faster than 3 seconds (bots are instant)
    const elapsed = Date.now() - loadTimeRef.current;
    if (elapsed < 3000) {
      return;
    }

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error(currentMessages.fillAllFields || 'Por favor, preencha todos os campos corretamente.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Track form submission in Google Analytics
      // window.gtag is typed by the global Window augmentation in CookieConsent.tsx.
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submit', {
          event_category: 'engagement',
          event_label: 'contact_form',
          value: 1,
        });
      }

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          language: language,
          _hp: honeypot,
          _t: loadTimeRef.current,
          attribution: getAttribution(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Mark as submitted to prevent validation issues
        setIsSubmitted(true);
        
        toast.success(currentMessages.successSubmission || 'Formulário enviado com sucesso!');

        // Clear the underlying field values; the inline success panel (driven by
        // isSubmitted) replaces the form so the user gets a clear confirmation
        // and stays on the page (no redirect).
        setName('');
        setEmail('');
        setMessage('');
      } else {
        toast.error(currentMessages.errorSubmission || 'Erro ao enviar o formulário. Tente novamente.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário', error);
      toast.error(currentMessages.errorSubmission || 'Erro ao enviar o formulário. Tente novamente.');
      setIsSubmitting(false);
    }
  }

  // Earth drifts organically (and nudges behind the form on the little scroll we
  // have). We move the CANVAS WRAPPER via CSS transform so the 3D scene — spin
  // (autoRotate) + user drag (OrbitControls) — stays fully intact. Desktop only.
  const earthWrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
    const tick = () => {
      const el = earthWrapRef.current;
      if (el) {
        if (window.innerWidth < 768) {
          el.style.transform = '';
        } else {
          const t = performance.now() / 1000;
          // Map the page's (small) scroll range to a LARGE travel so it has impact.
          const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          const p = clamp(window.scrollY / maxScroll, 0, 1);
          const ease = p * p * (3 - 2 * p); // smoothstep
          // Quasi-random organic drift (incommensurate sine frequencies).
          const driftX = Math.sin(t * 0.5) * 32 + Math.sin(t * 0.23 + 1.3) * 20;
          const driftY = Math.cos(t * 0.42) * 24 + Math.sin(t * 0.17 + 0.6) * 15;
          // On scroll it sweeps far left + down and recedes (scale), drifting
          // behind the form for a clear, impactful motion.
          const sx = -ease * 760;
          const sy = ease * 130;
          const scale = 1 - ease * 0.18;
          el.style.transform = `translate3d(${(driftX + sx).toFixed(1)}px, ${(driftY + sy).toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative flex flex-col md:flex-row gap-2 mt-32 md:overflow-hidden overflow-x-clip">
      <div className="relative z-10 flex-1 text-white p-5 pt-2 md:p-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={slideIn('left', 'tween', 0.2, 1)}
          className="bg-primary/70 backdrop-blur-md border border-white/10 rounded-lg shadow-md p-6"
        >
          <div className="flex flex-col items-start">
            {isSubmitted ? (
              <div role="status" aria-live="polite" className="flex w-full flex-col items-center py-10 text-center">
                <span className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-green-500/15 text-green-400">
                  <FiCheckCircle className="h-9 w-9" aria-hidden="true" />
                </span>
                <h2 className="mb-2 text-2xl font-bold text-white">{successUi.title}</h2>
                <p className="max-w-sm text-secondary">{successUi.body}</p>
                <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-full bg-yellowcustom px-6 py-3 text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-yellowcustom/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                  >
                    <FiArrowLeft aria-hidden="true" /> {successUi.backHome}
                  </Link>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-full px-4 py-2 text-sm font-medium text-secondary underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/60"
                  >
                    {successUi.sendAnother}
                  </button>
                </div>
              </div>
            ) : (
            <>
            <h2 className="bg-custom-purple inline-block rounded text-4xl px-4 py-2 font-bold mb-6">
              {currentMessages.getInTouch}
            </h2>
            <form className="w-full" onSubmit={handleSubmit}>
              {/* Honeypot: visually hidden, bots fill it, humans don't */}
              <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div className="mb-4 w-full">
                <AnimatedInput
                  label={currentMessages.nameLabel}
                  value={name}
                  onChange={(value) => setName(value)}
                  errorMessage={currentMessages.nameRequired}
                  required
                  name="name"
                  disabled={isSubmitting || isSubmitted}
                  skipValidation={isSubmitted}
                />
              </div>

              <div className="mb-4 w-full">
                <AnimatedInput
                  label={currentMessages.enterEmail}
                  value={email}
                  onChange={(value) => setEmail(value)}
                  errorMessage={currentMessages.validEmail}
                  required
                  type="email"
                  name="email"
                  disabled={isSubmitting || isSubmitted}
                  skipValidation={isSubmitted}
                />
              </div>

              <div className="mb-4 w-full">
                <AnimatedTextarea
                  label={currentMessages.messageLabel}
                  value={message}
                  onChange={(value) => setMessage(value)}
                  errorMessage={currentMessages.messageRequired}
                  required
                  name="message"
                  disabled={isSubmitting || isSubmitted}
                  skipValidation={isSubmitted}
                />
              </div>

              <div className="w-full flex justify-start">
                <ButtonStandard
                  buttonText={currentMessages.send2}
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  isLoading={isSubmitting}
                />
              </div>

              <p className="mt-4 text-xs leading-relaxed text-secondary/70">
                {privacyNotice.before}
                <Link
                  href="/privacy-policy"
                  className="text-yellowcustom underline decoration-yellowcustom/40 underline-offset-2 transition-colors hover:decoration-yellowcustom focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70"
                >
                  {privacyNotice.link}
                </Link>
                {privacyNotice.after}
              </p>
            </form>
            </>
            )}
          </div>
        </motion.div>

        {/* Direct contacts — also in the footer, surfaced here with copy-to-clipboard. */}
        <div className="mt-8">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-yellowcustom">
            {directLabel}
          </p>
          <ul className="flex flex-col gap-3">
            {[
              { key: 'whatsapp', icon: <SiWhatsapp aria-hidden="true" />, label: 'WhatsApp', value: '+55 11 98286-4581', href: 'https://wa.me/5511982864581', external: true, primary: true },
              { key: 'email', icon: <FiMail aria-hidden="true" />, label: 'Email', value: 'bruno@wbdigitalsolutions.com', href: 'mailto:bruno@wbdigitalsolutions.com' },
              { key: 'phone', icon: <FiPhone aria-hidden="true" />, label: phoneLabel, value: '+55 11 5026-4203', href: 'tel:+551150264203' },
            ].map((c) => {
              const copied = copiedKey === c.key;
              return (
                <li
                  key={c.key}
                  className={`group flex items-center gap-4 rounded-xl border p-3.5 transition-colors duration-300 ${
                    c.primary
                      ? 'border-yellowcustom/40 bg-yellowcustom/[0.07] hover:bg-yellowcustom/[0.12]'
                      : 'border-white/10 bg-white/5 hover:border-yellowcustom/30 hover:bg-white/[0.08]'
                  }`}
                >
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-xl transition-colors duration-300 ${
                      c.primary
                        ? 'bg-yellowcustom text-primary'
                        : 'bg-custom-purple/30 text-yellowcustom group-hover:bg-yellowcustom group-hover:text-primary'
                    }`}
                  >
                    {c.icon}
                  </span>
                  <a
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="min-w-0 flex-1"
                  >
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary/60">
                      {c.label}
                    </span>
                    <span className="block truncate text-base font-semibold text-white transition-colors group-hover:text-yellowcustom md:text-lg">
                      {c.value}
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(c.key, c.value)}
                    aria-label={`${copied ? copyUi.copied : copyUi.copy}: ${c.value}`}
                    title={copied ? copyUi.copied : copyUi.copy}
                    className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70 ${
                      copied
                        ? 'border-green-400/50 text-green-400'
                        : 'border-white/15 text-secondary hover:border-yellowcustom/50 hover:text-yellowcustom'
                    }`}
                  >
                    {copied ? <FiCheck /> : <FiCopy />}
                    {copied && (
                      <span className="pointer-events-none absolute -top-7 right-0 whitespace-nowrap rounded bg-green-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow-lg">
                        {copyUi.copied}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div
        ref={earthWrapRef}
        className="relative z-0 flex-1 flex justify-center items-center will-change-transform
                   h-[320px] -mb-[180px] order-first pointer-events-none
                   md:order-none md:h-auto md:mb-0 md:min-h-[500px] md:pointer-events-auto"
        style={{ overflow: 'visible' }}
      >
        {/* Brand scrim (mobile) — fades the globe into the page so it reads as an
            intentional backdrop the frosted form sits over, not a lone planet. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] md:hidden bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(26,8,38,0.45)_55%,#1a0826_100%)]"
        />
        <EarthCanvas />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;