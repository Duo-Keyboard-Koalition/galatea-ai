import './globals.css';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Galatea.AI - Your Perfect AI Girlfriend',
  description: 'Experience companionship and emotional support with personalized AI girlfriends',
  icons: {
    icon: '/favicon.png',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="fixed top-0 left-0 right-0 z-10 bg-ivory-100 shadow-md">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/favicon.png" alt="Galatea.AI Logo" width={40} height={40} />
              <span className="text-2xl font-bold text-earth-700">Galatea.AI</span>
            </Link>
            <div className="flex space-x-6">
              <Link 
                href="/sign-in"
                className="bg-rose-600 text-ivory-100 hover:bg-rose-700 px-4 py-2 rounded-md transition-colors"
              >
                Sign In
              </Link>
            </div>
          </nav>
        </header>
        <main className="pt-20 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
