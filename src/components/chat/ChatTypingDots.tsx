import React from 'react';
import { useTranslations } from '@/contexts/TranslationContext';
import AssistantBubble from './AssistantBubble';
import styles from '../ChatBotButton.module.css';

// Conventional three-dot "assistant is composing" indicator (replaces the old
// rotating-sentence text). Reduced-motion freezes it to three static dots.
const ChatTypingDots: React.FC = () => {
  const t = useTranslations();
  return (
    <AssistantBubble
      rowClassName="mb-2.5"
      bubbleClassName="px-3.5 py-3"
      bubbleProps={{ role: 'status', 'aria-label': t.chatTyping }}
    >
      <span className={styles.typing}>
        <i />
        <i />
        <i />
      </span>
    </AssistantBubble>
  );
};

export default ChatTypingDots;
