import React from 'react';

const SVG_CLASS = 'block h-16 sm:h-32 w-full';

/** Wave that hides the seam with the section above. */
export const TopDivider: React.FC = () => (
  <div className="absolute top-0 left-0 w-full z-0 pointer-events-none" aria-hidden="true">
    <svg className={SVG_CLASS} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1200 120">
      <path
        d="M321.39,56.68C161.77,83.28,0,110.54,0,110.54V0H1200v48.27
           C1108.74,57.71,905.87,77.73,724,77.73,545.19,77.73,497.75,30.54,321.39,56.68Z"
        className="fill-current text-primary"
      />
    </svg>
  </div>
);

/** Mirrored wave into the next section, tinted with the brand gradient. */
export const BottomDivider: React.FC = () => (
  <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none" aria-hidden="true">
    <svg className={SVG_CLASS} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1200 120">
      <defs>
        <linearGradient id="shape-divider-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#350545" />
          <stop offset="70%" stopColor="#350545" />
          <stop offset="100%" stopColor="#792990" />
        </linearGradient>
      </defs>
      <path
        d="M321.39,56.68C161.77,83.28,0,110.54,0,110.54V120H1200V71.73
           C1108.74,57.71,905.87,37.73,724,37.73,545.19,37.73,497.75,84.92,321.39,56.68Z"
        fill="url(#shape-divider-gradient)"
      />
    </svg>
  </div>
);
