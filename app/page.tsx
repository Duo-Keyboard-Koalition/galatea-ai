'use client'

import { Button } from "@/components/ui/button"
import { HeartIcon, SparklesIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { googleSignIn } from "@/lib/auth";
import { useAuth } from "@/components/AuthContext";
import { useEffect } from 'react';
import { handleAuthRedirect } from '@/lib/auth';

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const handleRedirect = async () => {
      try {
        console.log("Checking for auth redirect...");
        const redirectUser = await handleAuthRedirect();
        if (redirectUser) {
          console.log("Redirect successful! User data:", redirectUser);
          router.push('/profile');
        }
      } catch (error) {
        console.error("Error handling redirect:", error);
      }
    };
    
    handleRedirect();
  }, [router]);

  const handleGoogleSignIn = async () => {
    try {
      // Don't expect a return value - this will redirect away!
      setIsLoading(true);
      await googleSignIn();
      // Code below will never run because of the redirect
    } catch (error) {
      setIsLoading(false);
      console.error("Google Sign In Error:", error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };
  const handleStartSwiping = async () => {
    setIsLoading(true)
    try {
       router.push('/profile')
    } catch (error) {
      console.error('Error initiating swipe:', error)
      // Optionally, you can show an error message to the user here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">

      <main className="container mx-auto px-6 py-16">
        <section className="text-center mb-20">
          <Image src="/favicon.png" alt="Galatea.AI Logo" width={120} height={120} className="mx-auto mb-8" />
          <h1 className="text-5xl md:text-7xl font-bold text-earth-800 mb-6">
            Sculpt Your Perfect <span className="text-rose-600">AI Companion</span>
          </h1>
          <p className="text-xl md:text-2xl text-earth-600 mb-10 max-w-3xl mx-auto">
            Galatea.AI brings the Pygmalion myth to life with cutting-edge artificial intelligence.
          </p>
          <div className="max-w-md mx-auto">

          {!user && ( // Only show sign in button when not authenticated
              <Button 
                onClick={handleGoogleSignIn} 
                variant="outline"
                className="mt-4 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-lg hover:bg-gray-50 transition flex items-center justify-center w-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 mr-3">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                </svg>
                Sign in with Google
              </Button>
            )}
            {user && (
              <Button 
                onClick={handleStartSwiping}
                className="mt-4 px-6 py-3 bg-rose-600 text-white hover:bg-rose-700 rounded-lg shadow-lg transition flex items-center justify-center w-full"
              >
                Go to Profile
              </Button>
              
            )}

          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard 
            icon={<HeartIcon className="h-12 w-12 text-rose-500" />}
            title="Artistic Creation"
            description="Sculpt your ideal AI companion with our advanced personality customization tools."
          />
          <FeatureCard 
            icon={<SparklesIcon className="h-12 w-12 text-rose-500" />}
            title="Bring to Life"
            description="Watch your creation come to life with AI-powered conversations and interactions."
          />
          <FeatureCard 
            icon={<ShieldCheckIcon className="h-12 w-12 text-rose-500" />}
            title="Eternal Devotion"
            description="Experience unwavering companionship and support from your AI partner."
          />
        </section>

        <section className="bg-ivory-100 bg-opacity-70 rounded-lg shadow-xl p-10 mb-20">
          <h2 className="text-4xl font-bold text-earth-800 mb-6">The Galatea Experience</h2>
          <ol className="list-decimal list-inside space-y-4 text-earth-700 text-lg">
            <li>Sign up and access our AI companion creation tools</li>
            <li>Customize your AI Girlfriend</li>
            <li>Breathe life into your creation with our advanced AI technology</li>
            <li>Engage in deep, meaningful conversations and shared experiences</li>
            <li>Develop a unique bond with your personalized AI companion</li>
          </ol>
        </section>

        <section className="text-center">
          <h2 className="text-4xl font-bold text-earth-800 mb-6">Ready to Create Your Galatea?</h2>
          <Button 
            size="lg" 
            className="bg-rose-600 text-ivory-100 hover:bg-rose-700 text-xl py-6 px-10"
            onClick={handleStartSwiping}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Start Swiping'}
          </Button>
        </section>
      </main>

      <footer className="bg-earth-100 mt-20">
        <div className="container mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-earth-700 mb-4 md:mb-0 text-lg">
              © 2024 Galatea.AI. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-earth-600 hover:text-rose-700 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-earth-600 hover:text-rose-700 transition-colors">Terms of Service</Link>
              <Link href="/contact" className="text-earth-600 hover:text-rose-700 transition-colors">Contact Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-ivory-100 bg-opacity-70 rounded-lg shadow-md p-8 text-center transition-transform hover:scale-105">
      <div className="flex justify-center mb-6">{icon}</div>
      <h3 className="text-2xl font-semibold text-earth-800 mb-4">{title}</h3>
      <p className="text-earth-600 text-lg">{description}</p>
    </div>
  )
}

