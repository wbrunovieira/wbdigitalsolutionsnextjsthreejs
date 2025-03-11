"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import ButtonStandard from "./ButtonStandard";
import EarthCanvas from "./canvas/Earth";
import { slideIn } from "../utils/motion";
import { useTranslations } from "@/contexts/TranslationContext";
import AnimatedInput from "./AnimatedInput";
import AnimatedTextarea from "./AnimatedTextarea";

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const currentMessages = useTranslations();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();


    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);

    formData.append("_captcha", "false");

    try {
      const response = await fetch(
        "https://formsubmit.co/bruno@wbdigitalsolutions.com",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Formulário enviado com sucesso!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        alert("Erro ao enviar o formulário. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário", error);
      alert("Erro ao enviar o formulário. Tente novamente.");
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
                />
              </div>

              <div className="w-full flex justify-start">
                <ButtonStandard buttonText={currentMessages.send} type="submit" />
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <EarthCanvas />
      </div>
    </div>
  );
};

export default Contact;