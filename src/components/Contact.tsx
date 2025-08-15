"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ButtonStandard from "./ButtonStandard";
import EarthCanvas from "./canvas/Earth";
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

  const router = useRouter();

  const currentMessages = useTranslations();
  const { language } = useLanguage();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting || isSubmitted) {
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
          language: language, // Send current language
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

  return (
    <div className="flex flex-col md:flex-row gap-2 mt-32">
      <div className="bg-custom-gradient flex-1 text-white p-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={slideIn("left", "tween", 0.2, 1)}
          className="bg-custom-gradient rounded-lg shadow-md p-6"
        >
          <div className="flex flex-col items-start">
            <h2 className="bg-custom-purple inline-block rounded text-4xl px-4 py-2 font-bold mb-6">
              {currentMessages.getInTouch}
            </h2>
            <form className="w-full" onSubmit={handleSubmit}>
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

      <div className="flex-1 flex justify-center items-center min-h-[500px] md:min-h-[500px]" style={{ overflow: 'visible' }}>
        <EarthCanvas />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;