import React, { useState } from 'react';
import styles from './AnimatedField.module.css';

interface AnimatedInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string;
  required?: boolean;
  type?: 'text' | 'email';
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
  type = 'text',
  name,
  disabled = false,
  skipValidation = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const isEmail = type === 'email';
  const isValidEmail = isEmail
    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    : true;

  const hasError =
    !skipValidation && required && isTouched && (!value.trim() || (isEmail && !isValidEmail));
  const floated = isFocused || !!value;

  return (
    <div className="relative my-6 w-full">
      <input
        type={type}
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
        className={`peer ${styles.field} bg-transparent border-b-2 w-full py-4 text-lg text-white placeholder-transparent focus:outline-none transition-colors duration-300 ${
          hasError ? 'border-red-500' : 'border-white/40 focus:border-yellowcustom'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      <label htmlFor={name} className="absolute top-4 left-0 pointer-events-none">
        {label.split('').map((char, index) => (
          <span
            key={index}
            className={`inline-block transition-transform duration-300 ${
              hasError ? 'text-red-500' : 'text-secondary peer-focus:text-yellowcustom'
            } ${floated ? 'text-sm -translate-y-7' : 'text-lg translate-y-0'}`}
            // Cap the per-letter stagger so long labels don't lag on focus.
            style={{ transitionDelay: `${Math.min(index, 10) * 35}ms` }}
          >
            {char === ' ' ? ' ' : char}
          </span>
        ))}
        {required && (
          <span
            aria-hidden="true"
            className={`ml-0.5 inline-block transition-transform duration-300 ${
              hasError ? 'text-red-500' : 'text-yellowcustom'
            } ${floated ? 'text-sm -translate-y-7' : 'text-lg translate-y-0'}`}
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

export default AnimatedInput;
