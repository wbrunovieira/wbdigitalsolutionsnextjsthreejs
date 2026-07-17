'use client';
import React from 'react';
import Link from 'next/link';
import { FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import type { SuccessUi } from '@/content/contact';

// The post-submit confirmation panel that replaces the form. Extracted from
// Contact.tsx (#323).
type ContactSuccessProps = {
  successUi: SuccessUi;
  onReset: () => void;
};

const ContactSuccess: React.FC<ContactSuccessProps> = ({ successUi, onReset }) => (
  <div role="status" aria-live="polite" className="flex w-full flex-col items-center py-10 text-center">
    <span className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-green-500/15 text-green-400">
      <FiCheckCircle className="h-9 w-9" aria-hidden="true" />
    </span>
    <h2 className="mb-2 text-2xl font-bold text-white">{successUi.title}</h2>
    <p className="max-w-sm text-secondary">{successUi.body}</p>
    <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-yellowcustom px-6 py-3 text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-yellowcustom/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
      >
        <FiArrowLeft aria-hidden="true" /> {successUi.backHome}
      </Link>
      <button
        type="button"
        onClick={onReset}
        className="rounded-full px-4 py-2 text-sm font-medium text-secondary underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/60"
      >
        {successUi.sendAnother}
      </button>
    </div>
  </div>
);

export default ContactSuccess;
