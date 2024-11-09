"use client";
import React, { useState } from "react";
import ButtonStandard from "./ButtonStandard";
import { useTranslations } from "@/contexts/TranslationContext";

const EmailInput = () => {
    const currentMessages = useTranslations();
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setIsEmailValid(isValidEmail(value));
    };

    const handleBlur = () => {
        setIsEmailValid(isValidEmail(email));
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return emailRegex.test(email);
    };

    return (
        <div className="w-full flex flex-end flex-col relative">
            <div className="flex items-center gap-2">
                <input
                    type="email"
                    name="email"
                    placeholder={currentMessages.enterEmail}
                    required
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`flex-grow lg:w-[500px] xl:w-[400px] p-3 rounded-lg border ${
                        isEmailValid ? "border-gray-300" : "border-red-500"
                    } text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 ${
                        isEmailValid
                            ? "focus:ring-yellowcustom"
                            : "focus:ring-red-500"
                    } focus:border-transparent transition-colors duration-200 ease-in-out shadow-sm h-12`}
                />
                
            </div>

       
            {!isEmailValid && (
                <p className="absolute left-0 top-[calc(100%+4px)] text-red-500 text-sm">
                    {currentMessages.validEmail}
                </p>
            )}
             
        </div>
    );
};

export default EmailInput;
