'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonPrimaryProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function ButtonPrimary({ 
  children, 
  fullWidth, 
  variant = 'primary',
  className = '', 
  ...props 
}: ButtonPrimaryProps) {
  const baseStyles = 'btn';
  const variantStyles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'bg-transparent text-gray-600 hover:text-gray-900',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}