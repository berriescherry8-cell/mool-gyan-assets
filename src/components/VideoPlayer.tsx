'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  video: {
    videoId?: string;
    videoUrl?: string;
    title: string;
    thumbnailUrl?: string;
  };
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoId = video.videoId;
  const embedUrl = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`
    : video.videoUrl;

  if (!videoId && !video.videoUrl) {
    return (
      <div className="aspect-video w-full bg-black rounded-t-2xl flex items-center justify-center border-b border-white/5">
        <p className="text-white/40 text-xs font-medium tracking-widest uppercase">Video Unavailable</p>
      </div>
    );
  }

  const isYouTube = embedUrl.includes('youtube');

  if (isPlaying) {
    return (
      <div className="aspect-video w-full bg-black rounded-t-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
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

  return (
    <div
      className="aspect-video w-full bg-zinc-950 rounded-t-2xl relative group cursor-pointer overflow-hidden border-b border-white/5"
      onClick={() => setIsPlaying(true)}
    >
      {video.thumbnailUrl ? (
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-[2000ms] group-hover:scale-110 opacity-70"
        />
      ) : (
        <div className="w-full h-full bg-zinc-900"></div>
      )}
      
      {/* Celestial Pulse Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-primary/10 group-hover:opacity-60 transition-opacity" />

      {/* Artistic Play Button: The Refined Celestial Jewel */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
            {/* Pulsing Aura */}
            <div className="absolute inset-[-15px] bg-primary/20 rounded-full blur-xl animate-heartbeat opacity-40"></div>
            
            {/* Celestial Orbit Ring */}
            <div className="absolute inset-[-8px] border border-primary/20 rounded-full animate-spin [animation-duration:15s] opacity-30"></div>
            
            {/* The Main Jewel (Refined Size) */}
            <div className="relative h-10 w-10 bg-zinc-950/60 backdrop-blur-xl rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.3)] transform transition-all duration-700 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(234,179,8,0.5)] border border-primary/40 group-hover:border-primary active:scale-95">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent"></div>
                <svg 
                    className="h-5 w-5 text-primary ml-0.5 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)] filter brightness-110" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path d="M8 5v14l11-7z" />
                </svg>
            </div>
        </div>
      </div>

      {/* Elegant Title Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
          <p className="text-white/90 text-[11px] font-bold truncate uppercase tracking-[0.2em] animate-fade-in-up">
            {video.title}
          </p>
      </div>
    </div>
  );
};