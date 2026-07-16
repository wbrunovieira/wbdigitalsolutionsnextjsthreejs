import React from 'react';
import Link from 'next/link';

// SSR/SSG in-content callout that routes authority from the /ai and /automation
// service pages into the "AI agents for business" blog pillar (first-link-priority;
// see docs/seo/2026-07-12-action-ai-agents-post.md). It MUST render server-side to be
// crawlable, so it lives in the page body, NOT inside the ssr:false 3D sections.
// Boxed with a blurred backdrop for legibility over the 3D model scrolling behind.

type InlineBlogLinkProps = {
  lead: string;
  anchor: string;
  href: string;
};

const InlineBlogLink: React.FC<InlineBlogLinkProps> = ({ lead, anchor, href }) => (
  <div className="relative z-10 mt-8 w-full px-6">
    <div className="mx-auto max-w-3xl rounded-2xl bg-primary/70 backdrop-blur-sm px-6 py-5 text-center shadow-lg">
      <p className="text-base sm:text-lg leading-relaxed text-white/90">
        {lead}{' '}
        <Link
          href={href}
          className="font-semibold text-yellow-400 underline decoration-2 underline-offset-4 rounded-sm transition-colors hover:text-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          {anchor}
        </Link>
      </p>
    </div>
  </div>
);

export default InlineBlogLink;
