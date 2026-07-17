'use client';
import React, { useState } from 'react';
import { FiMail, FiPhone, FiCopy, FiCheck } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';
import type { CopyUi } from '@/content/contact';

// Direct contacts (WhatsApp / email / phone) with copy-to-clipboard. Extracted
// from Contact.tsx (#323); owns its own copy state.
type ContactDirectProps = {
  directLabel: string;
  phoneLabel: string;
  copyUi: CopyUi;
};

const ContactDirect: React.FC<ContactDirectProps> = ({ directLabel, phoneLabel, copyUi }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const handleCopy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1800);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — silently ignore.
    }
  };

  return (
    <div className="mt-8">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-yellowcustom">
        {directLabel}
      </p>
      <ul className="flex flex-col gap-3">
        {[
          { key: 'whatsapp', icon: <SiWhatsapp aria-hidden="true" />, label: 'WhatsApp', value: '+55 11 98286-4581', href: 'https://wa.me/5511982864581', external: true, primary: true },
          { key: 'email', icon: <FiMail aria-hidden="true" />, label: 'Email', value: 'bruno@wbdigitalsolutions.com', href: 'mailto:bruno@wbdigitalsolutions.com' },
          { key: 'phone', icon: <FiPhone aria-hidden="true" />, label: phoneLabel, value: '+55 11 5026-4203', href: 'tel:+551150264203' },
        ].map((c) => {
          const copied = copiedKey === c.key;
          return (
            <li
              key={c.key}
              className={`group flex items-center gap-4 rounded-xl border p-3.5 transition-colors duration-300 ${
                c.primary
                  ? 'border-yellowcustom/40 bg-yellowcustom/[0.07] hover:bg-yellowcustom/[0.12]'
                  : 'border-white/10 bg-white/5 hover:border-yellowcustom/30 hover:bg-white/[0.08]'
              }`}
            >
              <span
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-xl transition-colors duration-300 ${
                  c.primary
                    ? 'bg-yellowcustom text-primary'
                    : 'bg-custom-purple/30 text-yellowcustom group-hover:bg-yellowcustom group-hover:text-primary'
                }`}
              >
                {c.icon}
              </span>
              <a
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="min-w-0 flex-1"
              >
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary/60">
                  {c.label}
                </span>
                <span className="block truncate text-base font-semibold text-white transition-colors group-hover:text-yellowcustom md:text-lg">
                  {c.value}
                </span>
              </a>
              <button
                type="button"
                onClick={() => handleCopy(c.key, c.value)}
                aria-label={`${copied ? copyUi.copied : copyUi.copy}: ${c.value}`}
                title={copied ? copyUi.copied : copyUi.copy}
                className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70 ${
                  copied
                    ? 'border-green-400/50 text-green-400'
                    : 'border-white/15 text-secondary hover:border-yellowcustom/50 hover:text-yellowcustom'
                }`}
              >
                {copied ? <FiCheck /> : <FiCopy />}
                {copied && (
                  <span className="pointer-events-none absolute -top-7 right-0 whitespace-nowrap rounded bg-green-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow-lg">
                    {copyUi.copied}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ContactDirect;
