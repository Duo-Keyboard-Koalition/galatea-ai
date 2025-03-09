"use client";

import React from "react";

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  autoplay?: boolean;
  className?: string;
}

/**
 * A responsive YouTube video embed component
 * 
 * @param videoId - The YouTube video ID (e.g., "9HyQXA1la04")
 * @param title - Optional custom title for the iframe (default: "YouTube video player")
 * @param autoplay - Whether to autoplay the video (default: false)
 * @param className - Additional CSS classes to apply to the container
 */
const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId,
  title = "YouTube video player",
  autoplay = false,
  className = "",
}) => {
  // Construct the embed URL with parameters
  const embedUrl = `https://www.youtube.com/embed/${videoId}${autoplay ? "?autoplay=1" : ""}`;

  return (
    <div className={`relative w-full pb-[56.25%] overflow-hidden rounded-lg shadow-lg ${className}`}>
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;