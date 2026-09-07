import { useEffect } from 'react';

const GA_MEASUREMENT_ID = 'G-PZ3WX1KF35';

/** Fires a GA4 page_view once the resolved title is known. */
export const usePageViewTracking = (title: string, asPath: string) => {
  useEffect(() => {
    // window.gtag is typed by the global Window augmentation in consentStorage.ts.
    if (typeof window !== 'undefined' && window.gtag && title) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        window.gtag?.('event', 'page_view', {
          page_title: title,
          page_location: window.location.href,
          page_path: asPath,
          send_to: GA_MEASUREMENT_ID,
        });
      }, 0);
    }
  }, [title, asPath]);
};
