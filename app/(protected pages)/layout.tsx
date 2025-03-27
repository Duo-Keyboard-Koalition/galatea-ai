"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import MatchModel, { useMatchStore } from "@/models/matchModel";
const SwipeSidebar = () => {
  const pathname = usePathname();
  const { user, signOut } = useAuth(); // Ensure `user` is of type Firebase's User

  const { matches, loading, fetchMatches, initialized } = useMatchStore();

  useEffect(() => {
    if (user?.uid && !initialized && !loading) {
      fetchMatches(user.uid);
    }
  }, [user?.uid, initialized, loading, fetchMatches]);

  const newMatches = matches.length;
  const unreadMessages = MatchModel.getUnreadCount();

  const handleSignOut = async () => {
    try {
      MatchModel.clearMatches();
      await signOut(); // Use signOut from auth context instead of direct import
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="hidden md:flex w-64 bg-white bg-opacity-90 shadow-md flex-col h-screen">
      <div className="p-6 flex-grow overflow-y-auto">
        <h2 className="text-xl font-bold text-earth-800 mb-4">Navigation</h2>
        <nav className="space-y-2">
          <Link
            href="/swipe"
            className={`flex items-center px-4 py-3 rounded-lg font-medium ${
              pathname === "/swipe"
                ? "bg-rose-50 text-rose-600"
                : "text-earth-600 hover:bg-rose-50 hover:text-rose-600"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Discover Matches
          </Link>

          <Link
            href="/matches"
            className={`flex items-center px-4 py-3 rounded-lg font-medium ${
              pathname === "/matches"
                ? "bg-rose-50 text-rose-600"
                : "text-earth-600 hover:bg-rose-50 hover:text-rose-600"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 00-6.364 0z"
              />
            </svg>
            My Matches
            {newMatches > 0 && (
              <span className="ml-auto bg-rose-100 text-rose-600 text-xs py-1 px-2 rounded-full">
                {newMatches}
              </span>
            )}
          </Link>

          <Link
            href="/profile"
            className={`flex items-center px-4 py-3 rounded-lg font-medium ${
              pathname === "/profile"
                ? "bg-rose-50 text-rose-600"
                : "text-earth-600 hover:bg-rose-50 hover:text-rose-600"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            My Profile
          </Link>

          <div className="pt-4 mt-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-earth-500 mb-2 px-4">
              Match Stats
            </h3>
            <div className="bg-ivory-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-earth-600">New Matches</span>
                <span className="bg-rose-100 text-rose-600 text-xs py-1 px-2 rounded-full">
                  {newMatches}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-earth-600">Unread Messages</span>
                <span className="bg-rose-100 text-rose-600 text-xs py-1 px-2 rounded-full">
                  {unreadMessages}
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200 mt-auto">
        <Button
          onClick={handleSignOut}
          variant="outline"
          className="w-full flex items-center justify-center text-earth-600 hover:text-rose-600 hover:bg-rose-50 border-earth-200"
        >
          <LogOut size={18} className="mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

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
      router.push("/sign-in");
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
    <div className="flex h-screen">
      <SwipeSidebar /> {/* Add the sidebar */}
      <main className="flex-grow">{children}</main> {/* Main content */}
    </div>
  );
}