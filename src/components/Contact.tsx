'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { slideIn } from '../utils/motion';
import { useTranslations } from '@/contexts/TranslationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getAttribution } from '@/lib/attribution';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CONTACT_DIRECT, PHONE_LABEL, COPY_UI, SUCCESS_UI, PRIVACY_NOTICE } from '@/content/contact';
import ContactForm from './contact/ContactForm';
import ContactDirect from './contact/ContactDirect';
import ContactSuccess from './contact/ContactSuccess';
import ContactEarth from './contact/ContactEarth';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const loadTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    loadTimeRef.current = Date.now();
  }, []);

  const currentMessages = useTranslations();
  const { language } = useLanguage();
  const lang = language === 'pt' ? 'pt-BR' : language;
  const directLabel = CONTACT_DIRECT[lang] ?? CONTACT_DIRECT['pt-BR'];
  const copyUi = COPY_UI[lang] ?? COPY_UI['pt-BR'];
  const phoneLabel = PHONE_LABEL[lang] ?? PHONE_LABEL['pt-BR'];
  const successUi = SUCCESS_UI[lang] ?? SUCCESS_UI['pt-BR'];
  const privacyNotice = PRIVACY_NOTICE[lang] ?? PRIVACY_NOTICE['pt-BR'];

  // Reset back to a blank form so the user can send another message.
  const handleReset = () => {
    setIsSubmitted(false);
    setIsSubmitting(false);
    loadTimeRef.current = Date.now();
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting || isSubmitted) {
      return;
    }

    // Honeypot: bots fill hidden fields, humans don't
    if (honeypot) {
      return;
    }

    // Timing: reject submissions faster than 3 seconds (bots are instant)
    const elapsed = Date.now() - loadTimeRef.current;
    if (elapsed < 3000) {
      return;
    }

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error(currentMessages.fillAllFields || 'Por favor, preencha todos os campos corretamente.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Track form submission in Google Analytics
      // window.gtag is typed by the global Window augmentation in CookieConsent.tsx.
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submit', {
          event_category: 'engagement',
          event_label: 'contact_form',
          value: 1,
        });
      }

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          language: language,
          _hp: honeypot,
          _t: loadTimeRef.current,
          attribution: getAttribution(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Mark as submitted to prevent validation issues
        setIsSubmitted(true);

        toast.success(currentMessages.successSubmission || 'Formulário enviado com sucesso!');

        // Clear the underlying field values; the inline success panel (driven by
        // isSubmitted) replaces the form so the user gets a clear confirmation
        // and stays on the page (no redirect).
        setName('');
        setEmail('');
        setMessage('');
      } else {
        toast.error(currentMessages.errorSubmission || 'Erro ao enviar o formulário. Tente novamente.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário', error);
      toast.error(currentMessages.errorSubmission || 'Erro ao enviar o formulário. Tente novamente.');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative flex flex-col md:flex-row gap-2 mt-32 md:overflow-hidden overflow-x-clip">
      <div className="relative z-10 flex-1 text-white p-5 pt-2 md:p-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={slideIn('left', 'tween', 0.2, 1)}
          className="bg-primary/70 backdrop-blur-md border border-white/10 rounded-lg shadow-md p-6"
        >
          <div className="flex flex-col items-start">
            {isSubmitted ? (
              <ContactSuccess successUi={successUi} onReset={handleReset} />
            ) : (
              <ContactForm
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                message={message}
                setMessage={setMessage}
                honeypot={honeypot}
                setHoneypot={setHoneypot}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                isSubmitted={isSubmitted}
                privacyNotice={privacyNotice}
              />
            )}
          </div>
        </motion.div>

        {/* Direct contacts — also in the footer, surfaced here with copy-to-clipboard. */}
        <ContactDirect directLabel={directLabel} phoneLabel={phoneLabel} copyUi={copyUi} />
      </div>

      <ContactEarth />
      <ToastContainer />
    </div>
  );
};

export default Contact;
