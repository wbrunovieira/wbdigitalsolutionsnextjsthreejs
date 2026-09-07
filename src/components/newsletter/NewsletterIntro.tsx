import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import logo from '/public/svg/logo-white.svg';
import { NewsletterPageContent } from '@/content/newsletterPage';

/** Logo, badge and headline block above the subscription form. */
const NewsletterIntro: React.FC<{ t: NewsletterPageContent }> = ({ t }) => (
  <>
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Image src={logo} alt="WB Digital Solutions" width={160} height={48} priority />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className="px-4 py-1.5 rounded-full border border-[#792990] bg-[#792990]/10 text-[#ffb947] text-xs font-semibold tracking-widest uppercase"
    >
      {t.badge}
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-center"
    >
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
        {t.headline}
        <br />
        <span className="text-[#ffb947]">{t.headlineSub}</span>
      </h1>
      <p className="mt-4 text-white/60 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
        {t.description}
      </p>
    </motion.div>
  </>
);

export default NewsletterIntro;
