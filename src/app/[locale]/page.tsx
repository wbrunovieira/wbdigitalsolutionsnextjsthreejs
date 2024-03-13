'use client';
import { useTranslations } from 'next-intl';

import Home from '../../components/Home';

export default function Index() {
  const t = useTranslations('Index');

  return (
    <div>
      <Home />
    </div>
  );
}
