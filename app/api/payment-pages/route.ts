import { NextRequest, NextResponse } from 'next/server';
import { createPaymentPage } from '@/lib/storage';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { sellerName, sellerEmail, sellerPhone, buyerName, buyerEmail, buyerPhone, productName, price, productImage } = body;
    
    if (!sellerName || !sellerEmail || !sellerPhone || !buyerName || !buyerEmail || !buyerPhone || !productName || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const uniqueId = Math.random().toString(36).substring(2, 8).toUpperCase();
    const productSlug = slugify(productName);
    const slug = `${productSlug}-${uniqueId}`;
    const expiry = new Date(Date.now() + 15 * 60 * 1000);
    
    createPaymentPage({
      slug,
      sellerName,
      sellerEmail,
      sellerPhone,
      buyerName,
      buyerEmail,
      buyerPhone,
      productName,
      price,
      productImage,
      expiry,
    });
    
    return NextResponse.json({
      slug,
      expiry: expiry.toISOString(),
      message: 'Payment page created successfully',
    });
  } catch {
    return NextResponse.json({ error: 'Failed to create payment page' }, { status: 500 });
  }
}