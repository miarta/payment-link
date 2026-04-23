export interface PaymentPage {
  id: string;
  slug: string;
  sellerName: string;
  sellerEmail: string;
  sellerPhone: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  productName: string;
  price: number;
  productImage?: string;
  expiry: Date;
  status: 'pending' | 'paid' | 'expired';
  createdAt: Date;
  paidAt?: Date;
}

export const paymentPages: Map<string, PaymentPage> = new Map();

export function createPaymentPage(data: Omit<PaymentPage, 'id' | 'createdAt' | 'status'>): PaymentPage {
  const page: PaymentPage = {
    ...data,
    id: Math.random().toString(36).substring(2, 10),
    createdAt: new Date(),
    status: 'pending',
  };
  paymentPages.set(data.slug, page);
  return page;
}

export function getPaymentPage(slug: string): PaymentPage | undefined {
  return paymentPages.get(slug);
}

export function updatePaymentPageStatus(slug: string, status: 'pending' | 'paid' | 'expired'): PaymentPage | undefined {
  const page = paymentPages.get(slug);
  if (page) {
    page.status = status;
    if (status === 'paid') {
      page.paidAt = new Date();
    }
    return page;
  }
  return undefined;
}