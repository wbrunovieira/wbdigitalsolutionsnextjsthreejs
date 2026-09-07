import React from 'react';

const ConsentToggle: React.FC<{ checked: boolean; disabled?: boolean; onChange?: (v: boolean) => void }> = ({ checked, disabled, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => onChange?.(!checked)}
    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full px-0.5 transition-colors ${
      checked ? 'bg-yellowcustom' : 'bg-white/20'
    } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70`}
  >
    <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);

export default ConsentToggle;
