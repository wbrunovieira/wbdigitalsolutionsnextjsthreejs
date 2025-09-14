import React, { useState } from "react";

interface AnimatedInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string;
  required?: boolean;
  type?: "text" | "email";
  name: string;
  disabled?: boolean;
  skipValidation?: boolean;
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({
  label,
  value,
  onChange,
  errorMessage,
  required = false,
  type = "text",
  name,
  disabled = false,
  skipValidation = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const isEmail = type === "email";
  const isValidEmail = isEmail
    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    : true;

  const hasError =
    !skipValidation && required && isTouched && (!value.trim() || (isEmail && !isValidEmail));

  return (
    <div className="relative my-5 w-full">
      <input
        type={type}
        name={name}  // Adicionado para o FormData
        value={value}
        id={name}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          setIsTouched(true);
        }}
        className={`peer bg-transparent border-b-2 w-full py-4 text-lg text-white placeholder-transparent focus:outline-none ${
          hasError ? "border-red-500" : "border-white focus:border-lightblue"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      />
      <label className="absolute top-4 left-0 pointer-events-none">
        {label.split("").map((char, index) => (
          <span
            key={index}
            className={`inline-block transition-transform duration-300 ${
              hasError
                ? "text-red-500"
                : "text-gray-500 peer-focus:text-lightblue"
            } ${
              isFocused || value
                ? "text-sm -translate-y-6"
                : "text-lg translate-y-0"
            }`}
            style={{
              transitionDelay: `${index * 50}ms`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </label>
      {hasError && (
        <p className="text-red-500 text-sm mt-2">
          {isEmail && !isValidEmail
            ? "Please enter a valid email address."
            : errorMessage}
        </p>
      )}
    </div>
  );
};

export default AnimatedInput;