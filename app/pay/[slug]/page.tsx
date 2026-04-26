'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import QRCode from 'react-qr-code';
import { ButtonPrimary } from '@/components/ButtonPrimary';
import { Card } from '@/components/Card';
import { CountdownTimer } from '@/components/CountdownTimer';

interface PaymentPageData {
  productName: string;
  price: number;
  sellerName: string;
  expiry: Date;
}

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<PaymentPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'va_btn' | 'qris' | null>(null);
  const [step, setStep] = useState<'initial' | 'payment_info'>('initial');
  const [isSelectingMethod, setIsSelectingMethod] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('98166878713');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  useEffect(() => {
    const fetchPaymentPage = async () => {
      try {
        const response = await fetch(`/api/payment-pages/${params.slug}`);
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPaymentPage();
  }, [params.slug]);

  const handleSelectMethod = async (method: 'va_btn' | 'qris') => {
    setPaymentMethod(method);
    setIsSelectingMethod(true);
    // Simulate API call to generate VA or QRIS
    await new Promise(resolve => setTimeout(resolve, 800));
    setStep('payment_info');
    setIsSelectingMethod(false);
  };

  const handleConfirmPayment = async () => {
    setIsPaying(true);
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: params.slug }),
      });
      const result = await response.json();
      if (result.payment_url) {
        window.location.href = result.payment_url;
      } else {
        router.push(`/invoice/${params.slug}`);
      }
    } catch (error) {
      console.error(error);
      alert('Gagal memproses pembayaran');
    } finally {
      setIsPaying(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#EFF6FF] flex items-center justify-center">
        <p className="text-[#6B7280]">Memuat...</p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-[#EFF6FF] flex items-center justify-center">
        <Card>
          <p className="text-[#6B7280]">Halaman pembayaran tidak ditemukan</p>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F3F4F6] py-10 px-4 md:px-6 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Left Column - Order Summary */}
        <div className="bg-white p-8 md:p-12 w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-[#6B7280] font-medium text-lg mb-8">Pembayaran untuk</h2>
            <div className="flex items-center justify-between py-4 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  {/* Placeholder image icon */}
                  <svg className="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 8l3-3 2 2 3-4 2 5H8z" /></svg>
                </div>
                <div>
                  <h3 className="text-[#1F2937] font-medium leading-tight mb-1">{data.productName}</h3>
                  <p className="text-xs text-[#6B7280]">1 x Rp. {Number(data.price).toLocaleString('id-ID')}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-[#1F2937] text-sm whitespace-nowrap">Rp. {Number(data.price).toLocaleString('id-ID')}</p>
              </div>
            </div>
          </div>
          <div className="mt-12 flex justify-between items-end pt-6 border-t border-gray-100">
            <p className="text-[#1F2937] font-medium">Total</p>
            <p className="text-[#254EDC] font-bold text-3xl tracking-tight">Rp. {Number(data.price).toLocaleString('id-ID')}</p>
          </div>
        </div>

        {/* Right Column - Payment Methods */}
        <div className="bg-[#1C3699] p-8 md:p-12 w-full md:w-1/2 flex flex-col">
          {step === 'initial' ? (
            <>
              <h2 className="text-white font-medium text-xl mb-6">Metode Pembayaran</h2>

              <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {/* VA */}
                <button
                  onClick={() => handleSelectMethod('va_btn')}
                  disabled={isSelectingMethod}
                  className={`w-full flex items-center justify-between bg-white px-5 py-4 rounded-xl transition-transform cursor-pointer border border-transparent shadow-sm ${isSelectingMethod ? 'opacity-70' : 'hover:bg-gray-50 hover:scale-[1.01]'}`}
                >
                  <span className="text-[#1F2937] font-medium text-[15px]">Virtual Account (VA)</span>
                  <div className="flex items-center gap-3">
                    <Image src="/logo/btn.svg" alt="BTN" width={60} height={20} className="h-6 w-auto object-contain" />
                    {isSelectingMethod && paymentMethod === 'va_btn' ? (
                      <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                    ) : (
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    )}
                  </div>
                </button>

                {/* QRIS */}
                <button
                  onClick={() => handleSelectMethod('qris')}
                  disabled={isSelectingMethod}
                  className={`w-full flex items-center justify-between bg-white px-5 py-4 rounded-xl transition-transform cursor-pointer border border-transparent shadow-sm ${isSelectingMethod ? 'opacity-70' : 'hover:bg-gray-50 hover:scale-[1.01]'}`}
                >
                  <span className="text-[#1F2937] font-medium text-[15px]">QRIS</span>
                  <div className="flex items-center gap-3">
                    <Image src="/logo/qris.svg" alt="QRIS" width={60} height={20} className="h-6 w-auto object-contain" />
                    {isSelectingMethod && paymentMethod === 'qris' ? (
                      <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                    ) : (
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    )}
                  </div>
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-8">
                <button onClick={() => { setStep('initial'); setPaymentMethod(null); }} className="text-white hover:bg-white/20 p-2 -ml-2 rounded-full transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <h2 className="text-white font-medium text-xl">
                  {paymentMethod === 'va_btn' ? 'Virtual Account BTN' : 'Pembayaran QRIS'}
                </h2>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl mb-auto text-left relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                {paymentMethod === 'va_btn' && (
                  <div>
                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                      <Image src="/logo/btn.svg" alt="Bank BTN" width={80} height={30} className="h-8 w-auto object-contain" />
                      <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold border border-blue-100">Virtual Account</span>
                    </div>
                    <div className="mb-8">
                      <p className="text-sm text-[#6B7280] mb-2 font-medium">Nomor Virtual Account</p>
                      <div className="flex items-center justify-between bg-[#F8FAFC] p-5 rounded-xl border border-gray-200">
                        <p className="text-2xl font-mono font-bold text-[#1F2937] tracking-widest">98166878713</p>
                        <button
                          onClick={handleCopy}
                          className="text-blue-600 font-semibold text-sm hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors w-20 text-center"
                        >
                          {isCopied ? 'Tersalin!' : 'Salin'}
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1F2937] mb-4">Cara pembayaran via ATM BTN:</p>
                      <ol className="list-decimal list-inside text-sm text-[#4B5563] space-y-3 marker:text-blue-500 marker:font-medium">
                        <li>Masukkan Kartu ATM dan PIN Anda</li>
                        <li>Pilih <span className="font-medium text-gray-800">"Transaksi Lainnya"</span></li>
                        <li>Pilih <span className="font-medium text-gray-800">"Pembayaran" &gt; "Virtual Account"</span></li>
                        <li>Masukkan nomor VA di atas</li>
                        <li>Konfirmasi nominal dan selesaikan pembayaran</li>
                      </ol>
                    </div>
                  </div>
                )}

                {paymentMethod === 'qris' && (
                  <div className="flex flex-col items-center pt-2">
                    <div className="flex items-center justify-between w-full mb-6 pb-4 border-b border-gray-100">
                      <Image src="/logo/qris.svg" alt="QRIS" width={80} height={30} className="h-8 w-auto object-contain" />
                      <span className="text-[#6B7280] font-medium text-xs bg-gray-100 px-3 py-1 rounded-full">Mendukung Semua e-Wallet</span>
                    </div>
                    <div
                      className="relative w-full max-w-[320px] aspect-[3/4] mb-6 flex items-center justify-center mx-auto bg-center bg-no-repeat bg-contain"
                      style={{ backgroundImage: 'url(/logo/qris_template-5.png)' }}
                    >
                      <div className="w-[190px] h-[190px] transform translate-y-8">
                        <QRCode
                          size={256}
                          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                          value="00020101021226650013ID.CO.BTN.WWW011893600200116012000202154560301601200020303UKE51440014ID.CO.QRIS.WWW0215ID20264805995080303UKE5204601253033605409153470.005802ID5906IPAYMU6015JAKARTA SELATAN6105121906230051920260223225838735210703A0163040586"
                          viewBox={`0 0 256 256`}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-[#4B5563] text-center px-6 leading-relaxed">
                      Buka aplikasi mobile banking atau e-wallet Anda dan pindai kode QR untuk menyelesaikan pembayaran.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <div className="flex justify-between items-center px-4 py-3 bg-black/20 rounded-xl mb-4 backdrop-blur-sm border border-white/10">
                  <span className="text-blue-100 text-sm font-medium">Menunggu pembayaran...</span>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-100 text-sm">Berakhir dalam:</span>
                    <span className="text-white font-bold bg-black/30 px-2 py-0.5 rounded"><CountdownTimer targetDate={data.expiry} /></span>
                  </div>
                </div>

                <ButtonPrimary fullWidth onClick={handleConfirmPayment} disabled={isPaying} className="!text-white hover:opacity-90 shadow-xl py-4 font-bold text-lg border-2 border-transparent focus:border-white focus:ring-4 focus:ring-blue-500/30 transition-all">
                  {isPaying ? 'Memproses...' : 'Saya Sudah Menyelesaikan Pembayaran'}
                </ButtonPrimary>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}