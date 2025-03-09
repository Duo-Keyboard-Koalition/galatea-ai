"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
// Import the sidebar component
import SwipeSidebar from "@/components/SwipeSidebar";

interface Profile {
  id: string;
  name: string;
  age: number;
  bio: string;
  images: string[];
  interests?: string[];
  location?: string;
}

interface Match {
  id: string;
  profile: Profile;
  lastMessage?: {
    text: string;
    timestamp: string;
    read: boolean;
  };
}

export default function MatchesPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState<Match[]>([]);

  // Stats for sidebar
  const getStats = () => {
    return {
      newMatches: 2,
      messages: 2,
    };
  };

  useEffect(() => {
    // If auth is still loading, wait
    if (authLoading) return;

    // If no user is authenticated, redirect to sign in
    if (!user) {
      router.push('/sign-in');
      return;
    }

    // Fetch user's matches
    const fetchMatches = async () => {
      try {
        setLoading(true);
        // This would be a real API call in production
        // const response = await fetch(`/api/matches?userId=${user.uid}`);
        // const data = await response.json();
        // setMatches(data.matches || []);

        // For demonstration, setting mock data
        setMatches([
          {
            id: "1",
            profile: {
              id: "101",
              name: "Emma",
              age: 28,
              bio: "Love hiking and nature photography.",
              images: ["/profiles/emma1.jpg"],
              interests: ["Photography", "Hiking", "Travel"],
              location: "Seattle, WA",
            },
            lastMessage: {
              text: "Hey, how's it going?",
              timestamp: "10:30 AM",
              read: false,
            },
          },
          {
            id: "2",
            profile: {
              id: "102",
              name: "Michael",
              age: 30,
              bio: "Coffee enthusiast and tech lover.",
              images: ["/profiles/michael1.jpg"],
              interests: ["Coffee", "Technology", "Music"],
              location: "Portland, OR",
            },
            lastMessage: {
              text: "Nice to meet you!",
              timestamp: "Yesterday",
              read: true,
            },
          },
        ]);
      } catch (error) {
        console.error("Error loading matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [user, authLoading, router]);

  // Authentication loading state
  if (authLoading || loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
          <div className="text-2xl text-earth-800">Loading matches...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100 absolute top-0 left-0">
      {/* Include the sidebar */}
      <SwipeSidebar stats={getStats()} />
      
      <div className="flex-1 flex flex-col h-full">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-earth-800 mb-6">My Matches</h1>
          
          {matches.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="text-5xl mb-4">💔</div>
              <h2 className="text-2xl font-bold text-earth-800 mb-2">No Matches Yet</h2>
              <p className="text-earth-600 mb-6">
                Keep swiping to find your perfect match!
              </p>
              <Button 
                className="bg-rose-500 hover:bg-rose-600 text-white"
                onClick={() => router.push('/swipe')}
              >
                Discover Matches
              </Button>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {matches.map((match) => (
                <Card key={match.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={match.profile.images[0]}
                      alt={match.profile.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold text-earth-800">
                        {match.profile.name}, {match.profile.age}
                      </h3>
                      {match.lastMessage && !match.lastMessage.read && (
                        <span className="bg-rose-500 rounded-full w-3 h-3"></span>
                      )}
                    </div>
                    {match.profile.location && (
                      <p className="text-sm text-earth-600 mb-2">{match.profile.location}</p>
                    )}
                    {match.lastMessage && (
                      <div className="border-t border-gray-100 pt-2 mt-2">
                        <p className="text-sm text-earth-700 font-medium truncate">
                          {match.lastMessage.text}
                        </p>
                        <p className="text-xs text-earth-500">
                          {match.lastMessage.timestamp}
                        </p>
                      </div>
                    )}
                    <Button 
                      className="w-full mt-4 bg-rose-500 hover:bg-rose-600 text-white"
                      onClick={() => router.push(`/messages/${match.id}`)}
                    >
                      Message
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
