import React from 'react';
import { ModalContent } from './types';

const SIZES = {
  desktop: { wrapper: 'hidden lg:flex gap-4 mt-4 justify-center', button: 'p-3', icon: 'w-5 h-5' },
  mobile: { wrapper: 'flex lg:hidden gap-4 justify-center my-3', button: 'p-2', icon: 'w-4 h-4' },
};

const BUTTON_BASE = 'bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all backdrop-blur-sm border border-white/10';

const PATHS = {
  previous: 'M15 19l-7-7 7-7',
  next: 'M9 5l7 7-7 7',
};

interface SlideNavProps {
  variant: keyof typeof SIZES;
  content: ModalContent;
  onPrevious: () => void;
  onNext: () => void;
}

/** Previous/next arrows: same pair, rendered once for desktop and once for mobile. */
const SlideNav: React.FC<SlideNavProps> = ({ variant, content, onPrevious, onNext }) => {
  const size = SIZES[variant];

  const arrow = (direction: keyof typeof PATHS, onClick: () => void) => (
    <button onClick={onClick} className={`${size.button} ${BUTTON_BASE}`} aria-label={content[direction]}>
      <svg className={size.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={PATHS[direction]} />
      </svg>
    </button>
  );

  return (
    <div className={size.wrapper}>
      {arrow('previous', onPrevious)}
      {arrow('next', onNext)}
    </div>
  );
};

export default SlideNav;
