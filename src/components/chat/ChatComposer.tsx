import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useTranslations } from '@/contexts/TranslationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from '../ChatBotButton.module.css';

// LGPD Art. 33, VIII: specific, highlighted consent before chat content is sent
// to the third-party AI provider (DeepSeek), which may be outside Brazil (incl. China).
const CHAT_CONSENT: Record<string, { title: string; body: string; accept: string }> = {
  'pt-BR': {
    title: 'Antes de começar',
    body: 'Suas mensagens são processadas por uma IA de terceiro (DeepSeek), que pode estar fora do Brasil, inclusive na China. Ao continuar, você concorda com esse tratamento.',
    accept: 'Concordar e conversar',
  },
  en: {
    title: 'Before we start',
    body: 'Your messages are processed by a third-party AI (DeepSeek), which may be outside Brazil, including in China. By continuing, you agree to this processing.',
    accept: 'Agree and chat',
  },
  es: {
    title: 'Antes de empezar',
    body: 'Tus mensajes son procesados por una IA de terceros (DeepSeek), que puede estar fuera de Brasil, incluso en China. Al continuar, aceptas este tratamiento.',
    accept: 'Aceptar y chatear',
  },
  it: {
    title: 'Prima di iniziare',
    body: "I tuoi messaggi sono elaborati da un'IA di terze parti (DeepSeek), che può trovarsi fuori dal Brasile, anche in Cina. Continuando, acconsenti a questo trattamento.",
    accept: 'Accetta e chatta',
  },
};

interface ChatComposerProps {
  chatConsent: boolean;
  onAcceptConsent: () => void;
  inputValue: string;
  setInputValue: (v: string) => void;
  onSend: (text?: string) => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  isTyping: boolean;
}

// Composer dock: the single hairline that separates the scrollable conversation
// from the input area. One fused input+send control; legal fine-print is pinned
// to the very bottom, demoted by size/color/centering (no second divider).
const ChatComposer: React.FC<ChatComposerProps> = ({
  chatConsent,
  onAcceptConsent,
  inputValue,
  setInputValue,
  onSend,
  handleKeyPress,
  isTyping,
}) => {
  const t = useTranslations();
  const { language } = useLanguage();
  const consentCopy =
    CHAT_CONSENT[(language === 'pt' ? 'pt-BR' : language) as keyof typeof CHAT_CONSENT] ?? CHAT_CONSENT['pt-BR'];

  // When consent is granted the accept button unmounts and the textarea mounts;
  // move focus to the field so a keyboard user can start typing right away.
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (chatConsent) inputRef.current?.focus();
  }, [chatConsent]);

  return (
    <div className="border-t border-gray-100 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      {chatConsent ? (
        <>
          {/* Input + send are ONE control: the bar owns the border/tint and
              lights up on focus-within; the amber send sits inside it. */}
          <div className={styles.composerBar}>
            <textarea
              ref={inputRef}
              rows={1}
              placeholder={t.placeholder}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              className={styles.composerField}
            />
            <button
              type="button"
              onClick={() => onSend()}
              disabled={!inputValue.trim() || isTyping}
              aria-label={t.sendButton}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full transition enabled:bg-yellowcustom enabled:text-primary enabled:hover:brightness-105 disabled:bg-primary/10 disabled:text-primary/30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-white"
            >
              <RiSendPlaneFill className="h-5 w-5" />
            </button>
          </div>
          {/* Micro-affordance tied to the input. */}
          <p className="mt-1.5 px-1 text-[0.68rem] text-gray-500">{t.chatEnterHint}</p>
        </>
      ) : (
        <div className="rounded-xl border border-custom-purple/25 bg-custom-purple/5 p-4">
          <p className="text-sm font-semibold text-primary">{consentCopy.title}</p>
          <p className="mt-1.5 text-[0.8rem] leading-relaxed text-gray-600">{consentCopy.body}</p>
          <button
            type="button"
            data-consent-accept
            onClick={onAcceptConsent}
            className="mt-3 w-full rounded-lg bg-custom-purple py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-custom-purple focus-visible:ring-offset-2"
          >
            {consentCopy.accept}
          </button>
        </div>
      )}

      {/* Legal fine-print: panel's bottom line, de-emphasized by size + color +
          centering. No competing divider (spacing carries the separation). */}
      <p className="mt-2.5 px-1 text-center text-[0.66rem] leading-snug text-gray-500">
        {t.chatbotPrivacyNote}{' '}
        <Link
          href="/privacy-policy"
          className="rounded-sm text-custom-purple/80 underline underline-offset-2 hover:text-custom-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-custom-purple"
        >
          {t.chatbotPrivacyLink}
        </Link>
        .
      </p>
    </div>
  );
};

export default ChatComposer;
