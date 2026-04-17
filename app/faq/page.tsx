'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FAQSection } from '@/components/landing/FAQSection';

const faqs = [
  {
    question: 'Apa itu iPaymu Payment Link?',
    answer: 'iPaymu Payment Link adalah layanan tautan pembayaran digital yang memungkinkan Anda menerima pembayaran dari pelanggan dengan mudah melalui berbagai metode pembayaran seperti transfer bank, e-wallet, dan kartu kredit.',
  },
  {
    question: 'Bagaimana cara membuat tautan pembayaran?',
    answer: 'Anda dapat membuat tautan pembayaran dengan mengisi formulir di halaman Buat Tautan Pembayaran. Isi informasi produk, harga, dan detail penjual. Setelah selesai, Anda akan mendapatkan tautan yang bisa dibagikan ke pelanggan.',
  },
  {
    question: 'Berapa biaya penggunaan layanan ini?',
    answer: 'Layanan iPaymu Payment Link Gratis untuk pembuatan tautan pembayaran. Biaya transaksi akan dikenakan sesuai dengan metode pembayaran yang dipilih oleh pelanggan.',
  },
  {
    question: 'Metode pembayaran apa saja yang tersedia?',
    answer: 'Kami mendukung berbagai metode pembayaran termasuk Transfer Bank (BCA, Mandiri, BNI, BRI), E-Wallet (GoPay, OVO, Dana, ShopeePay), dan Kartu Kredit/debit.',
  },
  {
    question: 'Berapa lama tautan pembayaran berlaku?',
    answer: 'Setiap tautan pembayaran berlaku selama 15 menit setelah dibuat. Setelah expires, pelanggan perlu membuat tautan baru.',
  },
  {
    question: 'Bagaimana cara pelanggan melakukan pembayaran?',
    answer: 'Pelanggan cukup membuka tautan yang Anda bagikan, kemudian memilih metode pembayaran yang diinginkan dan menyelesaikan transaksi sesuai instruksi yang diberikan.',
  },
  {
    question: 'Apakah saya perlu mendaftar akun untuk menggunakan layanan ini?',
    answer: 'Tidak, Anda dapat membuat tautan pembayaran langsung tanpa perlu signup atau registrasi. Namun, untuk fitur tambahan dan riwayat transaksi, disarankan untuk membuat akun.',
  },
  {
    question: 'Bagaimana jika pembayaran gagal?',
    answer: 'Jika pembayaran gagal, pelanggan dapat mencoba kembali dengan metode pembayaran lain atau membuat tautan baru. Dana tidak akan terpotong jika transaksi gagal.',
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#EFF6FF] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-16 px-6">
        <FAQSection faqs={faqs} />

        <div className="max-w-3xl mx-auto text-center mt-12">
          <p className="text-[#6B7280] mb-4">Tidak menemukan jawaban yang Anda cari?</p>
          <a
            href="mailto:info@ipaymu.com"
            className="inline-flex items-center gap-2 text-[#2563EB] font-medium hover:underline"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Hubungi Kami
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
