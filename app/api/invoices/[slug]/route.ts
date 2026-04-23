import { NextRequest, NextResponse } from 'next/server';
import { getPaymentPage } from '@/lib/storage';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const page = getPaymentPage(slug);
  
  if (!page) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
  }
  
  return NextResponse.json({
    status: page.status,
    productName: page.productName,
    price: page.price,
    buyerName: page.buyerName,
    buyerEmail: page.buyerEmail,
    paidAt: page.paidAt?.toISOString(),
  });
}