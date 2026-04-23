import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/landing/Hero';
import { Steps } from '@/components/landing/Steps';
import { Features } from '@/components/landing/Features';
import { CTASection } from '@/components/landing/CTASection';
import { FAQSection } from '@/components/landing/FAQSection';

const landingFaqs = [
  {
    question: 'Apa itu iPaymu Payment Link?',
    answer: 'iPaymu Payment Link adalah layanan tautan pembayaran digital yang memungkinkan Anda menerima pembayaran dari pelanggan dengan mudah melalui berbagai metode pembayaran.',
  },
  {
    question: 'Berapa biaya penggunaan layanan ini?',
    answer: 'Layanan iPaymu Payment Link Gratis untuk pembuatan tautan pembayaran. Biaya transaksi akan dikenakan sesuai dengan metode pembayaran yang dipilih.',
  },
  {
    question: 'Metode pembayaran apa saja yang tersedia?',
    answer: 'Kami mendukung Transfer Bank (BCA, Mandiri, BNI, BRI), E-Wallet (GoPay, OVO, Dana, ShopeePay), dan Kartu Kredit/debit.',
  },
  {
    question: 'Apakah saya perlu signup untuk menggunakan layanan ini?',
    answer: 'Tidak, Anda dapat membuat tautan pembayaran langsung tanpa perlu signup atau registrasi.',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col" style={{ background: 'var(--background)' }}>
      <Navbar />
      <Hero />
      <Steps />
      <Features />
      <CTASection />
      <FAQSection faqs={landingFaqs} />
      <Footer />
    </main>
  );
}