import { NextRequest, NextResponse } from 'next/server';
import { getPaymentPage } from '@/lib/storage';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const page = getPaymentPage(slug);
  
  if (!page) {
    return NextResponse.json({ error: 'Payment page not found' }, { status: 404 });
  }
  
  if (new Date(page.expiry) < new Date() && page.status === 'pending') {
    return NextResponse.json({ error: 'Payment page expired' }, { status: 410 });
  }
  
  return NextResponse.json({
    productName: page.productName,
    price: page.price,
    sellerName: page.sellerName,
    expiry: page.expiry,
    status: page.status,
  });
}