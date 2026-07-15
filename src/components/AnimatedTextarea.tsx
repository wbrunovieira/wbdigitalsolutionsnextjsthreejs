import React, { useState } from 'react';
import styles from './AnimatedField.module.css';

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
        className={`peer ${styles.field} bg-transparent border-b-2 w-full py-4 text-lg text-white resize-none focus:outline-none transition-colors duration-300 ${
          hasError ? 'border-red-500' : 'border-white/40 focus:border-yellowcustom'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        rows={4}
      />
      {/* Words are grouped (each an inline-flex that won't break mid-word); the
          label flex-wraps only BETWEEN words. Keeps the per-letter float stagger. */}
      <label htmlFor={name} className="absolute top-4 left-0 pointer-events-none flex flex-wrap gap-x-[0.3em]">
        {(() => {
          let gi = -1;
          return label.split(' ').map((word, wi) => (
            <span key={wi} className="inline-flex">
              {word.split('').map((char) => {
                gi += 1;
                const idx = gi;
                return (
                  <span
                    key={idx}
                    className={`inline-block transition-transform duration-300 ${
                      hasError ? 'text-red-500' : 'text-secondary peer-focus:text-yellowcustom'
                    } ${floated ? 'text-sm -translate-y-7' : 'text-lg translate-y-0'}`}
                    style={{ transitionDelay: `${Math.min(idx, 10) * 35}ms` }}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          ));
        })()}
        {required && (
          <span
            aria-hidden="true"
            className={`inline-block transition-transform duration-300 ${
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

export default AnimatedTextarea;
