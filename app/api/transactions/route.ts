import { NextRequest, NextResponse } from 'next/server';
import { getPaymentPage, updatePaymentPageStatus } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug } = body;
    
    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }
    
    const page = getPaymentPage(slug);
    
    if (!page) {
      return NextResponse.json({ error: 'Payment page not found' }, { status: 404 });
    }
    
    updatePaymentPageStatus(slug, 'paid');
    
    return NextResponse.json({
      payment_url: `/invoice/${slug}`,
      message: 'Transaction initiated successfully',
    });
  } catch {
    return NextResponse.json({ error: 'Failed to initiate transaction' }, { status: 500 });
  }
}