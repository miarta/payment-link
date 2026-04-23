'use client';

import Link from 'next/link';
import { ButtonPrimary } from '../ButtonPrimary';
import Image from 'next/image';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ 
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.3)'
    }}>
      <div className="container flex items-center justify-between" style={{ height: '72px' }}>
        <Link href="/" className="flex items-center">
            <Image src="https://ipaymu.com/wp-content/themes/ipaymu_v2/assets/img/logo/ipaymu_blue_vvs.png" alt="iPaymu" width={220} height={40} className="h-12 w-auto" />
        </Link>
        <Link href="/link">
          <ButtonPrimary>Create Payment Link</ButtonPrimary>
        </Link>
      </div>
    </nav>
  );
}