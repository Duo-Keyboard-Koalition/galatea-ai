"use client";

import Link from 'next/link';
import Image from 'next/image';


export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-ivory-100 shadow-md backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/favicon.png" alt="Galatea.AI Logo" width={40} height={40} className="rounded-md" />
            <span className="text-2xl font-bold text-earth-700">Galatea.AI</span>
          </Link>
          <div className="flex items-center space-x-4">
          </div>
        </div>
      </div>
    </div>
  );
}
