"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { recordSwipe } from "@/lib/matchService";
import { useAuth } from "@/components/AuthContext";
import { ChevronLeft, ChevronRight, X, Heart } from "lucide-react";

// Define types for better type safety
interface Profile {
  id: string;
  name: string;
  age: number;
  bio: string;
  images: string[];
  interests?: string[];
  location?: string;
}

export default function SwipePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authError, setAuthError] = useState(false);
  const getStats = () => {
    // In the future, you could fetch these from your backend
    // For now, returning 2 as requested
    return {
      newMatches: 2,
      messages: 2,
    };
  };
  // Check authentication and load profiles
  useEffect(() => {
    // If auth is still loading, wait
    if (authLoading) return;

    // If no user is authenticated, show error
    if (!user) {
      setAuthError(true);
      return;
    }

    // Load profiles
    const loadProfiles = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from your API
        const mockProfiles: Profile[] = [
          {
            id: "1",
            name: "Mekkana",
            age: 25,
            bio: "Creative artist with a passion for digital art and design. I love spending my weekends at galleries and exploring new coffee shops in the city.",
            images: [
              "/girl-profiles/mekkana-profile.png",
              "/girl-profiles/mekkana-profile-2.png",
              "/girl-profiles/mekkana-profile-3.png",
            ],
            interests: ["Art", "Photography", "Coffee"],
            location: "New York City",
          },
          {
            id: "2",
            name: "Eliana",
            age: 23,
            bio: "Bookworm who loves cozy evenings and philosophical discussions. When I'm not reading, you can find me hiking or trying new recipes.",
            images: [
              "/girl-profiles/eliana-profile.jpg",
              "/girl-profiles/eliana-profile-2.jpg",
              "/girl-profiles/eliana-profile-3.jpg",
            ],
            interests: ["Books", "Hiking", "Cooking"],
            location: "San Francisco",
          },
          {
            id: "3",
            name: "Zara",
            age: 27,
            bio: "Adventure seeker with a love for hiking and photography. My goal is to visit every national park before turning 30.",
            images: [
              "/girl-profiles/zara-profile.jpg",
              "/girl-profiles/zara-profile-2.jpg",
              "/girl-profiles/zara-profile-3.jpg",
            ],
            interests: ["Travel", "Outdoors", "Photography"],
            location: "Denver",
          },
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

  const handleSwipe = async (direction: "left" | "right") => {
    if (!user || swiping || currentProfileIndex >= profiles.length) return;

    setSwiping(true);
    try {
      const currentProfile = profiles[currentProfileIndex];
      console.log(
        `Recording swipe ${direction} for profile ${currentProfile.id}`
      );

      // Record the swipe in Firestore
      await recordSwipe(user.uid, currentProfile.id, direction);

      // If it's a right swipe, show match notification
      if (direction === "right") {
        setMatchFound(true);
        console.log(`Match created with ${currentProfile.name}`);
        setTimeout(() => {
          setMatchFound(false);
        }, 2000);
      }

      // Reset image index for next profile
      setCurrentImageIndex(0);

      // Move to next profile
      setCurrentProfileIndex((prev) => prev + 1);
    } catch (error) {
      console.error("Error recording swipe:", error);
      setError("Failed to record your preference. Please try again.");
    } finally {
      setSwiping(false);
    }
  };

  const handleImageNav = (direction: "prev" | "next") => {
    if (!profiles[currentProfileIndex]) return;

    const imageCount = profiles[currentProfileIndex].images.length;

    if (direction === "next") {
      setCurrentImageIndex((prev) => (prev + 1) % imageCount);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + imageCount) % imageCount);
    }
  };

  // Authentication error
  if (authError) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
        <Card className="p-8 max-w-md text-center">
          <div className="text-rose-600 text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-earth-800 mb-4">
            Authentication Required
          </h2>
          <p className="text-earth-600 mb-6">
            You must be signed in to view potential matches.
          </p>
          <div className="flex flex-col space-y-3">
            <Button
              className="bg-rose-600 hover:bg-rose-700 text-white"
              asChild
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button
              variant="outline"
              className="border-rose-300 text-rose-600 hover:bg-rose-50"
              asChild
            >
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Render loading state
  if (authLoading || loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
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
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-earth-800 mb-4">
            Something went wrong
          </h2>
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
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-earth-800 mb-4">
            No More Profiles
          </h2>
          <p className="text-earth-600 mb-6">
            You&apos;ve seen all available profiles for now.
          </p>
          <div className="flex flex-col space-y-3">
            <Button
              className="bg-rose-600 hover:bg-rose-700 text-white"
              onClick={() => router.push("/profile")}
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

  const currentImage = currentProfile.images[currentImageIndex];
  const totalImages = currentProfile.images.length;

  // Main swipe interface with sidebar and main content
  // Main swipe interface with sidebar and main content
  // Main swipe interface with sidebar and main content
// Main swipe interface with sidebar and main content
return (
  <div className="h-[calc(100vh-64px)] flex bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
    {/* Sidebar navigation */}
    <div className="hidden md:block w-64 bg-white bg-opacity-90 shadow-md">
      {/* Adjusted sidebar to remove top padding and added mt-16 to the content div */}
      <div className="mt-16 p-6">
        <h2 className="text-xl font-bold text-earth-800 mb-4">Navigation</h2>
        <nav className="space-y-2">
          <Link
            href="/swipe"
            className="flex items-center px-4 py-3 bg-rose-50 text-rose-600 rounded-lg font-medium"
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
            className="flex items-center px-4 py-3 text-earth-600 hover:bg-rose-50 hover:text-rose-600 rounded-lg"
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
            className="flex items-center px-4 py-3 text-earth-600 hover:bg-rose-50 hover:text-rose-600 rounded-lg"
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
                  {getStats().newMatches}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-earth-600">Messages</span>
                <span className="bg-rose-100 text-rose-600 text-xs py-1 px-2 rounded-full">
                  {getStats().messages}
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>

    {/* Main content area - now fills all available space */}
    <div className="flex-1 flex flex-col">
      <main className="flex-1 p-0">
        {/* Match notification */}
        {matchFound && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
            <div className="bg-white p-8 rounded-lg text-center animate-bounce">
              <h2 className="text-3xl font-bold text-rose-600 mb-2">
                It&apos;s a Match!
              </h2>
              <p className="text-earth-700">
                You matched with {currentProfile.name}
              </p>
            </div>
          </div>
        )}

        {/* Profile card - now fills available space */}
{/* Profile card - now with adjusted height */}
<Card className="flex flex-col md:flex-row w-full h-[calc(100vh-64px)] overflow-hidden shadow-xl rounded-none">    
          {/* Left side: Photo carousel */}
          <div className="md:w-1/2 relative">
            <div className="relative h-full w-full">
              <Image
                src={currentImage}
                alt={`${currentProfile.name} photo ${currentImageIndex + 1}`}
                fill
                style={{ objectFit: "cover" }}
                className="transition-opacity duration-300"
                priority
              />

              {/* Image navigation buttons */}
              <div className="absolute inset-y-0 left-0 flex items-center">
                <button
                  onClick={() => handleImageNav("prev")}
                  className="bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-r-lg transition-all"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={24} />
                </button>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                  onClick={() => handleImageNav("next")}
                  className="bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-l-lg transition-all"
                  aria-label="Next photo"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Image counter */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {totalImages}
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Profile info and actions */}
          <div className="md:w-1/2 p-6 flex flex-col">
            <div>
              <h2 className="text-3xl font-bold text-earth-800 mb-2">
                {currentProfile.name}, {currentProfile.age}
              </h2>

              {currentProfile.location && (
                <div className="text-earth-600 mb-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {currentProfile.location}
                </div>
              )}

              <div className="mb-4">
                <p className="text-earth-700">{currentProfile.bio}</p>
              </div>

              {currentProfile.interests && (
                <div className="mb-6">
                  <h3 className="text-earth-700 font-semibold mb-2">
                    Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentProfile.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-auto">
              <h3 className="text-center text-earth-600 mb-4">
                Would you like to meet {currentProfile.name}?
              </h3>

              <div className="flex justify-center space-x-8">
                <Button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full w-16 h-16 flex items-center justify-center text-2xl transition-transform duration-200 hover:scale-110"
                  onClick={() => handleSwipe("left")}
                  disabled={swiping}
                >
                  <X size={28} />
                </Button>

                <Button
                  className="bg-rose-500 hover:bg-rose-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl transition-transform duration-200 hover:scale-110"
                  onClick={() => handleSwipe("right")}
                  disabled={swiping}
                >
                  <Heart size={28} />
                </Button>
              </div>

              <div className="text-center mt-6">
                <span className="text-sm text-earth-500">
                  Profile {currentProfileIndex + 1} of {profiles.length}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </main>

      {/* Mobile navigation now positioned absolutely within the card's height */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 z-10">
        <div className="flex justify-around">
          <Link
            href="/swipe"
            className="flex flex-col items-center px-3 py-2 text-rose-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
            <span className="text-xs mt-1">Discover</span>
          </Link>
          <Link
            href="/matches"
            className="flex flex-col items-center px-3 py-2 text-earth-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
            <span className="text-xs mt-1">Matches</span>
          </Link>
          <Link
            href="/profile"
            className="flex flex-col items-center px-3 py-2 text-earth-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  </div>
);
}
