'use client';

import Link from 'next/link';
import { ButtonPrimary } from '../ButtonPrimary';

export function CTASection() {
  return (
    <section className="section" style={{ background: 'var(--gray-light)', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A5F] to-[#0F172A]" />
            <div className="relative p-10 md:p-14 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Mulai Terima Pembayaran Sekarang
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                Buat tautan pembayaran pertama Anda dalam hitungan detik. Tanpa signup, tanpa biaya tersembunyi.
              </p>
              
              <Link href="/link">
                <ButtonPrimary 
                  className="bg-white text-[#3B82F6] hover:bg-gray-100 hover:scale-105 transform transition-all duration-300"
                  style={{ padding: '16px 40px', fontSize: '18px' }}
                >
                  Buat Tautan Pembayaran
                </ButtonPrimary>
              </Link>
              
              <div className="flex items-center justify-center gap-6 mt-8 text-white/70 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Gratis</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Tanpa Signup</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Instan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
