import React from 'react';
import Link from 'next/link';

type PortalCardVariant = 'showcase' | 'tunnel';

interface CardTheme {
  card: string;
  overlay: string;
  emoji: string;
  title: string;
  enter: string;
  arrowWrap: string;
  arrow: string;
  glow: string;
}

const CARD_THEMES: Record<PortalCardVariant, CardTheme> = {
  showcase: {
    card: 'from-purple-900/20 to-purple-600/10 border-purple-500/20 hover:border-purple-400/50 hover:shadow-[0_0_50px_rgba(147,51,234,0.5)]',
    overlay: 'from-purple-600/5 via-transparent to-pink-600/5',
    emoji: 'text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300',
    title: 'group-hover:text-purple-300',
    enter: 'text-purple-400 group-hover:text-purple-300',
    arrowWrap: 'bg-purple-500/20 group-hover:bg-purple-500/40',
    arrow: 'text-purple-400',
    glow: 'from-purple-600 via-pink-600 to-purple-600',
  },
  tunnel: {
    card: 'from-yellow-900/20 to-yellow-600/10 border-yellow-500/20 hover:border-yellow-400/50 hover:shadow-[0_0_50px_rgba(255,185,71,0.5)]',
    overlay: 'from-yellow-600/5 via-transparent to-orange-600/5',
    emoji: 'text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300 group-hover:rotate-180',
    title: 'group-hover:text-yellow-300',
    enter: 'text-yellow-400 group-hover:text-yellow-300',
    arrowWrap: 'bg-yellow-500/20 group-hover:bg-yellow-500/40',
    arrow: 'text-yellow-400',
    glow: 'from-yellow-600 via-orange-600 to-yellow-600',
  },
};

interface PortalCardProps {
  variant: PortalCardVariant;
  href: string;
  icon: string;
  title: string;
  description: string;
  enterText: string;
}

/** Entry card linking to one of the immersive 3D experiences. */
const PortalCard: React.FC<PortalCardProps> = ({ variant, href, icon, title, description, enterText }) => {
  const theme = CARD_THEMES[variant];

  return (
    <Link href={href}>
      <div
        className={`portal-card group relative bg-gradient-to-br backdrop-blur-md rounded-3xl p-8 border transition-all duration-500 cursor-pointer transform-gpu ${theme.card}`}
      >
        <div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${theme.overlay}`}
        />

        <div className="relative z-10">
          <div className={theme.emoji} aria-hidden="true">{icon}</div>
          <h3 className={`text-3xl font-bold text-white mb-3 transition-colors ${theme.title}`}>
            {title}
          </h3>
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors mb-6">
            {description}
          </p>

          <div className="flex items-center justify-between">
            <span className={`font-bold text-lg ${theme.enter}`}>{enterText}</span>
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-2 ${theme.arrowWrap}`}
            >
              <svg className={`w-6 h-6 ${theme.arrow}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Glow Effect */}
        <div
          className={`absolute -inset-1 rounded-3xl bg-gradient-to-r opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500 ${theme.glow}`}
        />
      </div>
    </Link>
  );
};

export default PortalCard;
