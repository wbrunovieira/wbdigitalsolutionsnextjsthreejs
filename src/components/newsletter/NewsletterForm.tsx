import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { NewsletterPageContent } from '@/content/newsletterPage';
import { useNewsletterForm } from './useNewsletterForm';

const FIELD_BASE =
  'w-full bg-white/5 border rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#792990] transition-colors duration-200';

const borderFor = (hasError?: string) => (hasError ? 'border-red-400' : 'border-white/10');

type FormState = ReturnType<typeof useNewsletterForm>;

interface NewsletterFormProps {
  t: NewsletterPageContent;
  form: FormState;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ t, form }) => {
  const { name, setName, company, setCompany, email, setEmail, status, errors, setErrors, honeypot, setHoneypot, handleSubmit } = form;

  return (
    <motion.form
      key="form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.3 }}
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-4"
    >
      {/* Honeypot — off-screen, hidden from humans; bots fill it */}
      <input
        type="text"
        name="_hp_website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="flex flex-col gap-1">
        <input
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
          placeholder={t.namePlaceholder}
          className={`${FIELD_BASE} ${borderFor(errors.name)}`}
        />
        {errors.name && <span className="text-red-400 text-xs pl-1">{errors.name}</span>}
      </div>

      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder={t.companyPlaceholder}
        className={`${FIELD_BASE} ${borderFor()}`}
      />

      <div className="flex flex-col gap-1">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
          placeholder={t.emailPlaceholder}
          className={`${FIELD_BASE} ${borderFor(errors.email)}`}
        />
        {errors.email && <span className="text-red-400 text-xs pl-1">{errors.email}</span>}
      </div>

      <motion.button
        type="submit"
        disabled={status === 'loading'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-[#ffb947] hover:bg-[#ffb947]/90 text-[#350545] font-bold py-4 rounded-xl text-base transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
      >
        {status === 'loading' ? t.loading : t.cta}
      </motion.button>

      {status === 'error' && <p className="text-red-400 text-sm text-center">{t.errorMsg}</p>}

      <p className="text-white/30 text-xs text-center mt-1">
        {t.privacy}{' '}
        <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#792990]">
          {t.policyLink}
        </Link>
      </p>
    </motion.form>
  );
};

export default NewsletterForm;
