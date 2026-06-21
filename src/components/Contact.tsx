"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ButtonStandard from "./ButtonStandard";
import dynamic from "next/dynamic";
const EarthCanvas = dynamic(() => import("./canvas/Earth"), { ssr: false, loading: () => <div className="w-full h-full" /> });
import { slideIn } from "../utils/motion";
import { useTranslations } from "@/contexts/TranslationContext";
import { useLanguage } from "@/contexts/LanguageContext";
import AnimatedInput from "./AnimatedInput";
import AnimatedTextarea from "./AnimatedTextarea";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const loadTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    loadTimeRef.current = Date.now();
  }, []);

  const router = useRouter();

  const currentMessages = useTranslations();
  const { language } = useLanguage();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting || isSubmitted) {
      return;
    }

    // Honeypot: bots fill hidden fields, humans don't
    if (honeypot) {
      return;
    }

    // Timing: reject submissions faster than 3 seconds (bots are instant)
    const elapsed = Date.now() - loadTimeRef.current;
    if (elapsed < 3000) {
      return;
    }

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error(currentMessages.fillAllFields || "Por favor, preencha todos os campos corretamente.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Track form submission in Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submit', {
          event_category: 'engagement',
          event_label: 'contact_form',
          value: 1
        });
      }

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          language: language,
          _hp: honeypot,
          _t: loadTimeRef.current,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Mark as submitted to prevent validation issues
        setIsSubmitted(true);
        
        toast.success(currentMessages.successSubmission || "Formulário enviado com sucesso!");
        
        // Clear form after a short delay to show success message
        setTimeout(() => {
          setName("");
          setEmail("");
          setMessage("");
        }, 500);

        // Redirect after toast is visible
        setTimeout(() => {
          router.push("/");
        }, 2500);
      } else {
        toast.error(currentMessages.errorSubmission || "Erro ao enviar o formulário. Tente novamente.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário", error);
      toast.error(currentMessages.errorSubmission || "Erro ao enviar o formulário. Tente novamente.");
      setIsSubmitting(false);
    }
  }

  // Earth drifts organically (and nudges behind the form on the little scroll we
  // have). We move the CANVAS WRAPPER via CSS transform so the 3D scene — spin
  // (autoRotate) + user drag (OrbitControls) — stays fully intact. Desktop only.
  const earthWrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
    const tick = () => {
      const el = earthWrapRef.current;
      if (el) {
        if (window.innerWidth < 768) {
          el.style.transform = "";
        } else {
          const t = performance.now() / 1000;
          // Map the page's (small) scroll range to a LARGE travel so it has impact.
          const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          const p = clamp(window.scrollY / maxScroll, 0, 1);
          const ease = p * p * (3 - 2 * p); // smoothstep
          // Quasi-random organic drift (incommensurate sine frequencies).
          const driftX = Math.sin(t * 0.5) * 32 + Math.sin(t * 0.23 + 1.3) * 20;
          const driftY = Math.cos(t * 0.42) * 24 + Math.sin(t * 0.17 + 0.6) * 15;
          // On scroll it sweeps far left + down and recedes (scale), drifting
          // behind the form for a clear, impactful motion.
          const sx = -ease * 760;
          const sy = ease * 130;
          const scale = 1 - ease * 0.18;
          el.style.transform = `translate3d(${(driftX + sx).toFixed(1)}px, ${(driftY + sy).toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative flex flex-col md:flex-row gap-2 mt-32 md:overflow-hidden">
      <div className="relative z-10 flex-1 text-white p-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={slideIn("left", "tween", 0.2, 1)}
          className="bg-primary/70 backdrop-blur-md rounded-lg shadow-md p-6"
        >
          <div className="flex flex-col items-start">
            <h2 className="bg-custom-purple inline-block rounded text-4xl px-4 py-2 font-bold mb-6">
              {currentMessages.getInTouch}
            </h2>
            <form className="w-full" onSubmit={handleSubmit}>
              {/* Honeypot: visually hidden, bots fill it, humans don't */}
              <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div className="mb-4 w-full">
                <AnimatedInput
                  label={currentMessages.nameLabel}
                  value={name}
                  onChange={(value) => setName(value)}
                  errorMessage={currentMessages.nameRequired}
                  required
                  name="name"
                  disabled={isSubmitting || isSubmitted}
                  skipValidation={isSubmitted}
                />
              </div>

              <div className="mb-4 w-full">
                <AnimatedInput
                  label={currentMessages.enterEmail}
                  value={email}
                  onChange={(value) => setEmail(value)}
                  errorMessage={currentMessages.validEmail}
                  required
                  type="email"
                  name="email"
                  disabled={isSubmitting || isSubmitted}
                  skipValidation={isSubmitted}
                />
              </div>

              <div className="mb-4 w-full">
                <AnimatedTextarea
                  label={currentMessages.messageLabel}
                  value={message}
                  onChange={(value) => setMessage(value)}
                  errorMessage={currentMessages.messageRequired}
                  required
                  name="message"
                  disabled={isSubmitting || isSubmitted}
                  skipValidation={isSubmitted}
                />
              </div>

              <div className="w-full flex justify-start">
                <ButtonStandard 
                  buttonText={isSubmitting ? "..." : currentMessages.send2} 
                  type="submit" 
                  disabled={isSubmitting || isSubmitted}
                />
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      <div
        ref={earthWrapRef}
        className="relative z-0 flex-1 flex justify-center items-center min-h-[500px] md:min-h-[500px] will-change-transform"
        style={{ overflow: 'visible' }}
      >
        <EarthCanvas />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;