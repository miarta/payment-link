'use client';

import Link from 'next/link';
import { ButtonPrimary } from '../ButtonPrimary';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="section" style={{ paddingTop: '140px', overflow: 'hidden' }}>
      <div className="mesh-bg">
        <div className="mesh-blob mesh-blob-1"></div>
        <div className="mesh-blob mesh-blob-2"></div>
        <div className="mesh-blob mesh-blob-3"></div>
      </div>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" 
              style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--primary)' }}></span>
              <span className="text-sm font-medium" style={{ color: 'var(--primary)' }}>Link Payment Tanpa Login</span>
            </div>
            <h1 className="font-bold mb-6 leading-tight text-gray-900">
              <span className="text-gradient text-5xl md:text-6xl block">
                Kirim Link
              </span>
              <span className="text-4xl md:text-5xl block mt-2">
                Uang Masuk Sekarang
              </span>
            </h1>
            <p className="text-xl text-gray mb-8 max-w-lg">
              Tanpa ribet. tanpa tunggu. Pelanggan bayar dalam hitungan detik.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/link">
                <ButtonPrimary className="animate-glow">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Buat Tautan Pembayaran
                </ButtonPrimary>
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-10 text-sm text-gray">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" style={{ color: 'var(--success)' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Gratis pakai</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" style={{ color: 'var(--success)' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Tidak perlu daftar</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" style={{ color: 'var(--success)' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Pembayaran instan</span>
              </div>
            </div>
          </div>
          <div className="animate-slide-up">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl blur-3xl opacity-40"
                style={{ 
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 50%, var(--accent) 100%)' 
                }}>
              </div>
              <Image src="https://ipaymu.com/wp-content/themes/ipaymu_v3/page-ID/static/assets/hero-img-high.png" alt="Hero Image" width={600} height={400} className="relative rounded-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}