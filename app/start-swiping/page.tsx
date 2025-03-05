"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "@/lib/firebase";
import { getUserProfile } from "@/lib/userProfile";

export default function StartSwiping() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          // Get user profile data
          const userProfile = await getUserProfile(currentUser.uid);
          setProfile(userProfile);
        } catch (error) {
          console.error("Error loading profile:", error);
        }
      } else {
        // Redirect to sign-in if not authenticated
        router.push('/sign-in');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
        <div className="text-2xl text-earth-800">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-lg">
            <div className="flex flex-col items-center mb-8">
              <h1 className="text-4xl font-bold text-earth-800 mb-4">Welcome to Galatea.AI</h1>
              
              {user && (
                <div className="text-center mb-6">
                  <div className="text-xl font-medium text-earth-700">
                    Welcome, {user.displayName || user.email}!
                  </div>
                  <div className="text-sm text-earth-500 mt-1">
                    User ID: {user.uid}
                  </div>
                </div>
              )}
              
              {profile && profile.photoURL && (
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4 relative">
                  <Image 
                    src={profile.photoURL} 
                    alt="Profile" 
                    fill 
                    style={{ objectFit: 'cover' }} 
                  />
                </div>
              )}
              
              <p className="text-lg text-earth-600 text-center max-w-2xl">
                Your profile has been set up successfully! You're now ready to start swiping and find your perfect AI companion.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer">
                <h2 className="text-2xl font-bold text-rose-800 mb-2">Start Swiping</h2>
                <p className="text-rose-700 mb-4">
                  Browse through AI profiles and find your perfect match.
                </p>
                <Button className="bg-rose-600 hover:bg-rose-700 text-white">
                  Find Matches
                </Button>
              </Card>
              
              <Card className="p-6 bg-earth-50 hover:bg-earth-100 transition-colors cursor-pointer">
                <h2 className="text-2xl font-bold text-earth-800 mb-2">View Your Profile</h2>
                <p className="text-earth-700 mb-4">
                  Review and edit your profile information.
                </p>
                <Button className="bg-earth-600 hover:bg-earth-700 text-white" asChild>
                  <Link href="/profile-setup">Edit Profile</Link>
                </Button>
              </Card>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
