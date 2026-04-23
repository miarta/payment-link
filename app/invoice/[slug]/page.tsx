'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@/components/Card';
import { StatusBadge } from '@/components/invoice/StatusBadge';

interface InvoiceData {
  status: 'pending' | 'paid' | 'expired';
  productName: string;
  price: number;
  buyerName: string;
  buyerEmail: string;
  paidAt?: string;
}

export default function InvoicePage() {
  const params = useParams();
  const [data, setData] = useState<InvoiceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetch(`/api/invoices/${params.slug}`);
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
    fetchInvoice();
  }, [params.slug]);

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
          <p className="text-[#6B7280]">Invoice not found</p>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#EFF6FF] py-20 px-6">
      <div className="max-w-lg mx-auto">
        <Card>
          <div className="text-center mb-6">
            <StatusBadge status={data.status} />
            <h1 className="text-2xl font-bold text-[#1F2937] mt-4">Invoice</h1>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <div className="flex justify-between py-2">
              <span className="text-[#6B7280]">Product</span>
              <span className="text-[#1F2937] font-medium">{data.productName}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#6B7280]">Amount</span>
              <span className="text-[#2563EB] font-bold">Rp {Number(data.price).toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#6B7280]">Buyer</span>
              <span className="text-[#1F2937]">{data.buyerName}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#6B7280]">Email</span>
              <span className="text-[#1F2937]">{data.buyerEmail}</span>
            </div>
            {data.paidAt && (
              <div className="flex justify-between py-2">
                <span className="text-[#6B7280]">Paid at</span>
                <span className="text-[#1F2937]">{new Date(data.paidAt).toLocaleString('id-ID')}</span>
              </div>
            )}
          </div>
        </Card>
      </div>
    </main>
  );
}