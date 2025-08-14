"use client";
import React, { useState } from "react";
import { useTranslations } from "@/contexts/TranslationContext";

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, onChange, disabled = false }) => {
  const currentMessages = useTranslations();
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    onChange(emailValue);
    setIsEmailValid(isValidEmail(emailValue));
  };

  const handleBlur = () => {
    setIsEmailValid(isValidEmail(value));
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  return (
    <div className="w-full flex flex-col relative">
      <div className="flex items-center gap-2">
        <input
          type="email"
          name="email"
          placeholder={currentMessages.enterEmail}
          required
          value={value}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`flex-grow lg:w-[500px] xl:w-[400px] p-3 rounded-lg border ${
            isEmailValid ? "border-gray-300" : "border-red-500"
          } text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 ${
            isEmailValid ? "focus:ring-yellowcustom" : "focus:ring-red-500"
          } focus:border-transparent transition-colors duration-200 ease-in-out shadow-sm h-12 ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
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