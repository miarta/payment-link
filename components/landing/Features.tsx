'use client';

const features = [
  { 
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Tanpa Login', 
    description: 'Buat tautan pembayaran tanpa perlu akun atau registrasi.',
  },
  { 
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Tautan Instan', 
    description: 'Buat dan bagikan tautan pembayaran dalam hitungan detik.',
  },
  { 
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Pembayaran Aman', 
    description: 'Didukung oleh iPaymu untuk pembayaran yang aman dan terpercaya.',
  },
  { 
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Faktur Email', 
    description: 'Pengiriman faktur otomatis ke pembeli dan penjual melalui email.',
  },
];

export function Features() {
  return (
    <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="mesh-bg">
        <div className="mesh-blob mesh-blob-1" style={{ opacity: 0.3 }}></div>
      </div>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Mengapa Memilih iPaymu?</h2>
          <p className="text-xl text-gray max-w-2xl mx-auto">
            Semua yang Anda butuhkan untuk menerima pembayaran dengan cepat dan aman
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className={`card p-6 text-center animate-fade-in stagger-${index + 1}`}
              style={{ opacity: 0 }}
            >
              <div className="inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-4"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
                  color: 'var(--primary)'
                }}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-dark mb-2">{feature.title}</h3>
              <p className="text-gray text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}