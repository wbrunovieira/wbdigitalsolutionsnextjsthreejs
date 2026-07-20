import React from 'react';
import { useTranslations } from '@/contexts/TranslationContext';
import AssistantBubble from './AssistantBubble';

// Hover inverts to a filled purple pill with a soft shadow + motion-safe lift,
// an unmistakable "clickable option" signal (transform/opacity/colors only).
const chipClass =
  'min-h-[40px] px-3.5 inline-flex items-center rounded-full border border-custom-purple/30 bg-custom-purple/[0.06] text-custom-purple text-[0.8rem] font-medium whitespace-nowrap ' +
  'transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out ' +
  'hover:bg-custom-purple hover:text-white hover:border-custom-purple hover:shadow-[0_6px_16px_-6px_rgba(121,41,144,0.6)] ' +
  'motion-safe:hover:-translate-y-0.5 active:translate-y-0 active:shadow-none ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-custom-purple focus-visible:ring-offset-1 ' +
  'disabled:opacity-50 disabled:pointer-events-none';

interface ChatWelcomeProps {
  onSend: (text?: string) => void;
}

// Empty-state greeting shown once the visitor has consented but before the
// first message, so the highest-intent moment isn't a blank box. The suggested
// prompts sit indented beneath the bubble so the whole block reads as one
// assistant turn. ChatPanel only mounts this while messages.length === 0, so
// the chips auto-hide once chatting begins.
const ChatWelcome: React.FC<ChatWelcomeProps> = ({ onSend }) => {
  const t = useTranslations();
  return (
    <div className="mb-4">
      <AssistantBubble
        align="start"
        bubbleClassName="max-w-[78%] px-3.5 py-2.5 text-[0.9rem] leading-relaxed"
      >
        <p className="font-semibold text-primary">{t.chatWelcomeGreeting}</p>
        <p className="mt-2 text-gray-700">{t.chatWelcomeBody}</p>
      </AssistantBubble>

      {/* Suggested prompts, indented to align under the bubble (avatar 1.5rem +
          gap 0.5rem = pl-8). Each click sends a natural-language message the bot
          fulfills (services -> knowledge base, schedule -> booking link,
          specialist -> WhatsApp handoff). */}
      <div className="mt-2.5 pl-8 flex flex-wrap gap-2" role="group" aria-label={t.chatSuggestions}>
        <button type="button" onClick={() => onSend(t.servicesMsg)} className={chipClass}>
          {t.services}
        </button>
        <button type="button" onClick={() => onSend(t.scheduleMsg)} className={chipClass}>
          {t.schedule}
        </button>
        <button type="button" onClick={() => onSend(t.specialistMsg)} className={chipClass}>
          {t.specialist}
        </button>
      </div>
    </div>
  );
};

export default ChatWelcome;
