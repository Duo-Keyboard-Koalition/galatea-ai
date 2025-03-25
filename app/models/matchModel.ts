"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define Types
export interface Profile {
  id: string;
  name: string;
  age: number;
  bio: string;
  images: string[];
  interests?: string[];
  location?: string;
}

export interface Match {
  id: string;
  profile: Profile;
  lastMessage?: {
    text: string;
    timestamp: string;
    read: boolean;
  };
  matchDate?: string;
  matchScore?: number;
}

interface MatchStore {
  matches: Match[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
  
  // Actions
  fetchMatches: (userId?: string) => Promise<void>;
  getMatchById: (matchId: string) => Match | undefined;
  updateMatch: (matchId: string, matchData: Partial<Match>) => void;
  clearMatches: () => void;
  markMessageAsRead: (matchId: string) => void;
}

// Create a Zustand store with persistence
export const useMatchStore = create<MatchStore>()(
  persist(
    (set, get) => ({
      matches: [],
      loading: false,
      error: null,
      initialized: false,

      fetchMatches: async (userId?: string) => {
        try {
          set({ loading: true, error: null });
          
          // Fetch matches from your API
          const response = await fetch(`/api/matches${userId ? `?userId=${userId}` : ''}`);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch matches: ${response.status}`);
          }
          
          const data = await response.json();
          set({ matches: data.matches, loading: false, initialized: true });
          
          return data.matches;
        } catch (error) {
          console.error('Error fetching matches:', error);
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch matches', 
            loading: false 
          });
        }
      },

      getMatchById: (matchId: string) => {
        return get().matches.find(match => match.id === matchId);
      },

      updateMatch: (matchId: string, matchData: Partial<Match>) => {
        set(state => ({
          matches: state.matches.map(match => 
            match.id === matchId ? { ...match, ...matchData } : match
          )
        }));
      },

      clearMatches: () => {
        set({ matches: [], initialized: false });
      },

      markMessageAsRead: (matchId: string) => {
        set(state => ({
          matches: state.matches.map(match => 
            match.id === matchId && match.lastMessage 
              ? { 
                  ...match, 
                  lastMessage: { 
                    ...match.lastMessage, 
                    read: true 
                  } 
                } 
              : match
          )
        }));
      }
    }),
    {
      name: 'galatea-matches', // Storage key
      partialize: (state) => ({ matches: state.matches }), // Only persist matches
    }
  )
);

// Utility class for more direct manipulation
export class MatchModel {
  // Get all matches (with optional refresh from server)
  static async getMatches(userId?: string, forceRefresh = false): Promise<Match[]> {
    const { matches, fetchMatches, initialized } = useMatchStore.getState();
    
    // If we need fresh data or haven't initialized yet
    if (forceRefresh || !initialized) {
      await fetchMatches(userId);
    }
    
    return useMatchStore.getState().matches;
  }
  
  // Get a single match by ID
  static getMatch(matchId: string): Match | undefined {
    return useMatchStore.getState().getMatchById(matchId);
  }
  
  // Get unread message count
  static getUnreadCount(): number {
    const { matches } = useMatchStore.getState();
    return matches.filter(match => match.lastMessage && !match.lastMessage.read).length;
  }
  
  // Mark a message as read
  static markAsRead(matchId: string): void {
    useMatchStore.getState().markMessageAsRead(matchId);
  }
  
  // Clear match data (e.g., on logout)
  static clearMatches(): void {
    useMatchStore.getState().clearMatches();
  }
  
  // Check if we have any matches
  static hasMatches(): boolean {
    return useMatchStore.getState().matches.length > 0;
  }
}

export default MatchModel;