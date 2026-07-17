'use client';
import React from 'react';
import Link from 'next/link';
import ButtonStandard from '../ButtonStandard';
import AnimatedInput from '../AnimatedInput';
import AnimatedTextarea from '../AnimatedTextarea';
import { useTranslations } from '@/contexts/TranslationContext';
import type { PrivacyNotice } from '@/content/contact';

// The contact form (heading + fields + submit + privacy note). Controlled by
// Contact.tsx (#323): all field state and the submit handler live in the parent,
// so extracting this is a pure JSX move with no behavior change.
type ContactFormProps = {
  name: string;
  setName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  message: string;
  setMessage: (v: string) => void;
  honeypot: string;
  setHoneypot: (v: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  isSubmitted: boolean;
  privacyNotice: PrivacyNotice;
};

const ContactForm: React.FC<ContactFormProps> = ({
  name, setName, email, setEmail, message, setMessage,
  honeypot, setHoneypot, onSubmit, isSubmitting, isSubmitted, privacyNotice,
}) => {
  const currentMessages = useTranslations();
  return (
    <>
      <h2 className="bg-custom-purple inline-block rounded text-4xl px-4 py-2 font-bold mb-6">
        {currentMessages.getInTouch}
      </h2>
      <form className="w-full" onSubmit={onSubmit}>
        {/* Honeypot: visually hidden, bots fill it, humans don't */}
        <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <div className="mb-4 w-full">
          <AnimatedInput
            label={currentMessages.nameLabel}
            value={name}
            onChange={(value) => setName(value)}
            errorMessage={currentMessages.nameRequired}
            required
            name="name"
            disabled={isSubmitting || isSubmitted}
            skipValidation={isSubmitted}
          />
        </div>

        <div className="mb-4 w-full">
          <AnimatedInput
            label={currentMessages.enterEmail}
            value={email}
            onChange={(value) => setEmail(value)}
            errorMessage={currentMessages.validEmail}
            required
            type="email"
            name="email"
            disabled={isSubmitting || isSubmitted}
            skipValidation={isSubmitted}
          />
        </div>

        <div className="mb-4 w-full">
          <AnimatedTextarea
            label={currentMessages.messageLabel}
            value={message}
            onChange={(value) => setMessage(value)}
            errorMessage={currentMessages.messageRequired}
            required
            name="message"
            disabled={isSubmitting || isSubmitted}
            skipValidation={isSubmitted}
          />
        </div>

        <div className="w-full flex justify-start">
          <ButtonStandard
            buttonText={currentMessages.send2}
            type="submit"
            disabled={isSubmitting || isSubmitted}
            isLoading={isSubmitting}
          />
        </div>

        <p className="mt-4 text-xs leading-relaxed text-secondary/70">
          {privacyNotice.before}
          <Link
            href="/privacy-policy"
            className="text-yellowcustom underline decoration-yellowcustom/40 underline-offset-2 transition-colors hover:decoration-yellowcustom focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70"
          >
            {privacyNotice.link}
          </Link>
          {privacyNotice.after}
        </p>
      </form>
    </>
  );
};

export default ContactForm;
