"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const STORAGE_KEY = "wb-consent-v2"; // JSON: { analytics: bool, marketing: bool, ts }
const FB_PIXEL_ID = "1261665671358254";

type Prefs = { analytics: boolean; marketing: boolean };

const UI: Record<string, {
  bannerText: string;
  title: string;
  intro: string;
  alwaysOn: string;
  acceptAll: string;
  rejectAll: string;
  customize: string;
  save: string;
  cats: { necessary: [string, string]; analytics: [string, string]; marketing: [string, string] };
}> = {
  "pt-BR": {
    bannerText: "Usamos cookies para fazer o site funcionar, medir o tráfego e (com sua permissão) personalizar marketing. Você escolhe o que aceitar.",
    title: "Suas preferências de privacidade",
    intro: "Controle como coletamos e usamos seus dados neste site. Os cookies necessários são sempre ativos; os demais dependem da sua escolha.",
    alwaysOn: "Sempre ativo",
    acceptAll: "Aceitar tudo",
    rejectAll: "Recusar",
    customize: "Personalizar",
    save: "Salvar preferências",
    cats: {
      necessary: ["Necessários", "Essenciais para o site funcionar: idioma, segurança e envio de formulários. Não identificam você."],
      analytics: ["Análise", "Google Analytics e Vercel Analytics: páginas visitadas, dispositivo, origem do acesso e localização aproximada — para melhorar o site."],
      marketing: ["Marketing", "Facebook Pixel e Google Ads: medem campanhas e ajudam a mostrar anúncios relevantes. Só com seu consentimento."],
    },
  },
  en: {
    bannerText: "We use cookies to run the site, measure traffic and (with your permission) personalize marketing. You choose what to allow.",
    title: "Your privacy preferences",
    intro: "Control how we collect and use your data on this site. Necessary cookies are always on; the rest depend on your choice.",
    alwaysOn: "Always on",
    acceptAll: "Accept all",
    rejectAll: "Decline",
    customize: "Customize",
    save: "Save preferences",
    cats: {
      necessary: ["Necessary", "Essential for the site to work: language, security and form submissions. They don't identify you."],
      analytics: ["Analytics", "Google Analytics & Vercel Analytics: pages visited, device, traffic source and approximate location — to improve the site."],
      marketing: ["Marketing", "Facebook Pixel & Google Ads: measure campaigns and help show relevant ads. Only with your consent."],
    },
  },
  es: {
    bannerText: "Usamos cookies para que el sitio funcione, medir el tráfico y (con tu permiso) personalizar el marketing. Tú eliges qué aceptar.",
    title: "Tus preferencias de privacidad",
    intro: "Controla cómo recopilamos y usamos tus datos en este sitio. Las cookies necesarias siempre están activas; el resto depende de tu elección.",
    alwaysOn: "Siempre activo",
    acceptAll: "Aceptar todo",
    rejectAll: "Rechazar",
    customize: "Personalizar",
    save: "Guardar preferencias",
    cats: {
      necessary: ["Necesarias", "Esenciales para que el sitio funcione: idioma, seguridad y envío de formularios. No te identifican."],
      analytics: ["Análisis", "Google Analytics y Vercel Analytics: páginas visitadas, dispositivo, origen del acceso y ubicación aproximada — para mejorar el sitio."],
      marketing: ["Marketing", "Facebook Pixel y Google Ads: miden campañas y ayudan a mostrar anuncios relevantes. Solo con tu consentimiento."],
    },
  },
  it: {
    bannerText: "Usiamo i cookie per far funzionare il sito, misurare il traffico e (col tuo permesso) personalizzare il marketing. Scegli tu cosa accettare.",
    title: "Le tue preferenze sulla privacy",
    intro: "Controlla come raccogliamo e usiamo i tuoi dati su questo sito. I cookie necessari sono sempre attivi; gli altri dipendono dalla tua scelta.",
    alwaysOn: "Sempre attivo",
    acceptAll: "Accetta tutto",
    rejectAll: "Rifiuta",
    customize: "Personalizza",
    save: "Salva preferenze",
    cats: {
      necessary: ["Necessari", "Essenziali per il funzionamento del sito: lingua, sicurezza e invio dei moduli. Non ti identificano."],
      analytics: ["Analisi", "Google Analytics e Vercel Analytics: pagine visitate, dispositivo, origine del traffico e posizione approssimativa — per migliorare il sito."],
      marketing: ["Marketing", "Facebook Pixel e Google Ads: misurano le campagne e aiutano a mostrare annunci pertinenti. Solo col tuo consenso."],
    },
  },
};

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: any;
    _fbq?: any;
  }
}

function loadFacebookPixel() {
  if (typeof window === "undefined" || window.fbq) return;
  /* eslint-disable */
  (function (f: any, b, e, v, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n;
    n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v;
    s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */
  window.fbq("init", FB_PIXEL_ID);
  window.fbq("track", "PageView");
}

// Map granular prefs to Google Consent Mode v2 + load Pixel if marketing is on.
function applyConsent(prefs: Prefs) {
  window.gtag?.("consent", "update", {
    analytics_storage: prefs.analytics ? "granted" : "denied",
    ad_storage: prefs.marketing ? "granted" : "denied",
    ad_user_data: prefs.marketing ? "granted" : "denied",
    ad_personalization: prefs.marketing ? "granted" : "denied",
  });
  if (prefs.marketing) loadFacebookPixel();
}

function save(prefs: Prefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prefs, ts: Date.now() }));
  } catch {
    /* ignore */
  }
}

const Toggle: React.FC<{ checked: boolean; disabled?: boolean; onChange?: (v: boolean) => void }> = ({ checked, disabled, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => onChange?.(!checked)}
    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full px-0.5 transition-colors ${
      checked ? "bg-yellowcustom" : "bg-white/20"
    } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70`}
  >
    <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`} />
  </button>
);

const CookieConsent: React.FC = () => {
  const { language } = useLanguage();
  const lang = language === "pt" ? "pt-BR" : language;
  const t = UI[lang] ?? UI["pt-BR"];

  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    let stored: Prefs | null = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) stored = JSON.parse(raw);
    } catch {
      /* ignore */
    }
    if (stored) {
      applyConsent(stored);
    } else {
      setVisible(true);
    }
  }, []);

  const commit = (prefs: Prefs) => {
    save(prefs);
    applyConsent(prefs);
    setVisible(false);
  };

  if (!visible) return null;

  const cat = (key: "necessary" | "analytics" | "marketing", checked: boolean, onChange?: (v: boolean) => void, locked?: boolean) => (
    <div className="flex items-start gap-3 border-t border-white/10 py-3">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-white">{t.cats[key][0]}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-secondary/80">{t.cats[key][1]}</p>
      </div>
      {locked ? (
        <span className="shrink-0 whitespace-nowrap rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-secondary">
          {t.alwaysOn}
        </span>
      ) : (
        <Toggle checked={checked} onChange={onChange} />
      )}
    </div>
  );

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4">
      <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-[#1a0826] shadow-2xl backdrop-blur-md">
        {!expanded ? (
          <div className="p-4 sm:p-5 md:flex md:items-center md:gap-4">
            <p className="mb-3 text-sm leading-relaxed text-secondary md:mb-0 md:flex-1">{t.bannerText}</p>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button type="button" onClick={() => setExpanded(true)} className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70">
                {t.customize}
              </button>
              <button type="button" onClick={() => commit({ analytics: false, marketing: false })} className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70">
                {t.rejectAll}
              </button>
              <button type="button" onClick={() => commit({ analytics: true, marketing: true })} className="rounded-lg bg-gradient-to-r from-yellowcustom to-custom-purple px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-custom-purple/30 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70">
                {t.acceptAll}
              </button>
            </div>
          </div>
        ) : (
          <div className="max-h-[80vh] overflow-y-auto p-5">
            <h2 className="text-base font-bold text-white">{t.title}</h2>
            <p className="mt-1 text-xs leading-relaxed text-secondary/80">{t.intro}</p>
            <div className="mt-3">
              {cat("necessary", true, undefined, true)}
              {cat("analytics", analytics, setAnalytics)}
              {cat("marketing", marketing, setMarketing)}
            </div>
            <div className="mt-4 flex flex-wrap justify-end gap-2">
              <button type="button" onClick={() => commit({ analytics: false, marketing: false })} className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70">
                {t.rejectAll}
              </button>
              <button type="button" onClick={() => commit({ analytics, marketing })} className="rounded-lg border border-yellowcustom/60 px-4 py-2 text-sm font-semibold text-yellowcustom transition-colors hover:bg-yellowcustom hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70">
                {t.save}
              </button>
              <button type="button" onClick={() => commit({ analytics: true, marketing: true })} className="rounded-lg bg-gradient-to-r from-yellowcustom to-custom-purple px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-custom-purple/30 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellowcustom/70">
                {t.acceptAll}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
