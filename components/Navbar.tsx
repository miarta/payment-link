'use client';

import Image from 'next/image';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/30">
      <div className="container flex items-center justify-between h-[72px]">
        <Link href="/" className="flex items-center">
          <Image
            src="https://ipaymu.com/wp-content/themes/ipaymu_v2/assets/img/logo/ipaymu_blue_vvs.png"
            alt="iPaymu"
            width={120}
            height={40}
            className="h-12 w-auto"
          />
        </Link>
        <Link href="/link">
          <button className="btn btn-primary">
            Coba Sekarang
          </button>
        </Link>
      </div>
    </nav>
  );
}
