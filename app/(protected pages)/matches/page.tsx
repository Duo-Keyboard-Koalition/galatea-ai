"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import MatchModel, { useMatchStore, Match } from "@/models/matchModel";
export default function MatchesPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { matches, loading, fetchMatches } = useMatchStore();

  useEffect(() => {
    // If auth is still loading, wait
    if (authLoading) return;

    // If no user is authenticated, redirect to sign in
    if (!user) {
      router.push('/sign-in');
      return;
    }

    // Fetch matches using our model
    fetchMatches(user.uid);
  }, [user, authLoading, router, fetchMatches]);

  // Authentication loading state
  if (authLoading || loading) {
    return (
        <div className="h-full w-full flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
            <div className="text-2xl text-earth-800">Loading matches...</div>
          </div>
        </div>
    );
  }

  return (
      <div className="h-full w-full p-6 overflow-y-auto">
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
              <MatchCard 
                key={match.id} 
                match={match} 
                onOpenConversation={(id) => {
                  // Mark as read when opening conversation
                  MatchModel.markAsRead(id);
                  router.push(`/messages/${id}`);
                }}
              />
            ))}
          </div>
        )}
      </div>
  );
}

// Extracted MatchCard component for better organization
const MatchCard = ({ 
  match, 
  onOpenConversation 
}: { 
  match: Match, 
  onOpenConversation: (id: string) => void 
}) => (
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
        onClick={() => onOpenConversation(match.id)}
      >
        Message
      </Button>
    </div>
  </Card>
);