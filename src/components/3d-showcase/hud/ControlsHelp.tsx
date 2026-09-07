import React, { useState } from 'react';
import { ShowcaseTexts } from '../data/showcaseTexts';

const MOBILE_HINTS: { icon: string; key: 'touchDrag' | 'pinchZoom' | 'click' }[] = [
  { icon: '👆', key: 'touchDrag' },
  { icon: '🤏', key: 'pinchZoom' },
  { icon: '👈', key: 'click' },
];

/** Controls legend: a static panel on desktop, a toggled overlay on mobile. */
const ControlsHelp: React.FC<{ texts: ShowcaseTexts; isMobile: boolean }> = ({ texts, isMobile }) => {
  const [showControls, setShowControls] = useState(false);

  if (!isMobile) {
    return (
      <div className="absolute top-4 right-4 z-50 bg-black/50 backdrop-blur-sm text-white p-4 rounded-lg max-w-xs">
        <h3 className="font-bold mb-2">{texts.controls}</h3>
        <ul className="text-sm space-y-1">
          <li>• {texts.mouse}</li>
          <li>• {texts.scroll}</li>
          <li>• {texts.click}</li>
        </ul>
        <div className="mt-3 pt-3 border-t border-white/20">
          <p className="text-xs text-yellow-400">{texts.watch}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowControls(!showControls)}
        className="absolute bottom-4 right-4 z-50 bg-purple-600/80 text-white p-3 rounded-full shadow-lg"
        aria-label={texts.controls}
        aria-expanded={showControls}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {showControls && (
        <div className="absolute inset-0 z-40 bg-black/70 flex items-center justify-center p-4" onClick={() => setShowControls(false)}>
          <div className="bg-black/90 text-white p-6 rounded-xl max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">{texts.controls}</h3>
              <button onClick={() => setShowControls(false)} className="text-gray-400" aria-label={texts.controls}>
                ✕
              </button>
            </div>
            <ul className="text-sm space-y-2">
              {MOBILE_HINTS.map(({ icon, key }) => (
                <li key={key} className="flex items-start gap-2">
                  <span className="text-purple-400" aria-hidden="true">{icon}</span>
                  <span>{texts[key]}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-xs text-yellow-400">{texts.watch}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ControlsHelp;
