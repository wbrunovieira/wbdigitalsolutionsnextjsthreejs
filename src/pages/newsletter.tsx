import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import PageHead from "@/components/PageHead";
import { makeI18nStaticProps } from "@/lib/i18n";
import logo from "/public/svg/logo-white.svg";

const content = {
  "pt-BR": {
    badge: "Newsletter",
    headline: "Tecnologia e estratégia",
    headlineSub: "a serviço do seu negócio.",
    description:
      "Toda semana: insights sobre tecnologia, IA, automação e estratégia comercial para quem quer crescer sem complicar.",
    namePlaceholder: "Seu nome",
    companyPlaceholder: "Nome da empresa",
    emailPlaceholder: "Seu melhor e-mail",
    cta: "Quero receber",
    loading: "Enviando...",
    successTitle: "Obrigado! Você está dentro.",
    successMsg: "Cadastro realizado com sucesso. Em breve você receberá nossos conteúdos na sua caixa de entrada.",
    errorMsg: "Algo deu errado. Tente novamente.",
    privacy: "Sem spam. Cancele quando quiser.",
    backHome: "← Voltar para o site",
    nameRequired: "Nome é obrigatório",
    emailRequired: "E-mail é obrigatório",
  },
  en: {
    badge: "Newsletter",
    headline: "Technology and strategy",
    headlineSub: "at the service of your business.",
    description:
      "Every week: insights on technology, AI, automation and commercial strategy for those who want to grow without the complexity.",
    namePlaceholder: "Your name",
    companyPlaceholder: "Company name",
    emailPlaceholder: "Your best email",
    cta: "Subscribe now",
    loading: "Sending...",
    successTitle: "Thank you! You're in.",
    successMsg: "You're successfully subscribed. You'll receive our content in your inbox soon.",
    errorMsg: "Something went wrong. Please try again.",
    privacy: "No spam. Unsubscribe anytime.",
    backHome: "← Back to website",
    nameRequired: "Name is required",
    emailRequired: "Email is required",
  },
  es: {
    badge: "Newsletter",
    headline: "Tecnología y estrategia",
    headlineSub: "al servicio de tu negocio.",
    description:
      "Cada semana: insights sobre tecnología, IA, automatización y estrategia comercial para quienes quieren crecer sin complicaciones.",
    namePlaceholder: "Tu nombre",
    companyPlaceholder: "Nombre de la empresa",
    emailPlaceholder: "Tu mejor correo",
    cta: "Quiero recibirla",
    loading: "Enviando...",
    successTitle: "¡Gracias! Ya estás dentro.",
    successMsg: "Registro exitoso. Pronto recibirás nuestros contenidos en tu bandeja de entrada.",
    errorMsg: "Algo salió mal. Inténtalo de nuevo.",
    privacy: "Sin spam. Cancela cuando quieras.",
    backHome: "← Volver al sitio",
    nameRequired: "El nombre es obligatorio",
    emailRequired: "El correo es obligatorio",
  },
  it: {
    badge: "Newsletter",
    headline: "Tecnologia e strategia",
    headlineSub: "al servizio del tuo business.",
    description:
      "Ogni settimana: insight su tecnologia, IA, automazione e strategia commerciale per chi vuole crescere senza complicazioni.",
    namePlaceholder: "Il tuo nome",
    companyPlaceholder: "Nome dell'azienda",
    emailPlaceholder: "La tua migliore email",
    cta: "Voglio riceverla",
    loading: "Invio in corso...",
    successTitle: "Grazie! Sei dentro.",
    successMsg: "Iscrizione completata con successo. Presto riceverai i nostri contenuti nella tua casella di posta.",
    errorMsg: "Qualcosa è andato storto. Riprova.",
    privacy: "Niente spam. Cancellati quando vuoi.",
    backHome: "← Torna al sito",
    nameRequired: "Il nome è obbligatorio",
    emailRequired: "L'email è obbligatoria",
  },
};

// Per-locale static generation: prerender this page for every locale with
// the right messages available during SSR.
export const getStaticProps = makeI18nStaticProps();

export default function NewsletterPage() {
  const { language } = useLanguage();
  const lang = (language === "pt" ? "pt-BR" : language) as keyof typeof content;
  const t = content[lang] || content["pt-BR"];

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validate = () => {
    const newErrors: { name?: string; email?: string } = {};
    if (!name.trim()) newErrors.name = t.nameRequired;
    if (!email.trim()) newErrors.email = t.emailRequired;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, email, language: lang }),
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <PageHead customTitle="Newsletter | WB Digital Solutions" />

      <div className="min-h-screen bg-custom-gradient flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">

        {/* Glow blobs */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#792990]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-[#ffb947]/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-6 left-6"
        >
          <Link href="/" className="text-white/40 hover:text-white/80 text-sm transition-colors duration-200">
            {t.backHome}
          </Link>
        </motion.div>

        <div className="w-full max-w-lg flex flex-col items-center gap-8">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image src={logo} alt="WB Digital Solutions" width={160} height={48} priority />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="px-4 py-1.5 rounded-full border border-[#792990] bg-[#792990]/10 text-[#ffb947] text-xs font-semibold tracking-widest uppercase"
          >
            {t.badge}
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              {t.headline}
              <br />
              <span className="text-[#ffb947]">{t.headlineSub}</span>
            </h1>
            <p className="mt-4 text-white/60 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
              {t.description}
            </p>
          </motion.div>

          {/* Form / Success */}
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full bg-[#792990]/20 border border-[#792990]/40 rounded-2xl p-8 text-center"
              >
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-white mb-2">{t.successTitle}</h2>
                <p className="text-white/60">{t.successMsg}</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3 }}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-4"
              >
                {/* Name */}
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })); }}
                    placeholder={t.namePlaceholder}
                    className={`w-full bg-white/5 border ${errors.name ? "border-red-400" : "border-white/10"} rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#792990] transition-colors duration-200`}
                  />
                  {errors.name && <span className="text-red-400 text-xs pl-1">{errors.name}</span>}
                </div>

                {/* Company */}
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder={t.companyPlaceholder}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#792990] transition-colors duration-200"
                />

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })); }}
                    placeholder={t.emailPlaceholder}
                    className={`w-full bg-white/5 border ${errors.email ? "border-red-400" : "border-white/10"} rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#792990] transition-colors duration-200`}
                  />
                  {errors.email && <span className="text-red-400 text-xs pl-1">{errors.email}</span>}
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#ffb947] hover:bg-[#ffb947]/90 text-[#350545] font-bold py-4 rounded-xl text-base transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                >
                  {status === "loading" ? t.loading : t.cta}
                </motion.button>

                {status === "error" && (
                  <p className="text-red-400 text-sm text-center">{t.errorMsg}</p>
                )}

                <p className="text-white/30 text-xs text-center mt-1">{t.privacy}</p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
