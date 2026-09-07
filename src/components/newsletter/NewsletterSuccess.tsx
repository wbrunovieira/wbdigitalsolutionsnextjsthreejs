import React from 'react';
import { motion } from 'framer-motion';
import NewsletterInvite from '@/components/NewsletterInvite';
import { NewsletterPageContent } from '@/content/newsletterPage';

const NewsletterSuccess: React.FC<{ t: NewsletterPageContent }> = ({ t }) => (
  <motion.div
    key="success"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
    className="w-full bg-[#792990]/20 border border-[#792990]/40 rounded-2xl p-8 text-center"
  >
    <div className="text-5xl mb-4" aria-hidden="true">🎉</div>
    <h2 className="text-2xl font-bold text-white mb-2">{t.successTitle}</h2>
    <p className="text-white/60">{t.successMsg}</p>
    <NewsletterInvite />
  </motion.div>
);

export default NewsletterSuccess;
