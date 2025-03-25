"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { Card } from "@/components/ui/card";
import SwipeSidebar from "@/components/SwipeSidebar";

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const getStats = () => {
    return {
      newMatches: 2,
      messages: 2,
    };
  };

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push('/sign-in');
      return;
    }

    setLoading(false);
  }, [user, authLoading, router]);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(user, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      <SwipeSidebar stats={getStats()} />
      
      <div className="flex-1 flex flex-col h-full p-6">
        <h1 className="text-3xl font-bold text-earth-800 mb-6">My Profile</h1>
        
        <div className="flex flex-col space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-earth-700 mb-4">User JSON</h2>
            <div className="relative bg-gray-100 p-4 rounded-md">
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 text-sm text-white bg-rose-500 hover:bg-rose-600 px-2 py-1 rounded"
              >
                {copied ? "✓ Copied" : "Copy"}
              </button>
              <pre className="text-sm text-gray-800 overflow-x-auto">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}