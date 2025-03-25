"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import SwipeSidebar from "@/components/signedIn/SwipeSidebar";

interface WebAppLayoutProps {
  children: ReactNode;
}

export default function WebAppLayout({ children }: WebAppLayoutProps) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If auth is still loading, wait
    if (authLoading) return;

    // If no user is authenticated, redirect to sign-in
    if (!user) {
      router.push('/sign-in');
      return;
    }

    setLoading(false);
  }, [user, authLoading, router]);

  // Loading state
  if (authLoading || loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
          <div className="text-2xl text-earth-800">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100 absolute top-0 left-0">
      {/* Sidebar - now gets data directly from the model */}
      <SwipeSidebar />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col h-full">
        <main className="flex-1 h-full overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}