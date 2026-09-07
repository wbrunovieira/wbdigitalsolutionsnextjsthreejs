import React from 'react';
import { ShowcaseTexts } from '../data/showcaseTexts';

const DESKS: { desk: string; labelKey: 'navWebsites' | 'navAutomation' | 'navAi'; gradient: string }[] = [
  { desk: 'websites', labelKey: 'navWebsites', gradient: 'from-purple-600 to-purple-700 border-purple-400/30' },
  { desk: 'automation', labelKey: 'navAutomation', gradient: 'from-yellow-500 to-yellow-600 border-yellow-400/30' },
  { desk: 'ai', labelKey: 'navAi', gradient: 'from-blue-500 to-blue-600 border-blue-400/30' },
];

/** Mobile-only shortcuts that fly the camera to a desk (OfficeScene listens). */
const DeskShortcuts: React.FC<{ texts: ShowcaseTexts }> = ({ texts }) => (
  <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50 flex gap-3">
    {DESKS.map(({ desk, labelKey, gradient }) => (
      <button
        key={desk}
        onClick={() => window.dispatchEvent(new CustomEvent('navigateToDesk', { detail: desk }))}
        className={`bg-gradient-to-b ${gradient} text-white px-5 py-3 rounded-xl text-sm font-bold shadow-xl border active:scale-95 transition-transform`}
      >
        {texts[labelKey]}
      </button>
    ))}
  </div>
);

export default DeskShortcuts;
