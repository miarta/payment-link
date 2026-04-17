'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { InputField } from '@/components/InputField';
import { ButtonPrimary } from '@/components/ButtonPrimary';
import { Card } from '@/components/Card';
import { ImageDropzone } from '@/components/ImageDropzone';

interface FormData {
  sellerName: string;
  sellerEmail: string;
  sellerPhone: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  productName: string;
  price: string;
  productImage: string;
  terms: boolean;
}

interface PaymentLinkWizardProps {
  onSuccess: (slug: string, expiry: Date) => void;
}

const STEPS = ['Info Penjual', 'Produk', 'Info Pembeli'];

export function PaymentLinkWizard({ onSuccess }: PaymentLinkWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    sellerName: '',
    sellerEmail: '',
    sellerPhone: '',
    buyerName: '',
    buyerEmail: '',
    buyerPhone: '',
    productName: '',
    price: '',
    productImage: '',
    terms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (value: string) => {
    setFormData((prev) => ({ ...prev, productImage: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.sellerName && formData.sellerEmail && formData.sellerPhone;
      case 1:
        return formData.productName && formData.price;
      case 2:
        return formData.buyerName && formData.buyerEmail && formData.buyerPhone;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!formData.terms) {
      alert('Silakan setujui syarat dan ketentuan');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/payment-pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      onSuccess(data.slug, new Date(data.expiry));
    } catch (error) {
      console.error(error);
      alert('Gagal membuat tautan pembayaran');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercent = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-[#EFF6FF] flex flex-col">
      <Navbar />

      <div className="fixed top-[72px] left-0 right-0 z-40 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((step, index) => (
              <span
                key={step}
                className={`text-sm font-medium transition-colors ${
                  index <= currentStep ? 'text-[#2563EB]' : 'text-gray-400'
                }`}
              >
                {step}
              </span>
            ))}
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <main className="flex-1 pt-40 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 md:p-8">
            {currentStep === 0 && (
              <div>
                <h2 className="text-xl font-semibold text-[#1F2937] mb-4">Informasi Penjual</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <InputField label="Nama" name="sellerName" required value={formData.sellerName} onChange={handleChange} />
                  <InputField label="Email" name="sellerEmail" type="email" required value={formData.sellerEmail} onChange={handleChange} />
                  <InputField label="Telepon" name="sellerPhone" type="tel" required value={formData.sellerPhone} onChange={handleChange} className="md:col-span-2" />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold text-[#1F2937] mb-4">Detail Produk</h2>
                <div className="space-y-4">
                  <InputField label="Nama Produk" name="productName" required value={formData.productName} onChange={handleChange} />
                  <InputField label="Harga" name="price" type="number" required value={formData.price} onChange={handleChange} />
                  <ImageDropzone value={formData.productImage} onChange={handleImageChange} />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold text-[#1F2937] mb-4">Informasi Pembeli</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <InputField label="Nama" name="buyerName" required value={formData.buyerName} onChange={handleChange} />
                  <InputField label="Email" name="buyerEmail" type="email" required value={formData.buyerEmail} onChange={handleChange} />
                  <InputField label="Telepon" name="buyerPhone" type="tel" required value={formData.buyerPhone} onChange={handleChange} className="md:col-span-2" />
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]"
                    />
                    <label className="text-[#6B7280] text-sm">
                      Saya setuju dengan syarat dan ketentuan
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-8">
              {currentStep > 0 && (
                <ButtonPrimary variant="secondary" onClick={handleBack} className="flex-1">
                  Kembali
                </ButtonPrimary>
              )}
              {currentStep < STEPS.length - 1 ? (
                <ButtonPrimary 
                  onClick={handleNext} 
                  disabled={!canProceed()}
                  className="flex-1"
                >
                  Lanjut
                </ButtonPrimary>
              ) : (
                <ButtonPrimary 
                  onClick={handleSubmit} 
                  disabled={isSubmitting || !canProceed() || !formData.terms}
                  className="flex-1"
                >
                  {isSubmitting ? 'Membuat...' : 'Buat Tautan Pembayaran'}
                </ButtonPrimary>
              )}
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
