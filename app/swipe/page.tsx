"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "@/lib/firebase";
import { recordSwipe } from "@/lib/matchService";
import { useAuth } from "@/components/AuthContext";

export default function SwipePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const [error, setError] = useState(null);

  // Check authentication and load profiles
  useEffect(() => {
    // If auth is still loading, wait
    if (authLoading) return;
    
    // If no user is authenticated, redirect to sign-in
    if (!user) {
      router.push('/sign-in');
      return;
    }
    
    // Load profiles
    const loadProfiles = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from your API
        const mockProfiles = [
          {
            id: '1',
            name: 'Mekkana',
            age: 25,
            bio: 'Creative artist with a passion for digital art and design.',
            imageUrl: '/girl-profiles/mekkana-profile.jpg',
          },
          {
            id: '2',
            name: 'Eliana',
            age: 23,
            bio: 'Bookworm who loves cozy evenings and philosophical discussions.',
            imageUrl: '/girl-profiles/eliana-profile.jpg',
          },
          {
            id: '3',
            name: 'Zara',
            age: 27,
            bio: 'Adventure seeker with a love for hiking and photography.',
            imageUrl: '/girl-profiles/zara-profile.jpg',
          }
        ];
        
        setProfiles(mockProfiles);
      } catch (error) {
        console.error("Error loading profiles:", error);
        setError("Failed to load profiles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    loadProfiles();
  }, [user, authLoading, router]);

  const handleSwipe = async (direction) => {
    if (!user || swiping || currentProfileIndex >= profiles.length) return;
    
    setSwiping(true);
    try {
      const currentProfile = profiles[currentProfileIndex];
      console.log(`Recording swipe ${direction} for profile ${currentProfile.id}`);
      
      // Record the swipe in Firestore
      await recordSwipe(user.uid, currentProfile.id, direction);
      
      // If it's a right swipe, show match notification
      if (direction === 'right') {
        setMatchFound(true);
        console.log(`Match created with ${currentProfile.name}`);
        setTimeout(() => {
          setMatchFound(false);
        }, 2000);
      }
      
      // Move to next profile
      setCurrentProfileIndex(prev => prev + 1);
    } catch (error) {
      console.error("Error recording swipe:", error);
      setError("Failed to record your preference. Please try again.");
    } finally {
      setSwiping(false);
    }
  };

  // Render loading state
  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
          <div className="text-2xl text-earth-800">Loading profiles...</div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-earth-800 mb-4">Something went wrong</h2>
          <p className="text-earth-600 mb-6">{error}</p>
          <Button 
            className="bg-rose-600 hover:bg-rose-700 text-white"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  // No more profiles to show
  const currentProfile = profiles[currentProfileIndex];
  if (!currentProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-earth-800 mb-4">No More Profiles</h2>
          <p className="text-earth-600 mb-6">You've seen all available profiles for now.</p>
          <div className="flex flex-col space-y-3">
            <Button 
              className="bg-rose-600 hover:bg-rose-700 text-white"
              onClick={() => router.push('/profile')}
            >
              Go to Profile
            </Button>
            <Button 
              variant="outline"
              className="border-rose-300 text-rose-600 hover:bg-rose-50"
              onClick={() => setCurrentProfileIndex(0)}
            >
              Start Over
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Main swipe interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-md mx-auto">
          {matchFound && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
              <div className="bg-white p-8 rounded-lg text-center animate-bounce">
                <h2 className="text-3xl font-bold text-rose-600 mb-2">It's a Match!</h2>
                <p className="text-earth-700">You matched with {currentProfile.name}</p>
              </div>
            </div>
          )}
          
          <Card className="overflow-hidden shadow-xl">
            <div className="relative h-96 w-full">
              <Image 
                src={currentProfile.imageUrl} 
                alt={currentProfile.name} 
                fill 
                style={{ objectFit: 'cover' }} 
                className="transition-opacity duration-300"
                onLoadingComplete={(img) => img.classList.remove('opacity-0')}
                priority
              />
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold text-earth-800">{currentProfile.name}, {currentProfile.age}</h2>
              </div>
              
              <p className="text-earth-600 mb-4">{currentProfile.bio}</p>
              
              <div className="flex justify-between">
                <Button 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full w-16 h-16 flex items-center justify-center text-2xl transition-transform duration-200 hover:scale-110"
                  onClick={() => handleSwipe('left')}
                  disabled={swiping}
                >
                  ✕
                </Button>
                
                <Button 
                  className="bg-rose-500 hover:bg-rose-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl transition-transform duration-200 hover:scale-110"
                  onClick={() => handleSwipe('right')}
                  disabled={swiping}
                >
                  ♥
                </Button>
              </div>
            </div>
          </Card>
          
          <div className="mt-6 flex justify-center space-x-4">
            <Button 
              variant="outline" 
              className="border-earth-300 text-earth-700 hover:bg-earth-50"
              onClick={() => router.push('/profile')}
            >
              View Profile
            </Button>
            
            <Button 
              variant="ghost" 
              className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
              onClick={() => router.push('/matches')}
            >
              View Matches
            </Button>
          </div>
          
          <div className="mt-4 text-center text-sm text-earth-500">
            Profile {currentProfileIndex + 1} of {profiles.length}
          </div>
        </div>
      </main>
    </div>
  );
}