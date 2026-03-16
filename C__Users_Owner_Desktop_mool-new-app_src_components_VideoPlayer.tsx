
'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface VideoPlayerProps {
  video: {
    videoId?: string;
    videoUrl?: string; // Could be YouTube embed or direct file
    title: string;
    thumbnailUrl?: string;
  };
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Prioritize videoId for YouTube videos to construct the nocookie URL
  const videoId = video.videoId;
  const embedUrl = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`
    : video.videoUrl;

  if (!embedUrl) {
    return (
      <div className="aspect-video w-full bg-black rounded-t-lg flex items-center justify-center">
        <p className="text-white text-xs">Video not available.</p>
      </div>
    );
  }

  const isYouTube = embedUrl.includes('youtube');

  if (isPlaying) {
    return (
      <div className="aspect-video w-full bg-black rounded-t-lg">
        {isYouTube ? (
          <iframe
            src={embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        ) : (
          <video
            src={embedUrl}
            controls
            autoPlay
            poster={video.thumbnailUrl}
            className="w-full h-full"
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    );
  }

  // Render Thumbnail view
  return (
    <div
      className="aspect-video w-full bg-black rounded-t-lg relative group cursor-pointer"
      onClick={() => setIsPlaying(true)}
    >
      {video.thumbnailUrl ? (
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover"
        />
      ) : (
        <div className="w-full h-full bg-muted"></div>
      )}
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
         <div className="h-16 w-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
            <svg className="h-8 w-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
            </svg>
        </div>
      </div>
    </div>
  );
};
