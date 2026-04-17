'use client';

const steps = [
  { 
    number: 1, 
    title: 'Isi Data', 
    description: 'Masukkan informasi Penjual dan Pembeli termasuk nama, email, dan nomor telepon.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  { 
    number: 2, 
    title: 'Tambah Produk & Harga', 
    description: 'Tambahkan nama produk, tentukan harga, dan Opsional masukkan gambar.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  },
  { 
    number: 3, 
    title: 'Bagikan & Terima Pembayaran', 
    description: 'Bagikan tautan pembayaran ke pelanggan dan terima pembayaran secara instan.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    )
  },
];

export function Steps() {
  return (
    <section className="section" style={{ background: 'var(--gray-light)', position: 'relative', overflow: 'hidden' }}>
      <div className="mesh-bg">
        <div className="mesh-blob mesh-blob-2" style={{ opacity: 0.3 }}></div>
      </div>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Cara Kerja</h2>
          <p className="text-xl text-gray max-w-2xl mx-auto">
            Mulai dalam tiga langkah mudah
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.number} 
              className={`card text-center p-8 animate-slide-up stagger-${index + 1}`}
              style={{ opacity: 0 }}
            >
              <div className="relative inline-flex mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
                    color: 'var(--primary)'
                  }}>
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ 
                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                    color: 'white'
                  }}>
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">{step.title}</h3>
              <p className="text-gray">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}