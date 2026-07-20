import React from 'react';
import { RiRobot2Fill, RiCloseLine } from 'react-icons/ri';
import { useTranslations } from '@/contexts/TranslationContext';
import styles from '../ChatBotButton.module.css';

interface ChatHeaderProps {
  onClose: () => void;
}

// Branded header: amber robot avatar (mirrors the launcher) + i18n title +
// honest status line (no SLA promise) + a real close button. Solid brand
// purple (not a gradient) keeps the amber avatar the sole accent.
const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  const t = useTranslations();
  return (
    <header className="flex items-center gap-3 px-4 py-3.5 bg-primary text-white">
      <span className={styles.avatar} aria-hidden="true">
        <RiRobot2Fill className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <h2 id="wb-chat-title" className="text-[0.95rem] font-semibold leading-tight tracking-tight">
          {t.chatTitle}
        </h2>
        <p className="mt-1 flex items-center gap-1.5 text-[0.7rem] font-medium text-white/60">
          <span className={styles.statusDot} aria-hidden="true" />
          {t.chatStatus}
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label={t.chatClose}
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom"
      >
        <RiCloseLine className="h-5 w-5" />
      </button>
    </header>
  );
};

export default ChatHeader;
