import React from 'react';
import { RiRobot2Fill } from 'react-icons/ri';
import styles from '../ChatBotButton.module.css';

// Shared shell for every assistant-side element (message, typing dots, welcome):
// the amber robot avatar + the tinted bubble. Keeps the one bubble look in a
// single place instead of copying the class string across three files.
const BUBBLE_SHELL = 'bg-primary/[0.04] text-gray-800 ring-1 ring-primary/10 rounded-2xl rounded-bl-md';

interface AssistantBubbleProps {
  children: React.ReactNode;
  align?: 'start' | 'end';
  rowClassName?: string;
  bubbleClassName?: string;
  rowLabel?: string;
  bubbleProps?: React.HTMLAttributes<HTMLDivElement>;
}

const AssistantBubble: React.FC<AssistantBubbleProps> = ({
  children,
  align = 'end',
  rowClassName = '',
  bubbleClassName = '',
  rowLabel,
  bubbleProps,
}) => (
  <div
    className={`flex gap-2 ${align === 'start' ? 'items-start' : 'items-end'} ${rowClassName}`}
    aria-label={rowLabel}
  >
    <span className={styles.msgAvatar} aria-hidden="true">
      <RiRobot2Fill className="h-3.5 w-3.5" />
    </span>
    <div className={`${BUBBLE_SHELL} ${bubbleClassName}`} {...bubbleProps}>
      {children}
    </div>
  </div>
);

export default AssistantBubble;
