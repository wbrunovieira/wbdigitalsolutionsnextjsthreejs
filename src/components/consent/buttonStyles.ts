const FOCUS_RING = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70';

/** Secondary action (Customize / Reject). */
export const GHOST_BUTTON =
  `rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-white/40 hover:text-white ${FOCUS_RING}`;

/** Primary action (Accept all). */
export const PRIMARY_BUTTON =
  `rounded-lg bg-gradient-to-r from-yellowcustom to-custom-purple px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-custom-purple/30 transition-transform hover:scale-105 ${FOCUS_RING}`;

/** Confirming a custom selection (Save preferences). */
export const OUTLINE_BUTTON =
  `rounded-lg border border-yellowcustom/60 px-4 py-2 text-sm font-semibold text-yellowcustom transition-colors hover:bg-yellowcustom hover:text-primary ${FOCUS_RING}`;

export const POLICY_LINK =
  `text-yellowcustom underline underline-offset-2 hover:text-yellowcustom/80 ${FOCUS_RING}`;
