'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
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

  const handlePay = async () => {
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
      alert('Failed to initiate payment');
    } finally {
      setIsPaying(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#EFF6FF] flex items-center justify-center">
        <p className="text-[#6B7280]">Loading...</p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-[#EFF6FF] flex items-center justify-center">
        <Card>
          <p className="text-[#6B7280]">Payment page not found</p>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#EFF6FF] py-20 px-6">
      <div className="max-w-lg mx-auto">
        <Card>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[#1F2937] mb-2">{data.productName}</h1>
            <p className="text-[#6B7280]">Sold by {data.sellerName}</p>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-[#6B7280] text-sm mb-2">Amount Due</p>
            <p className="text-4xl font-bold text-[#2563EB]">
              Rp {Number(data.price).toLocaleString('id-ID')}
            </p>
          </div>

          <div className="flex justify-center items-center gap-2 mb-6 text-sm text-[#6B7280]">
            <span>Expires in:</span>
            <CountdownTimer targetDate={data.expiry} />
          </div>

          <ButtonPrimary fullWidth onClick={handlePay} disabled={isPaying}>
            {isPaying ? 'Processing...' : 'Pay Now'}
          </ButtonPrimary>
        </Card>
      </div>
    </main>
  );
}