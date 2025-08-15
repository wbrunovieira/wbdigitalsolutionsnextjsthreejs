import Script from 'next/script';

const GA_TRACKING_ID = 'G-PZ3WX1KF35';
const AW_CONVERSION_ID = 'AW-802397591';

const GoogleAnalytics = () => {
  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
          
          gtag('config', '${AW_CONVERSION_ID}');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;

// Helper functions for tracking
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};