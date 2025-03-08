"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

interface SidebarProps {
  stats: { newMatches: number; messages: number };
}

// Sidebar component for desktop navigation
const Sidebar = ({ stats }: SidebarProps) => (
  <div className="hidden md:block w-64 bg-white bg-opacity-90 shadow-md">
    <div className="p-6">
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
  </div>
);

// Match notification component
const MatchNotification = ({ name }: { name: string }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
    <div className="bg-white p-8 rounded-lg text-center animate-bounce">
      <h2 className="text-3xl font-bold text-rose-600 mb-2">
        It&apos;s a Match!
      </h2>
      <p className="text-earth-700">You matched with {name}</p>
    </div>
  </div>
);

// Image carousel component with mobile optimization
const ImageCarousel = ({
  image,
  name,
  currentIndex,
  totalImages,
  onNavigate,
  isMobile = false,
}: {
  image: string;
  name: string;
  currentIndex: number;
  totalImages: number;
  onNavigate: (direction: "prev" | "next") => void;
  isMobile?: boolean;
}) => (
  <div
    className={`${
      isMobile ? "w-full h-full" : "md:w-1/2 h-[40vh] md:h-full"
    } relative`}
  >
    <div className="relative h-full w-full">
      <Image
        src={image}
        alt={`${name} photo ${currentIndex + 1}`}
        fill
        style={{ objectFit: "cover" }}
        className="transition-opacity duration-300"
        priority
      />

      {/* Image navigation buttons */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={() => onNavigate("prev")}
          className="bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-r-lg transition-all"
          aria-label="Previous photo"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={() => onNavigate("next")}
          className="bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-l-lg transition-all"
          aria-label="Next photo"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Image counter */}
      <div
        className={`absolute ${
          isMobile ? "bottom-16" : "bottom-4"
        } left-0 right-0 flex justify-center`}
      >
        <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {totalImages}
        </div>
      </div>

      {/* Overlay buttons for mobile view */}
      {isMobile && (
        <div className="absolute bottom-20 left-0 right-0 flex justify-center space-x-16 z-10">
          <button
            className="bg-white bg-opacity-90 text-gray-800 rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
            onClick={() => onNavigate("prev")}
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            className="bg-white bg-opacity-90 text-gray-800 rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
            onClick={() => onNavigate("next")}
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </div>
  </div>
);

// Profile info component
const ProfileInfo = ({
  profile,
  onSwipe,
  swiping,
  currentIndex,
  totalProfiles,
}: {
  profile: Profile;
  onSwipe: (direction: "left" | "right") => void;
  swiping: boolean;
  currentIndex: number;
  totalProfiles: number;
}) => (
  <div className="md:w-1/2 p-4 md:p-6 flex flex-col overflow-y-auto">
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-earth-800 mb-2">
        {profile.name}, {profile.age}
      </h2>

      {profile.location && (
        <div className="text-earth-600 mb-2 flex items-center">
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
          {profile.location}
        </div>
      )}

      <div className="mb-3">
        <p className="text-earth-700 text-sm md:text-base">{profile.bio}</p>
      </div>

      {profile.interests && (
        <div className="mb-4 md:mb-6">
          <h3 className="text-earth-700 font-semibold mb-1 md:mb-2">
            Interests
          </h3>
          <div className="flex flex-wrap gap-1 md:gap-2">
            {profile.interests.map((interest, index) => (
              <span
                key={index}
                className="bg-rose-100 text-rose-600 px-2 py-1 rounded-full text-xs md:text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>

    <div className="mt-auto pb-4 md:pb-0">
      <h3 className="text-center text-earth-600 mb-3 text-sm md:text-base">
        Would you like to meet {profile.name}?
      </h3>

      <div className="flex justify-center space-x-6 md:space-x-8">
        <Button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center text-xl md:text-2xl transition-transform duration-200 hover:scale-110"
          onClick={() => onSwipe("left")}
          disabled={swiping}
        >
          <X size={24} />
        </Button>

        <Button
          className="bg-rose-500 hover:bg-rose-600 text-white rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center text-xl md:text-2xl transition-transform duration-200 hover:scale-110"
          onClick={() => onSwipe("right")}
          disabled={swiping}
        >
          <Heart size={24} />
        </Button>
      </div>

      <div className="text-center mt-3 md:mt-6">
        <span className="text-xs md:text-sm text-earth-500">
          Profile {currentIndex + 1} of {totalProfiles}
        </span>
      </div>
    </div>
  </div>
);
// Profile info modal component for mobile view
const ProfileInfoModal = ({
  profile,
  isOpen,
  onClose,
}: {
  profile: Profile;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black bg-opacity-70"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto z-50 animate-slideUp">
        <button
          className="absolute top-2 right-2 bg-rose-100 p-2 rounded-full text-earth-600"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-5">
          <h2 className="text-2xl font-bold text-earth-800 mb-2">
            {profile.name}, {profile.age}
          </h2>

          {profile.location && (
            <div className="text-earth-600 mb-4 flex items-center">
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
              {profile.location}
            </div>
          )}

          <div className="mb-5">
            <h3 className="font-semibold text-earth-800 mb-2">About</h3>
            <p className="text-earth-700">{profile.bio}</p>
          </div>

          {profile.interests && (
            <div className="mb-6">
              <h3 className="font-semibold text-earth-800 mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
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
      </div>
    </div>
  );
};

// Profile card component - modified for full-height mobile view
const ProfileCard = ({
  profile,
  currentImageIndex,
  totalImages,
  onImageNav,
  onSwipe,
  swiping,
  currentProfileIndex,
  totalProfiles,
}: {
  profile: Profile;
  currentImageIndex: number;
  totalImages: number;
  onImageNav: (direction: "prev" | "next") => void;
  onSwipe: (direction: "left" | "right") => void;
  swiping: boolean;
  currentProfileIndex: number;
  totalProfiles: number;
}) => {
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  return (
    <div className="w-full md:h-[calc(100vh-64px)] h-[calc(100vh-64px)] flex flex-col md:flex-row">
      {/* For desktop: standard side-by-side layout */}
      <div className="hidden md:flex w-full h-full">
        <Card className="flex flex-row w-full h-full overflow-hidden shadow-xl rounded-none">
          <ImageCarousel
            image={profile.images[currentImageIndex]}
            name={profile.name}
            currentIndex={currentImageIndex}
            totalImages={totalImages}
            onNavigate={onImageNav}
          />
          <ProfileInfo
            profile={profile}
            onSwipe={onSwipe}
            swiping={swiping}
            currentIndex={currentProfileIndex}
            totalProfiles={totalProfiles}
          />
        </Card>
      </div>

      {/* For mobile: full-height container with just the image */}
      <div className="md:hidden w-full h-full">
        <ImageCarousel
          image={profile.images[currentImageIndex]}
          name={profile.name}
          currentIndex={currentImageIndex}
          totalImages={totalImages}
          onNavigate={onImageNav}
          isMobile={true}
        />

        {/* Mobile action buttons */}
        <div className="absolute bottom-24 right-4 flex flex-col space-y-3 z-30">
          <button
            onClick={() => onSwipe("right")}
            disabled={swiping}
            className="bg-rose-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
          >
            <Heart size={24} />
          </button>
          <button
            onClick={() => onSwipe("left")}
            disabled={swiping}
            className="bg-white text-gray-800 rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
          >
            <X size={24} />
          </button>
        </div>

        {/* Info button that opens the profile modal */}
        <button
          className="absolute bottom-24 left-4 bg-white bg-opacity-90 text-gray-800 rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-30"
          onClick={() => setInfoModalOpen(true)}
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>

        {/* Profile info modal */}
        <ProfileInfoModal
          profile={profile}
          isOpen={infoModalOpen}
          onClose={() => setInfoModalOpen(false)}
        />
      </div>
    </div>
  );
};

// Error state component
const ErrorState = ({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) => (
  <div className="h-screen flex items-center justify-center bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
    <Card className="p-8 max-w-md text-center">
      <h2 className="text-2xl font-bold text-earth-800 mb-4">
        Something went wrong
      </h2>
      <p className="text-earth-600 mb-6">{error}</p>
      <Button
        className="bg-rose-600 hover:bg-rose-700 text-white"
        onClick={onRetry}
      >
        Try Again
      </Button>
    </Card>
  </div>
);

// No profiles component
const NoProfiles = ({
  onReset,
  onGoToProfile,
}: {
  onReset: () => void;
  onGoToProfile: () => void;
}) => (
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
          onClick={onGoToProfile}
        >
          Go to Profile
        </Button>
        <Button
          variant="outline"
          className="border-rose-300 text-rose-600 hover:bg-rose-50"
          onClick={onReset}
        >
          Start Over
        </Button>
      </div>
    </Card>
  </div>
);

// Main SwipePage component
export default function SwipePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authError, setAuthError] = useState(false);
  const [matchFound, setMatchFound] = useState(false);

  const getStats = () => {
    return {
      newMatches: 2,
      messages: 2,
    };
  };

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

        // Fetch profiles from the API
        const response = await fetch("/api/profiles");

        if (!response.ok) {
          throw new Error("Failed to fetch profiles");
        }

        const data = await response.json();
        setProfiles(data.profiles);
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
      
      console.log(`User ${user.uid} swiped ${direction} on profile ${currentProfile.id} (${currentProfile.name})`);
      
      // Simulate match found
      if (direction === "right") {
        setMatchFound(true);
        setTimeout(() => setMatchFound(false), 3000); // Hide notification after 3 seconds
      }
      console.log(`User ${user.uid} swiped ${direction} on profile ${currentProfile.id} (${currentProfile.name})`);
  
  
      // Reset image index for next profile
      setCurrentImageIndex(0);
  
      // Move to next profile
      setCurrentProfileIndex((prev) => prev + 1);
    } catch (error) {
      console.error("Error handling swipe:", error);
      setError("Something went wrong. Please try again.");
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
  // Authentication error handling
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

  // Loading state
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

  // Error state
  if (error) {
    return (
      <ErrorState error={error} onRetry={() => window.location.reload()} />
    );
  }

  // No more profiles
  const currentProfile = profiles[currentProfileIndex];
  if (!currentProfile) {
    return (
      <NoProfiles
        onReset={() => setCurrentProfileIndex(0)}
        onGoToProfile={() => router.push("/profile")}
      />
    );
  }

  const totalImages = currentProfile.images.length;

  // Main interface with components
  return (
    <div className="h-[calc(100vh-64px)] flex bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
      <Sidebar stats={getStats()} />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-0 relative">
          {matchFound && <MatchNotification name={currentProfile.name} />}
          <ProfileCard
            profile={currentProfile}
            currentImageIndex={currentImageIndex}
            totalImages={totalImages}
            onImageNav={handleImageNav}
            onSwipe={handleSwipe}
            swiping={swiping}
            currentProfileIndex={currentProfileIndex}
            totalProfiles={profiles.length}
          />
        </main>
      </div>
    </div>
  );
}
