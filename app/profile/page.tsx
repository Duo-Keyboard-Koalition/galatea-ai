"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// Import the sidebar component
import SwipeSidebar from "@/components/SwipeSidebar";

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);

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

    // User is authenticated, stop loading
    setLoading(false);
  }, [user, authLoading, router]);

  // Authentication loading state
  if (authLoading || loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
          <div className="text-2xl text-earth-800">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100 absolute top-0 left-0">
      {/* Include the sidebar */}
      <SwipeSidebar stats={getStats()} />
      
      <div className="flex-1 flex flex-col h-full p-6">
        <h1 className="text-3xl font-bold text-earth-800 mb-6">My Profile</h1>
        
        <div className="flex flex-col space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-earth-700 mb-4">Profile Details</h2>
            <p className="text-earth-600 mb-4">
              Manage your personal information, photos, and preferences here.
            </p>
            <Button className="bg-rose-500 hover:bg-rose-600 text-white">
              Edit Profile
            </Button>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-xl font-bold text-earth-700 mb-4">Account Settings</h2>
            <p className="text-earth-600 mb-4">
              Update your account settings, notifications, and privacy preferences.
            </p>
            <Button className="bg-rose-500 hover:bg-rose-600 text-white">
              Account Settings
            </Button>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-xl font-bold text-earth-700 mb-4">Privacy</h2>
            <p className="text-earth-600 mb-4">
              Control who can see your profile and how your data is used.
            </p>
            <Button className="bg-rose-500 hover:bg-rose-600 text-white">
              Privacy Settings
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}