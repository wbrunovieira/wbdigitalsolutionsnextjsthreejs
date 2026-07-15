'use client';
import { useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

// Compact newsletter subscribe form, reused in the Footer and on the Home page.
// Posts to /api/newsletter with the same anti-bot fields the full page sends
// (honeypot + load timestamp). The full form lives at /newsletter.
export interface NewsletterCopy {
  heading: string;
  sub: string;
  placeholder: string;
  cta: string;
  sending: string;
  success: string;
  error: string;
  aria: string;
}

export const NEWSLETTER_COPY: Record<string, NewsletterCopy> = {
  'pt-BR': {
    heading: 'Ideias práticas e notícias, toda semana',
    sub: 'Tecnologia, IA, automação e vendas sem jargão, para aplicar no mesmo dia. Sem spam, cancele quando quiser.',
    placeholder: 'Seu melhor e-mail',
    cta: 'Assinar', sending: 'Enviando...',
    success: 'Pronto! Você está dentro. 🎉',
    error: 'Algo deu errado. Tente novamente.',
    aria: 'E-mail para a newsletter',
  },
  en: {
    heading: 'Practical ideas and news, every week',
    sub: 'Technology, AI, automation and sales without the jargon, ready to apply the same day. No spam, unsubscribe anytime.',
    placeholder: 'Your best email',
    cta: 'Subscribe', sending: 'Sending...',
    success: "You're in! 🎉",
    error: 'Something went wrong. Please try again.',
    aria: 'Newsletter email',
  },
  es: {
    heading: 'Ideas prácticas y noticias, cada semana',
    sub: 'Tecnología, IA, automatización y ventas sin jerga, para aplicar el mismo día. Sin spam, cancela cuando quieras.',
    placeholder: 'Tu mejor correo',
    cta: 'Suscribirme', sending: 'Enviando...',
    success: '¡Ya estás dentro! 🎉',
    error: 'Algo salió mal. Inténtalo de nuevo.',
    aria: 'Correo para la newsletter',
  },
  it: {
    heading: 'Idee pratiche e notizie, ogni settimana',
    sub: 'Tecnologia, IA, automazione e vendite senza tecnicismi, da applicare lo stesso giorno. Niente spam, cancellati quando vuoi.',
    placeholder: 'La tua migliore email',
    cta: 'Iscriviti', sending: 'Invio...',
    success: 'Sei dentro! 🎉',
    error: 'Qualcosa è andato storto. Riprova.',
    aria: 'Email per la newsletter',
  },
};

interface Props {
  // compact = footer variant (heading only, no subheading).
  compact?: boolean;
  // formOnly = render just the input + button (caller provides its own heading).
  formOnly?: boolean;
}

const NewsletterInline: React.FC<Props> = ({ compact = false, formOnly = false }) => {
  const { language } = useLanguage();
  const lang = (language === 'pt' ? 'pt-BR' : language) as keyof typeof NEWSLETTER_COPY;
  const t = NEWSLETTER_COPY[lang] || NEWSLETTER_COPY['pt-BR'];

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [honeypot, setHoneypot] = useState('');
  const loadTimeRef = useRef<number>(Date.now());

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'loading' || status === 'success' || !email.trim()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          language: lang,
          _hp: honeypot,
          _t: loadTimeRef.current,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="w-full">
      {!formOnly && <p className="text-sm font-semibold text-white">{t.heading}</p>}
      {!formOnly && !compact && <p className="mt-1 text-sm text-secondary">{t.sub}</p>}

      {status === 'success' ? (
        <p
          className={`${formOnly ? '' : 'mt-3'} text-sm font-medium text-yellowcustom`}
          role="status"
          aria-live="polite"
        >
          {t.success}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className={`${formOnly ? '' : 'mt-3'} flex flex-col gap-2 sm:flex-row`}>
          {/* Honeypot — off-screen, hidden from humans; bots fill it */}
          <input
            type="text"
            name="_hp_website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.placeholder}
            aria-label={t.aria}
            className="min-w-0 flex-1 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 transition-colors focus:border-yellowcustom focus:outline-none focus:ring-2 focus:ring-yellowcustom/40"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="shrink-0 rounded-lg bg-yellowcustom px-5 py-3 text-sm font-bold text-primary shadow-sm transition-all hover:bg-yellowcustom/85 motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary disabled:opacity-60"
          >
            {status === 'loading' ? t.sending : t.cta}
          </button>
        </form>
      )}
      {status === 'error' && <p className="mt-2 text-xs text-red-400">{t.error}</p>}
    </div>
  );
};

export default NewsletterInline;
