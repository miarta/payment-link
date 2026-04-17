'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PaymentLinkWizard } from '@/components/wizard/PaymentLinkWizard';
import { Card } from '@/components/Card';

export default function LinkPage() {
  const [successData, setSuccessData] = useState<{ slug: string; expiry: Date } | null>(null);

  if (successData) {
    const fullUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/pay/${successData.slug}`;
    
    return (
      <div className="min-h-screen bg-[#EFF6FF] flex flex-col">
        <Navbar />

        <main className="flex-1 pt-28 pb-16 px-6 flex items-center">
          <div className="max-w-lg mx-auto w-full">
            <Card className="p-8 md:p-10 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-[#1F2937] mb-2">Tautan Pembayaran Berhasil Dibuat!</h2>
              <p className="text-[#6B7280] mb-8">Tautan pembayaran Anda siap untuk dibagikan</p>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-[#6B7280] mb-2">Tautan pembayaran Anda:</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={fullUrl}
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm font-mono"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(fullUrl)}
                    className="px-4 py-3 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors font-medium"
                  >
                    Copy
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-[#6B7280] mb-6">
                Tautan berlaku hingga: {successData.expiry.toLocaleTimeString('id-ID')}
              </p>
              
              <a
                href={`/pay/${successData.slug}`}
                className="btn btn-primary w-full inline-flex items-center justify-center gap-2"
              >
                Buka Halaman Pembayaran
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return <PaymentLinkWizard onSuccess={(slug, expiry) => setSuccessData({ slug, expiry })} />;
}
