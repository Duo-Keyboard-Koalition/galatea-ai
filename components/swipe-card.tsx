"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, X, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface SwipeCardProps {
  profile: {
    id: string
    name: string
    age: number
    bio: string
    imageUrl: string
    tags?: string[]
  }
  onSwipe: (id: string, direction: "left" | "right") => void
}

export function SwipeCard({ profile, onSwipe }: SwipeCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="w-full max-w-md mx-auto perspective-1000">
      <div
        className={`relative w-full h-[600px] transform-style-3d transition-transform duration-500 ${isFlipped ? "rotate-y-180" : ""}`}
      >
        {/* Front of card (image) */}
        <Card className={`swipe-card absolute inset-0 backface-hidden ${isFlipped ? "rotate-y-180" : ""}`}>
          <div className="relative w-full h-full">
            <Image
              src={profile.imageUrl || "/placeholder.svg"}
              alt={profile.name}
              fill
              className="object-cover rounded-xl"
              priority
            />
            <div className="swipe-card-gradient"></div>

            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h2 className="text-2xl font-bold text-white">
                {profile.name}, {profile.age}
              </h2>

              {profile.tags && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-full bg-teal-500/20 text-teal-300">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-gray-900/50 backdrop-blur-sm rounded-full"
              onClick={() => setIsFlipped(true)}
            >
              <Info size={20} className="text-white" />
            </Button>
          </div>
        </Card>

        {/* Back of card (bio) */}
        <Card className={`swipe-card absolute inset-0 backface-hidden rotate-y-180 ${isFlipped ? "" : "hidden"}`}>
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {profile.name}, {profile.age}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="bg-gray-900/50 backdrop-blur-sm rounded-full"
                onClick={() => setIsFlipped(false)}
              >
                <X size={20} className="text-white" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <h3 className="text-lg font-semibold text-teal-300 mb-2">About Me</h3>
              <p className="text-gray-300 mb-6">{profile.bio}</p>

              {profile.tags && (
                <>
                  <h3 className="text-lg font-semibold text-teal-300 mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {profile.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-sm rounded-full bg-teal-500/20 text-teal-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Button
              className="w-full mt-4"
              onClick={() => {
                setIsFlipped(false)
                onSwipe(profile.id, "right")
              }}
            >
              <Heart size={20} className="mr-2" />
              I'm Interested
            </Button>
          </div>
        </Card>
      </div>

      {/* Swipe buttons */}
      <div className="flex justify-center space-x-4 mt-6">
        <Button
          variant="outline"
          size="icon"
          className="h-14 w-14 rounded-full"
          onClick={() => onSwipe(profile.id, "left")}
        >
          <X size={24} className="text-red-500" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-14 w-14 rounded-full"
          onClick={() => onSwipe(profile.id, "right")}
        >
          <Heart size={24} className="text-teal-300" />
        </Button>
      </div>
    </div>
  )
}
