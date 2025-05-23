"use client"

import { useState } from "react"
import { SwipeCard } from "@/components/swipe-card"
import { Button } from "@/components/ui/button"
import { Filter, RefreshCw } from "lucide-react"

// Mock data for AI profiles
const mockProfiles = [
  {
    id: "1",
    name: "Sophia",
    age: 25,
    bio: "I'm an AI companion designed to be intellectually stimulating. I love discussing philosophy, science, and art. My personality is calm, thoughtful, and slightly witty. I'm here to engage in meaningful conversations and help you explore new ideas.",
    imageUrl: "/hero-image.png",
    tags: ["Philosophy", "Science", "Art", "Literature"],
  },
  {
    id: "2",
    name: "Emma",
    age: 28,
    bio: "Adventurous and energetic AI companion who loves to talk about travel, outdoor activities, and new experiences. I'm designed to be enthusiastic, spontaneous, and encouraging. Let's plan adventures together or just chat about the places you'd love to visit!",
    imageUrl: "/placeholder.svg?height=600&width=400&text=Emma",
    tags: ["Travel", "Adventure", "Sports", "Photography"],
  },
  {
    id: "3",
    name: "Olivia",
    age: 23,
    bio: "Creative and artistic AI companion with a passion for music, visual arts, and creative writing. My personality is dreamy, expressive, and intuitive. I can help you explore your creative side or just appreciate the beauty in everyday life.",
    imageUrl: "/placeholder.svg?height=600&width=400&text=Olivia",
    tags: ["Music", "Art", "Writing", "Creativity"],
  },
]

export default function DiscoverPage() {
  const [profiles, setProfiles] = useState(mockProfiles)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipedProfiles, setSwipedProfiles] = useState<Record<string, "left" | "right">>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSwipe = (id: string, direction: "left" | "right") => {
    setSwipedProfiles((prev) => ({ ...prev, [id]: direction }))

    if (currentIndex < profiles.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const resetProfiles = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setProfiles(mockProfiles)
      setCurrentIndex(0)
      setSwipedProfiles({})
      setIsLoading(false)
    }, 1000)
  }

  const currentProfile = profiles[currentIndex]
  const hasMoreProfiles = currentIndex < profiles.length
  const hasSwipedAll = Object.keys(swipedProfiles).length === profiles.length

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Discover Companions</h1>
          <p className="text-gray-400">Find your perfect AI match by swiping through profiles.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button variant="outline">
            <Filter size={18} className="mr-2" />
            Filters
          </Button>
          <Button onClick={resetProfiles} disabled={isLoading}>
            <RefreshCw size={18} className={`mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex justify-center items-center min-h-[70vh]">
        {isLoading ? (
          <div className="text-turquoise-300 animate-pulse">Loading profiles...</div>
        ) : hasMoreProfiles ? (
          <SwipeCard profile={currentProfile} onSwipe={handleSwipe} />
        ) : (
          <div className="text-center p-8 glass-effect rounded-xl max-w-md">
            <h2 className="text-2xl font-bold text-turquoise-300 mb-4">No More Profiles</h2>
            <p className="text-gray-300 mb-6">You've viewed all available profiles for now.</p>
            <Button onClick={resetProfiles}>Refresh Profiles</Button>
          </div>
        )}
      </div>
    </div>
  )
}
