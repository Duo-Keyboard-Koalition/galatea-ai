import './globals.css';
import Image from 'next/image'; // Import Image from next/image
import Link from 'next/link'; // Import Link from next/link
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Galatea.AI - Your Perfect AI Girlfriend',
  description: 'Experience companionship and emotional support with personalized AI girlfriends',

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Navbar removed */}
        {children}
      </body>
    </html>
  )
}

