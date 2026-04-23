'use client';

import { InputHTMLAttributes, ReactNode } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function InputField({ label, error, className = '', ...props }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="label">{label}</label>
      <input
        className={`input ${error ? 'border-error' : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-sm text-error">{error}</span>}
    </div>
  );
}