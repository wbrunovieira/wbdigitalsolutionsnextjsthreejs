import { useRef, useState } from 'react';
import { NewsletterPageContent } from '@/content/newsletterPage';

export type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

/** Form state, validation and submission for the /newsletter landing page. */
export const useNewsletterForm = (t: NewsletterPageContent, lang: string) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  // Anti-bot: hidden honeypot field + page-load timestamp (see src/lib/formGuard.ts).
  const [honeypot, setHoneypot] = useState('');
  const loadTimeRef = useRef<number>(Date.now());

  const validate = () => {
    const newErrors: { name?: string; email?: string } = {};
    if (!name.trim()) newErrors.name = t.nameRequired;
    if (!email.trim()) newErrors.email = t.emailRequired;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          company,
          email,
          language: lang,
          _hp: honeypot,
          _t: loadTimeRef.current,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return {
    name,
    setName,
    company,
    setCompany,
    email,
    setEmail,
    status,
    errors,
    setErrors,
    honeypot,
    setHoneypot,
    handleSubmit,
  };
};
