'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, ArrowLeft, ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

// Hardcoded Saar Sangrah photos (tere diye links)
const photos = [
  { id: '1', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202025-12-30%20at%208.01.28%20AM.jpeg', title: 'Saar Sangrah 1' },
  { id: '2', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202025-12-30%20at%208.01.29%20AM.jpeg', title: 'Saar Sangrah 2' },
  { id: '3', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202025-12-30%20at%208.01.30%20AM.jpeg', title: 'Saar Sangrah 3' },
  { id: '4', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202026-01-01%20at%202.05.11%20PM.jpeg', title: 'Saar Sangrah 4' },
  { id: '5', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202026-01-01%20at%202.05.47%20PM.jpeg', title: 'Saar Sangrah 5' },
  { id: '6', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202026-01-01%20at%202.06.36%20PM.jpeg', title: 'Saar Sangrah 6' },
  { id: '7', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202026-01-01%20at%202.06.51%20PM.jpeg', title: 'Saar Sangrah 7' },
  { id: '8', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202026-01-01%20at%202.06.53%20PM.jpeg', title: 'Saar Sangrah 8' },
  { id: '9', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202026-01-01%20at%202.06.55%20PM.jpeg', title: 'Saar Sangrah 9' },
  { id: '10', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202026-01-01%20at%202.07.37%20PM.jpeg', title: 'Saar Sangrah 10' },
  // Baaki photos ke links yahan add kar dena
];

function SaarSangrahContent() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const selectedPhoto = currentIndex !== null ? photos[currentIndex] : null;

  const goToNext = () => {
    if (currentIndex === null || photos.length === 0) return;
    setCurrentIndex((prev) => (prev! + 1) % photos.length);
  };

  const goToPrevious = () => {
    if (currentIndex === null || photos.length === 0) return;
    setCurrentIndex((prev) => (prev! - 1 + photos.length) % photos.length);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/photos">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-4xl font-bold font-headline">Saar Sangrah</h1>
      </div>

      {photos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setCurrentIndex(index)}
              className="group block cursor-pointer relative rounded-lg overflow-hidden"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={photo.url}
                  alt={photo.title || 'Saar Sangrah Photo'}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  unoptimized
                />
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Expand className="h-8 w-8 text-white" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Camera className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-semibold">No Photos Found</h3>
        </div>
      )}

      {selectedPhoto && (
        <Dialog open={currentIndex !== null} onOpenChange={() => setCurrentIndex(null)}>
          <DialogContent className="max-w-6xl w-[95vw] h-[90vh] bg-black/80 backdrop-blur-sm border-white/10 p-0 flex flex-col">
            <DialogHeader className="p-2 absolute top-0 left-0 z-10">
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/20">
                  <X className="h-6 w-6" />
                </Button>
              </DialogClose>
            </DialogHeader>

            <div className="relative flex-1 flex items-center justify-center h-full">
              {photos.length > 1 && (
                <>
                  <Button variant="ghost" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white h-12 w-12 rounded-full" onClick={goToPrevious}>
                    <ChevronLeft className="h-8 w-8" />
                  </Button>
                  <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white h-12 w-12 rounded-full" onClick={goToNext}>
                    <ChevronRight className="h-8 w-8" />
                  </Button>
                </>
              )}
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.title || 'Enlarged photo'}
                fill
                style={{ objectFit: 'contain' }}
                className="p-4"
                unoptimized
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default function SaarSangrahPage() {
  return <SaarSangrahContent />;
}