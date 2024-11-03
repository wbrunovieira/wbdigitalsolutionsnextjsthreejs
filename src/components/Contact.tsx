import React, { useState } from "react";
import { motion } from "framer-motion";
import ButtonStandard from "./ButtonStandard";
import EarthCanvas from "./canvas/Earth";
import { slideIn } from "../utils/motion";
import EmailInput from "./EmailInput";
import { useTranslations } from "@/contexts/TranslationContext";

const Contact: React.FC = () => {
    const [name, setName] = useState("");
    const [isNameValid, setIsNameValid] = useState(true);
    const [message, setMessage] = useState("");
    const [isMessageValid, setIsMessageValid] = useState(true);

    const currentMessages = useTranslations();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setIsNameValid(e.target.value.trim() !== "");
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        setIsMessageValid(e.target.value.trim() !== "");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const isFormValid = isNameValid && isMessageValid;
        if (isFormValid) {
            console.log("Form submitted", { name, message });
        } else {
            alert("Please fill out all fields correctly.");
        }
    };

    const inputClasses = (isValid: boolean) => `
        w-full 
        text-gray-700 
        mt-1 
        p-2 
        border 
        rounded 
        placeholder:text-secondary 
        focus:outline-none 
        focus:ring-2 
        ${isValid ? "border-gray-300" : "border-red-500"}
        ${isValid ? "focus:ring-yellowcustom" : "focus:ring-red-500"}
    `;

    return (
        <div className="flex flex-col md:flex-row gap-2">
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
                            <label className="block mb-4 w-full">
                                {currentMessages.nameLabel}
                                <input
                                    type="text"
                                    placeholder={
                                        currentMessages.namePlaceHolder
                                    }
                                    value={name}
                                    onChange={handleNameChange}
                                    onBlur={() =>
                                        setIsNameValid(name.trim() !== "")
                                    }
                                    className={inputClasses(isNameValid)}
                                />
                                {!isNameValid && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {currentMessages.nameRequired}
                                    </p>
                                )}
                            </label>

                            <label className="block mb-4 w-full">
                                {currentMessages.enterEmail}
                                <div className="flex items-center gap-2">
                                    <EmailInput />
                                </div>
                            </label>

                            <label className="block mb-4 w-full">
                                {currentMessages.messageLabel}
                                <textarea
                                    placeholder={
                                        currentMessages.messagePlaceHolder
                                    }
                                    value={message}
                                    onChange={handleMessageChange}
                                    onBlur={() =>
                                        setIsMessageValid(message.trim() !== "")
                                    }
                                    className={inputClasses(isMessageValid)}
                                    rows={2}
                                />
                                {!isMessageValid && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {currentMessages.messageRequired}
                                    </p>
                                )}
                            </label>

                            {/* Botão de Enviar */}
                            <div className="w-full flex justify-start">
                                <ButtonStandard
                                    buttonText={currentMessages.send}
                                />
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
