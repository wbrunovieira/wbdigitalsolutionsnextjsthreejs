import { useEffect } from 'react';
import { useRouter } from 'next/router';

const GA_TRACKING_ID = 'G-PZ3WX1KF35';

// Minimal typing for the GA4 `gtag` command shape this hook sends. The
// function itself is injected globally by the analytics setup in _document.
type GtagFn = (
  command: 'event',
  eventName: string,
  params: Record<string, unknown>,
) => void;

const getGtag = (): GtagFn | undefined => {
  if (typeof window === 'undefined') return undefined;
  return (window as Window & { gtag?: GtagFn }).gtag;
};

export const usePageTracking = () => {
  const router = useRouter();

  useEffect(() => {
    // Track current page on mount
    const gtag = getGtag();
    if (!gtag) return;

    // Send page view event
    gtag('event', 'page_view', {
      page_path: router.asPath,
      page_title: document.title,
      page_location: window.location.href,
      send_to: GA_TRACKING_ID,
    });
  }, [router.asPath, router.pathname]);
};

// Helper function to track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  const gtag = getGtag();
  if (!gtag) return;

  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track form submissions
export const trackFormSubmit = (formName: string) => {
  trackEvent('form_submit', 'engagement', formName);
};

// Track button clicks
export const trackButtonClick = (buttonName: string) => {
  trackEvent('button_click', 'engagement', buttonName);
};

// Track chat interactions
export const trackChatInteraction = (interactionType: string) => {
  trackEvent('chat_interaction', 'engagement', interactionType);
};
