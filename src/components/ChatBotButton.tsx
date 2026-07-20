import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { RiRobot2Fill } from 'react-icons/ri';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './ChatBotButton.module.css';
import { useChat } from './chat/useChat';
import ChatPanel from './chat/ChatPanel';

// Launcher affordance: robot icon + copy make clear this is an AI assistant
// (not a WhatsApp/phone chat). High-contrast amber pill (see the CSS module).
const LAUNCHER_COPY: Record<string, { aria: string; label: string }> = {
  'pt-BR': { aria: 'Abrir a assistente de IA da WB', label: 'Dúvidas? Fale com a IA' },
  en: { aria: "Open WB's AI assistant", label: 'Questions? Chat with our AI' },
  es: { aria: 'Abrir el asistente de IA de WB', label: '¿Dudas? Habla con la IA' },
  it: { aria: "Apri l'assistente IA di WB", label: "Domande? Chatta con l'IA" },
};

const ChatBotButton: React.FC = () => {
  const { language } = useLanguage();
  const chat = useChat();

  const [isOpen, setIsOpen] = useState(false);
  const [newMessageBadge, setNewMessageBadge] = useState(false);

  // Raw response time is a dev/analytics affordance only; expose with ?debug=1.
  const [isDebug, setIsDebug] = useState(false);
  useEffect(() => {
    setIsDebug(new URLSearchParams(window.location.search).get('debug') === '1');
  }, []);

  // Specific consent to send chat content to the third-party AI (see ChatComposer).
  const [chatConsent, setChatConsent] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('wb-chat-consent-v1') === 'true') {
      setChatConsent(true);
    }
  }, []);
  const acceptChatConsent = () => {
    try {
      localStorage.setItem('wb-chat-consent-v1', 'true');
    } catch {
      /* storage blocked — consent still applies for this session */
    }
    setChatConsent(true);
  };

  const launcherCopy =
    LAUNCHER_COPY[(language === 'pt' ? 'pt-BR' : language) as keyof typeof LAUNCHER_COPY] ?? LAUNCHER_COPY['pt-BR'];

  // First-visit nudge: auto-reveal the label pill for a few seconds, then
  // collapse and remember (so it only ever happens once per visitor).
  const [showNudge, setShowNudge] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem('wb-chat-nudge-v1') === 'seen') return;
    const showTimer = setTimeout(() => setShowNudge(true), 1200);
    const hideTimer = setTimeout(() => {
      setShowNudge(false);
      try {
        localStorage.setItem('wb-chat-nudge-v1', 'seen');
      } catch {
        /* storage blocked — nudge simply won't persist */
      }
    }, 5200);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Panel grows up out of the launcher (bottom-right origin). Reduced motion
  // gets a plain fade so no information is lost.
  useGSAP(() => {
    if (!isOpen || !modalRef.current) return;
    setNewMessageBadge(false);
    const reduce =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
      return;
    }
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scaleY: 0.5, scaleX: 0.7, y: 200, transformOrigin: 'bottom right' },
      { opacity: 1, scaleY: 1, scaleX: 1, y: 0, duration: 1, ease: 'elastic.out(1, 0.5)' },
    );
  }, { dependencies: [isOpen], scope: containerRef });

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen]);

  // Unread badge: flag when a bot message lands while the panel is closed (the
  // pacing loop in useChat can emit reply parts after the user closed it). The
  // useGSAP open effect clears it. Cleared here too if the user reopens.
  const prevMsgCount = useRef(0);
  useEffect(() => {
    const msgs = chat.messages;
    const last = msgs[msgs.length - 1];
    if (!isOpen && msgs.length > prevMsgCount.current && last && !last.isUser) {
      setNewMessageBadge(true);
    }
    prevMsgCount.current = msgs.length;
  }, [chat.messages, isOpen]);

  const toggleOpen = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', newState ? 'chat_opened' : 'chat_closed', {
        event_category: 'chat',
        event_label: 'chat_toggle',
        value: newState ? 1 : 0,
      });
    }
  };

  return (
    <div ref={containerRef}>
      <button
        ref={buttonRef}
        onClick={toggleOpen}
        className={`${styles.launcher} ${showNudge && !isOpen ? styles.nudge : ''} fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center p-3.5 sm:p-5 rounded-full shadow-lg`}
        aria-label={launcherCopy.aria}
      >
        <span className={styles.ring} aria-hidden="true" />
        <span className={styles.ring2} aria-hidden="true" />
        <span className={styles.iconWrap}>
          <RiRobot2Fill className="h-6 w-6 sm:h-7 sm:w-7" />
        </span>
        <span className={styles.label}>{launcherCopy.label}</span>
        {newMessageBadge && <span className="absolute top-0 right-0 h-3 w-3 bg-yellowcustom rounded-full"></span>}
      </button>

      {isOpen && (
        <ChatPanel
          panelRef={modalRef}
          launcherRef={buttonRef}
          onClose={() => setIsOpen(false)}
          messages={chat.messages}
          isTyping={chat.isTyping}
          responseTime={chat.responseTime}
          isDebug={isDebug}
          chatConsent={chatConsent}
          onAcceptConsent={acceptChatConsent}
          inputValue={chat.inputValue}
          setInputValue={chat.setInputValue}
          onSend={chat.sendMessage}
          handleKeyPress={chat.handleKeyPress}
        />
      )}
    </div>
  );
};

export default ChatBotButton;
