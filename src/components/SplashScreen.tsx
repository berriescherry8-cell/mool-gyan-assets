'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function SplashScreen() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2800); // Slightly longer so the image is clearly visible

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Main splash image – centered and responsive */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 mb-6">
        <img
          src="https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/8fed3dd2327e742d462ae35e2dd29bc2598d3b05/splash.png"
          alt="Mool Gyan Splash"
          className="w-full h-full object-contain drop-shadow-2xl animate-pulse-slow"
        />
      </div>

      {/* App name with subtle animation */}
      <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary mb-3 tracking-wide animate-fade-in">
        Mool Gyan
      </h1>

      {/* Loading indicator */}
      <div className="flex items-center gap-3 mb-6">
        <Loader2 className="h-7 w-7 animate-spin text-primary/80" />
        <p className="text-lg sm:text-xl text-white/80 font-medium">
          Loading spiritual wisdom...
        </p>
      </div>

      {/* Signature mantra */}
      <p className="text-base sm:text-lg text-primary/90 font-medium tracking-wider animate-fade-in-delay">
        Sahib Bandagi Satnam
      </p>

      {/* Optional subtle footer text */}
      <p className="absolute bottom-8 text-xs text-white/40">
        © Mool Gyan App
      </p>
    </div>
  );
}