import { useEffect } from 'react';
import { useRouter } from 'next/router';

const GA_TRACKING_ID = 'G-PZ3WX1KF35';

export const usePageTracking = () => {
  const router = useRouter();

  useEffect(() => {
    // Track current page on mount
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const currentPath = router.asPath;
      
      console.log('[usePageTracking] Tracking page:', {
        path: currentPath,
        pathname: router.pathname,
        query: router.query,
        title: document.title
      });

      // Send page view event
      (window as any).gtag('event', 'page_view', {
        page_path: currentPath,
        page_title: document.title,
        page_location: window.location.href,
        send_to: GA_TRACKING_ID
      });
    }
  }, [router.asPath, router.pathname]);
};

// Helper function to track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    console.log('[GA Event]', { action, category, label, value });
    
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
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