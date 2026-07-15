'use client';

import { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaLink, FaCheck } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

// "Invite friends" share block for the /newsletter page (mirrors BlogShare's
// pattern, dark-theme styled). Default = card variant for the success state;
// `subtle` = quiet row shown under the subscribe form.
const FALLBACK_URL = 'https://www.wbdigitalsolutions.com/newsletter';

const T: Record<string, {
  heading: string; sub: string; subtleLabel: string; message: string;
  emailSubject: string; copied: string;
  ariaWhatsapp: string; ariaCopy: string; ariaEmail: string;
}> = {
  'pt-BR': {
    heading: 'Conhece alguém que ia gostar?',
    sub: 'Convide e cresçam juntos: boas ideias rendem mais quando compartilhadas.',
    subtleLabel: 'Convide alguém que ia gostar',
    message: 'Assino a newsletter da WB Digital Solutions e recebo dicas práticas de tecnologia, IA e vendas toda semana. Achei que você ia curtir:',
    emailSubject: 'Acho que você vai gostar desta newsletter',
    copied: 'Link copiado!',
    ariaWhatsapp: 'Convidar pelo WhatsApp',
    ariaCopy: 'Copiar link da newsletter',
    ariaEmail: 'Convidar por e-mail',
  },
  en: {
    heading: 'Know someone who would love this?',
    sub: 'Invite them and grow together: good ideas do more when shared.',
    subtleLabel: 'Invite someone who would enjoy this',
    message: "I subscribe to the WB Digital Solutions newsletter and get practical tips on technology, AI and sales every week. Thought you'd enjoy it too:",
    emailSubject: 'I think you will like this newsletter',
    copied: 'Link copied!',
    ariaWhatsapp: 'Invite via WhatsApp',
    ariaCopy: 'Copy newsletter link',
    ariaEmail: 'Invite via email',
  },
  es: {
    heading: '¿Conoces a alguien a quien le encantaría?',
    sub: 'Invítalo y crezcan juntos: las buenas ideas rinden más cuando se comparten.',
    subtleLabel: 'Invita a alguien a quien le gustaría',
    message: 'Estoy suscrito a la newsletter de WB Digital Solutions y recibo consejos prácticos de tecnología, IA y ventas cada semana. Pensé que te gustaría:',
    emailSubject: 'Creo que esta newsletter te va a gustar',
    copied: '¡Enlace copiado!',
    ariaWhatsapp: 'Invitar por WhatsApp',
    ariaCopy: 'Copiar el enlace de la newsletter',
    ariaEmail: 'Invitar por correo',
  },
  it: {
    heading: 'Conosci qualcuno a cui piacerebbe?',
    sub: 'Invitalo e crescete insieme: le buone idee valgono di più condivise.',
    subtleLabel: 'Invita qualcuno a cui piacerebbe',
    message: 'Sono iscritto alla newsletter di WB Digital Solutions e ricevo consigli pratici su tecnologia, IA e vendite ogni settimana. Ho pensato potesse piacerti:',
    emailSubject: 'Credo che questa newsletter ti piacerà',
    copied: 'Link copiato!',
    ariaWhatsapp: 'Invita su WhatsApp',
    ariaCopy: 'Copia il link della newsletter',
    ariaEmail: 'Invita via email',
  },
};

interface Props {
  // subtle = quiet inline row (under the form). Default = full card (success state).
  subtle?: boolean;
}

const NewsletterInvite: React.FC<Props> = ({ subtle = false }) => {
  const { language } = useLanguage();
  const lang = language === 'pt' ? 'pt-BR' : language;
  const t = T[lang] ?? T['pt-BR'];
  const [copied, setCopied] = useState(false);

  const inviteUrl = () =>
    typeof window !== 'undefined' ? `${window.location.origin}/newsletter` : FALLBACK_URL;

  const whatsapp = () =>
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${t.message} ${inviteUrl()}`)}`,
      '_blank',
      'noopener,noreferrer',
    );

  const email = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(t.emailSubject)}&body=${encodeURIComponent(
      `${t.message}\n\n${inviteUrl()}`,
    )}`;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      /* clipboard blocked; no-op */
    }
  };

  const size = subtle ? 'h-10 w-10' : 'h-12 w-12';
  const btn = `flex ${size} items-center justify-center rounded-full text-white shadow-md transition-transform motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom focus-visible:ring-offset-2 focus-visible:ring-offset-primary`;

  const buttons = (
    <div className={`flex items-center justify-center ${subtle ? 'gap-3' : 'gap-4'}`}>
      <button type="button" onClick={whatsapp} aria-label={t.ariaWhatsapp} className={`${btn} bg-[#25D366]`}>
        <FaWhatsapp aria-hidden="true" className={subtle ? 'text-xl' : 'text-2xl'} />
      </button>
      <button type="button" onClick={copy} aria-label={t.ariaCopy} className={`${btn} border border-white/15 bg-white/10`}>
        {copied
          ? <FaCheck aria-hidden="true" className="text-lg text-yellowcustom" />
          : <FaLink aria-hidden="true" className={subtle ? 'text-base' : 'text-lg'} />}
      </button>
      <button type="button" onClick={email} aria-label={t.ariaEmail} className={`${btn} bg-[#792990]`}>
        <FaEnvelope aria-hidden="true" className={subtle ? 'text-lg' : 'text-xl'} />
      </button>
    </div>
  );

  if (subtle) {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-xs tracking-wide text-white/40">{t.subtleLabel}</p>
        {buttons}
        {copied && <p className="text-xs text-yellowcustom" role="status">{t.copied}</p>}
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6 text-center">
      <h3 className="text-lg font-bold text-white">{t.heading}</h3>
      <p className="mt-1 text-sm text-white/60">{t.sub}</p>
      <div className="mt-4">{buttons}</div>
      {copied && <p className="mt-3 text-sm text-yellowcustom" role="status">{t.copied}</p>}
    </div>
  );
};

export default NewsletterInvite;
