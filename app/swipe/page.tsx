"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { ChevronLeft, ChevronRight, X, Heart } from "lucide-react";
// Import the new separate sidebar component
import SwipeSidebar from "@/components/SwipeSidebar";

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

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerHeight > window.innerWidth);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
};

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

// Profile card component 
const ProfileCard = ({
  profile,
  currentImageIndex,
  totalImages,
  onImageNav,
  onSwipe,
  swiping,
  currentProfileIndex,
  totalProfiles,
  isMobile, 
}: {
  profile: Profile;
  currentImageIndex: number;
  totalImages: number;
  onImageNav: (direction: "prev" | "next") => void;
  onSwipe: (direction: "left" | "right") => void;
  swiping: boolean;
  currentProfileIndex: number;
  totalProfiles: number;
  isMobile: boolean; 
}) => {
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  return (
    // CHANGE: Updated to use full height without accounting for navbar space
    <div className="w-full h-full flex flex-col md:flex-row">
      {/* For desktop: standard side-by-side layout */}
      <div className={`hidden ${!isMobile ? "md:flex" : ""} w-full h-full`}>
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
      <div className={`md:hidden ${isMobile ? "flex" : "hidden"} w-full h-full`}>
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

// Add these components before the SwipePage component:
// make the match datastructure
interface match {
  id: string;
  profile: Profile;
}
// Component to display matches
const MatchesList = ({ matches, onViewMatches, onReset }: { 
  matches: match[], 
  onViewMatches: () => void,
  onReset: () => void 
}) => (
  <div className="h-screen flex items-center justify-center bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
    <Card className="p-8 max-w-md">
      <h2 className="text-2xl font-bold text-earth-800 mb-4 text-center">
        You Have Matches! 🎉
      </h2>
      <p className="text-earth-600 mb-6 text-center">
        You&apos;ve matched with {matches.length} {matches.length === 1 ? 'person' : 'people'}!
      </p>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {matches.slice(0, 4).map((match) => (
          <div key={match.id} className="text-center">
            <div className="w-16 h-16 relative rounded-full overflow-hidden mb-1">
              <Image 
                src={match.profile.images[0]} 
                alt={match.profile.name} 
                fill 
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="text-xs text-earth-700">{match.profile.name}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col space-y-3">
        <Button
          className="bg-rose-600 hover:bg-rose-700 text-white"
          onClick={onViewMatches}
        >
          View All Matches
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

// Component to display when no matches are found
const NoMatches = ({ onReset, onGoToProfile }: { 
  onReset: () => void, 
  onGoToProfile: () => void 
}) => (
  <div className="h-screen flex items-center justify-center bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
    <Card className="p-8 max-w-md text-center">
      <h2 className="text-2xl font-bold text-earth-800 mb-4">
        No Matches Yet
      </h2>
      <p className="text-earth-600 mb-6">
        You&apos;ve swiped through everyone! There are plenty of fish in the sea, but none have matched with you yet.
      </p>
      <div className="flex flex-col space-y-3">
        <Button
          className="bg-rose-600 hover:bg-rose-700 text-white"
          onClick={onGoToProfile}
        >
          Update Your Profile
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
  const [matches, setMatches] = useState<match[]>([]);
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [matchesFetched, setMatchesFetched] = useState(false);
  const isMobile = useIsMobile();

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
      // if (direction === "right") {
      //   setMatchFound(true);
      //   setTimeout(() => setMatchFound(false), 3000); // Hide notification after 3 seconds
      // }
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
  // Add effect to fetch matches when profiles are exhausted
  useEffect(() => {
    // Only fetch matches when we've run out of profiles, aren't already loading them,
    // haven't fetched them before, and user is authenticated
    if (!profiles[currentProfileIndex] && !loadingMatches && !matchesFetched && user) {
      const fetchMatches = async () => {
        try {
          setLoadingMatches(true);
          
          // Fetch matches from API
          const response = await fetch(`/api/matches?userId=${user.uid}`);
          
          if (!response.ok) {
            throw new Error("Failed to fetch matches");
          }
          
          const data = await response.json();
          setMatches(data.matches || []);
          // Mark that we've fetched matches
          setMatchesFetched(true);
        } catch (error) {
          console.error("Error loading matches:", error);
          setError("Failed to load matches. Please try again later.");
        } finally {
          setLoadingMatches(false);
        }
      };

      fetchMatches();
    }
  }, [currentProfileIndex, profiles, loadingMatches, matchesFetched, user]);

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
    // If matches are still loading, show a loading state
    if (loadingMatches) {
      return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
            <div className="text-2xl text-earth-800">Checking for matches...</div>
          </div>
        </div>
      );
    }
    
    // If we have matches, show the matches list
    if (matches && matches.length > 0) {
      return (
        <MatchesList
          matches={matches}
          onViewMatches={() => router.push("/matches")}
          onReset={() => {
            setMatches([]);
            setCurrentProfileIndex(0);
            setMatchesFetched(false); // Reset this flag when restarting
            // Reload profiles
            setLoading(true);
            fetch("/api/profiles")
              .then(res => res.json())
              .then(data => {
                setProfiles(data.profiles);
                setLoading(false);
              })
              .catch(err => {
                console.error("Error reloading profiles:", err);
                setError("Failed to reload profiles");
              });
          }}
        />
      );
    }
    
    // If no matches, show the no matches view
    return (
      <NoMatches
        onReset={() => {
          // Similar reset logic as above
          setMatches([]);
          setCurrentProfileIndex(0);
          setMatchesFetched(false); // Reset this flag when restarting
          setLoading(true);
          fetch("/api/profiles")
            .then(res => res.json())
            .then(data => {
              setProfiles(data.profiles);
              setLoading(false);
            })
            .catch(err => {
              console.error("Error reloading profiles:", err);
              setError("Failed to reload profiles");
            });
        }}
        onGoToProfile={() => router.push("/profile")}
      />
    );
  }

  // Define totalImages here, after confirming currentProfile exists
  const totalImages = currentProfile.images.length;

  // Main interface with components
  return (
    <div className="h-screen w-screen flex overflow-hidden bg-gradient-to-br from-ivory-100 via-rose-50 to-earth-100 absolute top-0 left-0">
      {/* Use the imported sidebar component instead of inline sidebar */}
      <SwipeSidebar stats={getStats()} />
      <div className="flex-1 flex flex-col h-full">
        <main className="flex-1 h-full p-0">
          <ProfileCard
            profile={currentProfile}
            currentImageIndex={currentImageIndex}
            totalImages={totalImages}
            onImageNav={handleImageNav}
            onSwipe={handleSwipe}
            swiping={swiping}
            currentProfileIndex={currentProfileIndex}
            totalProfiles={profiles.length}
            isMobile={isMobile}
          />
        </main>
      </div>
    </div>
  );
}
