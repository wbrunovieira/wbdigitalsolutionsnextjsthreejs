import React, { RefObject, useEffect, useRef } from 'react';
import { useTranslations } from '@/contexts/TranslationContext';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatTypingDots from './ChatTypingDots';
import ChatWelcome from './ChatWelcome';
import ChatComposer from './ChatComposer';
import { useFocusTrap } from './useFocusTrap';
import type { Message } from './useChat';

interface ChatPanelProps {
  panelRef: RefObject<HTMLDivElement>;
  launcherRef: RefObject<HTMLButtonElement>;
  onClose: () => void;
  messages: Message[];
  isTyping: boolean;
  responseTime: number | null;
  isDebug: boolean;
  chatConsent: boolean;
  onAcceptConsent: () => void;
  inputValue: string;
  setInputValue: (v: string) => void;
  onSend: (text?: string) => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

// Dialog shell: docks bottom-right (bottom-sheet on mobile), owns scroll +
// focus management. Presentation only; all chat logic lives in the parent hook.
const ChatPanel: React.FC<ChatPanelProps> = ({
  panelRef,
  launcherRef,
  onClose,
  messages,
  isTyping,
  responseTime,
  isDebug,
  chatConsent,
  onAcceptConsent,
  inputValue,
  setInputValue,
  onSend,
  handleKeyPress,
}) => {
  const t = useTranslations();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, true);

  // Auto-scroll rules: the user's own just-sent message ALWAYS scrolls into
  // view (they just acted and expect to see it + the typing indicator). Incoming
  // assistant parts only scroll when the user is already near the bottom, so
  // reading earlier messages isn't interrupted. Honors reduced-motion.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const sentByUser = messages[messages.length - 1]?.isUser === true;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    if (!sentByUser && !nearBottom) return;
    const reduce =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    messagesEndRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }, [messages, isTyping]);

  // Move focus into the panel on open; return it to the launcher on close.
  // Refs are stable, so this runs once per mount (open).
  useEffect(() => {
    const target = panelRef.current?.querySelector<HTMLElement>('textarea, [data-consent-accept]');
    target?.focus();
    return () => launcherRef.current?.focus();
  }, [panelRef, launcherRef]);

  return (
    <div className="fixed inset-x-0 bottom-0 sm:inset-x-auto sm:bottom-24 sm:right-4 md:right-6 z-40 flex justify-end p-0 sm:p-2 pointer-events-none">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="wb-chat-title"
        className="pointer-events-auto flex flex-col bg-white shadow-2xl overflow-hidden w-full max-h-[88vh] rounded-t-2xl sm:w-[400px] sm:max-w-[calc(100vw-2rem)] sm:rounded-2xl sm:max-h-[640px]"
      >
        <ChatHeader onClose={onClose} />

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 text-gray-700"
          aria-live="polite"
          aria-atomic="false"
        >
          {chatConsent && messages.length === 0 && !isTyping && <ChatWelcome onSend={onSend} />}
          {messages.map((msg, index) => (
            <ChatMessage key={index} msg={msg} />
          ))}
          {isTyping && <ChatTypingDots />}
          {responseTime != null && isDebug && (
            <div className="text-xs text-gray-400 text-center">
              {t.responseTime}:{' '}
              {responseTime < 1000 ? `${responseTime}ms` : `${(responseTime / 1000).toFixed(2)}s`}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <ChatComposer
          chatConsent={chatConsent}
          onAcceptConsent={onAcceptConsent}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSend={onSend}
          handleKeyPress={handleKeyPress}
          isTyping={isTyping}
        />
      </div>
    </div>
  );
};

export default ChatPanel;
