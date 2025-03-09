// In your sign-in/page.tsx file
"use client";
import { useRouter } from "next/navigation";
import { googleSignIn, handleAuthRedirect } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthContext";
import Image from "next/image";

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Check if user is already signed in
  useEffect(() => {
    if (user) {
      router.push('/swipe');
    }
  }, [user, router]);

  // Check for redirect result when page loads
  useEffect(() => {
    const checkRedirect = async () => {
      try {
        setIsLoading(true);
        const { user, success } = await handleAuthRedirect();
        if (success && user) {
          console.log("User found from redirect, navigating...");
          router.push('/swipe');
        }
      } catch (err) {
        console.error("Error handling redirect:", err);
        setError("Authentication failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    checkRedirect();
  }, [router]);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await googleSignIn();
      // This code won't execute due to page redirect
    } catch (err) {
      console.error("Error initiating sign in:", err);
      setError("Failed to start authentication. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full">
      <div 
        className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/girl-profiles/mekkana-banner.png')",
          backgroundSize: "cover"
        }}
      >
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex flex-col items-center">
            <Image src="/favicon.png" alt="Galatea AI Logo" width={80} height={80} className="mb-6" />
            <h1 className="text-2xl font-bold mb-6 text-earth-800">Sign in to Galatea AI</h1>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full text-center">
                {error}
              </div>
            )}
            
            <Button 
              onClick={handleGoogleSignIn} 
              variant="outline"
              disabled={isLoading}
              className="w-full px-6 py-5 bg-white text-gray-700 border border-gray-300 rounded-lg shadow hover:bg-gray-50 transition flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-t-2 border-b-2 border-rose-600 rounded-full animate-spin mr-2"></div>
              ) : (
                <Image src="/icons/google-icon.svg" alt="Google" width={20} height={20} className="mr-2" />
              )}
              {isLoading ? "Signing in..." : "Sign in with Google"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}