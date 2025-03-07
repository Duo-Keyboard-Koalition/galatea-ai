"use client";
import { useRouter } from "next/navigation";
import { googleSignIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthContext";
import { getAuth, getRedirectResult } from "firebase/auth";
import app from "@/lib/firebase";

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  
  // Check if user is already signed in
  useEffect(() => {
    if (user) {
      router.push('/');  // If already signed in, redirect to home page
    }
  }, [user, router]);

  // Handle redirect result when component mounts
  useEffect(() => {
    const auth = getAuth(app);
    
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          console.log("Sign-in successful, redirecting to home");
          router.push('/'); // Redirect to home after successful sign-in
        }
      } catch (error) {
        console.error("Redirect error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkRedirectResult();
  }, [router]);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await googleSignIn();
      // Code below won't execute due to redirect
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/girl-profiles/mekkana-banner.png')" }}>
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-4 text-earth-800">Sign in with Galatea AI</h1>
          <img src="/favicon.png" alt="Galatea AI Logo" className="mb-4 w-16 h-16" />
          <Button 
            onClick={handleGoogleSignIn} 
            variant="outline"
            disabled={isLoading}
            className="mt-4 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-lg hover:bg-gray-50 transition flex items-center justify-center w-full"
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </div>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 mr-3">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                </svg>
                Sign in with Google
              </>
            )}
          </Button>
        </div>
    </div>
  );
}