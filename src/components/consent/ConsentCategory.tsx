import React from 'react';
import { ConsentUI } from '@/content/consentUI';
import ConsentToggle from './ConsentToggle';

interface ConsentCategoryProps {
  t: ConsentUI;
  category: keyof ConsentUI['cats'];
  checked: boolean;
  onChange?: (v: boolean) => void;
  /** Necessary cookies cannot be switched off; they show a badge instead. */
  locked?: boolean;
}

const ConsentCategory: React.FC<ConsentCategoryProps> = ({ t, category, checked, onChange, locked }) => {
  const [title, description] = t.cats[category];

  return (
    <div className="flex items-start gap-3 border-t border-white/10 py-3">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-secondary/80">{description}</p>
      </div>
      {locked ? (
        <span className="shrink-0 whitespace-nowrap rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-secondary">
          {t.alwaysOn}
        </span>
      ) : (
        <ConsentToggle checked={checked} onChange={onChange} />
      )}
    </div>
  );
};

export default ConsentCategory;
