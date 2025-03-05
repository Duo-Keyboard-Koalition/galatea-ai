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

const RootLayout: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
const RootLayout: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center fixed top-0 left-0 z-10 bg-white shadow-md">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/favicon.png" alt="Galatea.AI Logo" width={40} height={40} />
            <span className="text-2xl font-bold text-earth-700">Galatea.AI</span>
          </Link>
          <div className="flex space-x-6">
            <button 
              className="bg-red-600 text-ivory-100 hover:bg-red-700 px-4 py-2 rounded"
              onClick={() => alert('Sign In Popup!')}
            >
              Sign In
            </button>
              Sign In
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}

