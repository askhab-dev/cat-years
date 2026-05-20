import React, { useState, useRef, useEffect } from 'react';
import './NumericInput.css';

const formatNumber = (num: string): string => {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export interface NumericInputProps {
  value: string;
  onChange: (newValue: string) => void;
  imgPath?: string;
  label?: string;
  suffix?: string;
  className?: string;
}

export const NumericInput = (params: NumericInputProps) => {
  const { value, onChange, imgPath, label, suffix, className = '' } = params;
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, ''); // Только цифры

    onChange(raw);
  };

  useEffect(() => {
    // Динамическая ширина input
    if (measureRef.current && inputRef.current) {
      const formatted = formatNumber(value || '0');
      measureRef.current.textContent = formatted || '0';

      const contentWidth = measureRef.current.offsetWidth + 8;

      // Ограничение по ширине родительского контейнера
      const parentWidth = inputRef.current.parentElement?.clientWidth || 500;
      const newWidth = Math.max(72, Math.min(contentWidth, parentWidth));

      inputRef.current.style.width = `${newWidth}px`;
    }
  }, [value, suffix]);

  const formattedValue = formatNumber(value);
  const isFilled = value !== '';

  return (
    <div className={`input-container ${isFilled ? 'filled' : 'empty'} ${isFocused ? 'focused' : ''} ${className}`}>
      {imgPath && (
        <div className="avatar">
          <img src={imgPath} alt="Avatar" />
        </div>
      )}

      <div className="content">
        {label && <div className="title">{label}</div>}

        <div className="input-wrapper">
          <input
            ref={inputRef}
            type="text"
            placeholder="7"
            value={formattedValue}
            onChange={handleChange}
            className="numeric-input"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <span className="measure" ref={measureRef} aria-hidden="true" />
          {suffix && <div className="suffix">{suffix}</div>}
        </div>
      </div>
    </div>
  );
};
