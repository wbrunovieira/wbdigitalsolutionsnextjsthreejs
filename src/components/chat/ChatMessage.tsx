import React from 'react';
import { useTranslations } from '@/contexts/TranslationContext';
import AssistantBubble from './AssistantBubble';
import type { Message } from './useChat';

interface ChatMessageProps {
  msg: Message;
}

// User bubble is right-aligned purple; the assistant reuses the shared shell.
// Speaker is conveyed visually (alignment/avatar) and via aria-label; the user
// row is aria-live="off" so the polite region only announces assistant turns.
const ChatMessage: React.FC<ChatMessageProps> = ({ msg }) => {
  const t = useTranslations();

  if (msg.isUser) {
    return (
      <div className="flex flex-row-reverse mb-2.5" aria-label={t.you} aria-live="off">
        <div className="max-w-[78%] px-3.5 py-2.5 text-[0.9rem] leading-relaxed whitespace-pre-line bg-custom-purple text-white rounded-2xl rounded-br-md">
          {msg.text}
        </div>
      </div>
    );
  }

  return (
    <AssistantBubble
      rowClassName="mb-2.5"
      rowLabel={t.bot}
      bubbleClassName="max-w-[78%] px-3.5 py-2.5 text-[0.9rem] leading-relaxed whitespace-pre-line"
    >
      {msg.text}
    </AssistantBubble>
  );
};

export default ChatMessage;
