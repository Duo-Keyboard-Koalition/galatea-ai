"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/components/AuthContext';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const { user, loading } = useAuth();
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-ivory-100 shadow-md backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/favicon.png" alt="Galatea.AI Logo" width={40} height={40} className="rounded-md" />
            <span className="text-2xl font-bold text-earth-700">Galatea.AI</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {loading ? (
              // Show loading indicator while auth state is being determined
              <div className="w-8 h-8 border-t-2 border-rose-500 border-solid rounded-full animate-spin"></div>
            ) : user ? (
              // User is signed in - show profile link
              <Button asChild variant="ghost" className="text-earth-700 hover:text-rose-600 hover:bg-rose-50">
                <Link href="/profile" className="flex items-center space-x-2">
                  {user.photoURL ? (
                    <Image 
                      src={user.photoURL} 
                      alt="Profile" 
                      width={24} 
                      height={24} 
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-sm">
                      {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                    </div>
                  )}
                  <span>Hi {user.displayName || user.email?.split('@')[0] || "there"}</span>
                </Link>
              </Button>
            ) : (
              // User is not signed in - show sign in link
              <Button asChild variant="ghost" className="text-earth-700 hover:text-rose-600 hover:bg-rose-50">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}