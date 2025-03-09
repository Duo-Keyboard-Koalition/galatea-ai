"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  stats: { newMatches: number; messages: number };
}

// Sidebar component for desktop navigation
const SwipeSidebar = ({ stats }: SidebarProps) => {
  // Get the current path to determine which link is active
  const pathname = usePathname();
  const router = useRouter();
  const {  signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="hidden md:block w-64 bg-white bg-opacity-90 shadow-md flex flex-col h-full">
      <div className="p-6 flex-1">
        <h2 className="text-xl font-bold text-earth-800 mb-4">Navigation</h2>
        <nav className="space-y-2">
          <Link
            href="/swipe"
            className={`flex items-center px-4 py-3 rounded-lg font-medium ${
              pathname === "/swipe" 
                ? "bg-rose-50 text-rose-600"  // Active style
                : "text-earth-600 hover:bg-rose-50 hover:text-rose-600"  // Inactive style
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
                ? "bg-rose-50 text-rose-600"  // Active style
                : "text-earth-600 hover:bg-rose-50 hover:text-rose-600"  // Inactive style
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            My Matches
          </Link>

          <Link
            href="/profile"
            className={`flex items-center px-4 py-3 rounded-lg font-medium ${
              pathname === "/profile"
                ? "bg-rose-50 text-rose-600"  // Active style
                : "text-earth-600 hover:bg-rose-50 hover:text-rose-600"  // Inactive style
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
                  {stats.newMatches}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-earth-600">Messages</span>
                <span className="bg-rose-100 text-rose-600 text-xs py-1 px-2 rounded-full">
                  {stats.messages}
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Sign Out Button - added at the bottom of sidebar */}
      <div className="p-4 border-t border-gray-200">
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

export default SwipeSidebar;
