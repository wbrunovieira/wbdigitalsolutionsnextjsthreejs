import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  href: string;
  /** Accessible label — defaults to the visible text. Pass a fuller, localized
   *  description (e.g. "Fale conosco no WhatsApp, abre em nova aba") when available. */
  ariaLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({ text, href, ariaLabel }) => {
  return (
    <div className={`${styles.container} mb-4 z-50`}>
      <div className={styles.btn}>
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel ?? text}>{text}</a>
      </div>
    </div>
  );
};
