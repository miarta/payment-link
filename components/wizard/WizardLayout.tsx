'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

interface StepperProps {
  steps: { title: string; description: string }[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2" style={{ background: 'var(--border)' }}></div>
        <div 
          className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 transition-all duration-500"
          style={{ 
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
            background: 'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)'
          }}
        ></div>
        {steps.map((step, index) => (
          <div key={index} className="relative z-10 flex flex-col items-center">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300"
              style={{ 
                background: index <= currentStep 
                  ? 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)' 
                  : 'white',
                color: index <= currentStep ? 'white' : 'var(--gray)',
                border: index <= currentStep ? 'none' : '2px solid var(--border)',
                boxShadow: index <= currentStep ? '0 4px 14px var(--primary-glow)' : 'none'
              }}
            >
              {index < currentStep ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <div className="absolute top-14 flex flex-col items-center w-32">
              <span className="text-sm font-semibold text-dark text-center">{step.title}</span>
              <span className="text-xs text-gray text-center mt-1">{step.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface WizardLayoutProps {
  children: ReactNode;
  currentStep: number;
  steps: { title: string; description: string }[];
}

export function WizardLayout({ children, currentStep, steps }: WizardLayoutProps) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ 
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)'
      }}>
        <div className="container flex items-center justify-between" style={{ height: '72px' }}>
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" 
                style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)' }}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <span className="text-xl font-bold text-dark">iPaymu</span>
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-dark mb-2">Buat Tautan Pembayaran</h1>
              <p className="text-gray">Isi data berikut untuk membuat tautan pembayaran</p>
            </div>
            
            <Stepper steps={steps} currentStep={currentStep} />
            
            <div className="card p-8">
              {children}
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-gray border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="container">
          <p>&copy; 2026 iPaymu. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}