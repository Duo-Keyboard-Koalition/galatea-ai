"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "@/lib/firebase";
import { recordSwipe } from "@/lib/matchService";

export default function SwipePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const [matchFound, setMatchFound] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Load profiles
        try {
          const response = await fetch('/api/profiles');
          const data = await response.json();
          setProfiles(data);
        } catch (error) {
          console.error("Error loading profiles:", error);
        }
      } else {
        // Redirect to sign-in if not authenticated
        router.push('/sign-in');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleSwipe = async (direction) => {
    if (!user || swiping || currentProfileIndex >= profiles.length) return;
    
    setSwiping(true);
    try {
      const currentProfile = profiles[currentProfileIndex];
      console.log(`Recording swipe ${direction} for profile ${currentProfile.uuid || currentProfile.id}`);
      
      // Use profile.uuid or profile.id as fallback
      const profileId = currentProfile.uuid || currentProfile.id;
      
      // Record the swipe in Firestore
      await recordSwipe(user.uid, profileId, direction);
      
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
      alert("There was an error. Please try again.");
    } finally {
      setSwiping(false);
    }
  };

  const currentProfile = profiles[currentProfileIndex];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
        <div className="text-2xl text-earth-800">Loading...</div>
      </div>
    );
  }

  if (!currentProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-earth-800 mb-4">No More Profiles</h2>
          <p className="text-earth-600 mb-6">You've seen all available profiles for now.</p>
          <Button 
            className="bg-rose-600 hover:bg-rose-700 text-white"
            onClick={() => router.push('/start-swiping')}
          >
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

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
              />
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold text-earth-800">{currentProfile.name}, {currentProfile.age}</h2>
              </div>
              
              <p className="text-earth-600 mb-4">{currentProfile.bio}</p>
              
              <div className="flex justify-between">
                <Button 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full w-16 h-16 flex items-center justify-center"
                  onClick={() => handleSwipe('left')}
                  disabled={swiping}
                >
                  ✕
                </Button>
                
                <Button 
                  className="bg-rose-500 hover:bg-rose-600 text-white rounded-full w-16 h-16 flex items-center justify-center"
                  onClick={() => handleSwipe('right')}
                  disabled={swiping}
                >
                  ♥
                </Button>
              </div>
            </div>
          </Card>
          
          <div className="mt-6 text-center">
            <Button 
              variant="outline" 
              className="text-earth-700"
              onClick={() => router.push('/start-swiping')}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
