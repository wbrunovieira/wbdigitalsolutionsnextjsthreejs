import React, { useState } from "react";

interface AnimatedTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string;
  required?: boolean;
  name: string;
  disabled?: boolean;
  skipValidation?: boolean;
}

const AnimatedTextarea: React.FC<AnimatedTextareaProps> = ({
  label,
  value,
  onChange,
  errorMessage,
  required = false,
  name,
  disabled = false,
  skipValidation = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const hasError = !skipValidation && required && isTouched && !value.trim();
  const floated = isFocused || !!value;

  return (
    <div className="relative my-6 w-full">
      <textarea
        name={name}
        value={value}
        id={name}
        disabled={disabled}
        required={required}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          setIsTouched(true);
        }}
        className={`peer bg-transparent border-b-2 w-full py-4 text-lg text-white resize-none focus:outline-none transition-colors duration-300 ${
          hasError ? "border-red-500" : "border-white/40 focus:border-yellowcustom"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        rows={4}
      />
      <label htmlFor={name} className="absolute top-4 left-0 pointer-events-none">
        {label.split("").map((char, index) => (
          <span
            key={index}
            className={`inline-block transition-transform duration-300 ${
              hasError ? "text-red-500" : "text-gray-300 peer-focus:text-yellowcustom"
            } ${floated ? "text-sm -translate-y-6" : "text-lg translate-y-0"}`}
            style={{ transitionDelay: `${Math.min(index, 10) * 35}ms` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
        {required && (
          <span
            aria-hidden="true"
            className={`ml-0.5 inline-block transition-transform duration-300 ${
              hasError ? "text-red-500" : "text-yellowcustom"
            } ${floated ? "text-sm -translate-y-6" : "text-lg translate-y-0"}`}
          >
            *
          </span>
        )}
      </label>
      {hasError && (
        <p id={`${name}-error`} role="alert" className="text-red-500 text-sm mt-2">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default AnimatedTextarea;
