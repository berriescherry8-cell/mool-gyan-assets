'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, ArrowLeft, ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

// Tere diye saare 64 Prachar aur Prasar RAW links
const photos = [
  { id: '1', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.50%20PM%20(1).jpeg', title: 'Prachar 1' },
  { id: '2', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.50%20PM.jpeg', title: 'Prachar 2' },
  { id: '3', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.51%20PM%20(1).jpeg', title: 'Prachar 3' },
  { id: '4', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.51%20PM.jpeg', title: 'Prachar 4' },
  { id: '5', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.52%20PM%20(1).jpeg', title: 'Prachar 5' },
  { id: '6', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.52%20PM.jpeg', title: 'Prachar 6' },
  { id: '7', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.52%20PM.jpeg', title: 'Prachar 7' },
  { id: '8', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.53%20PM%20(1).jpeg', title: 'Prachar 8' },
  { id: '9', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.53%20PM%20(2).jpeg', title: 'Prachar 9' },
  { id: '10', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.53%20PM%20(3).jpeg', title: 'Prachar 10' },
  { id: '11', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.53%20PM.jpeg', title: 'Prachar 11' },
  { id: '12', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.54%20PM%20(1).jpeg', title: 'Prachar 12' },
  { id: '13', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.54%20PM.jpeg', title: 'Prachar 13' },
  { id: '14', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.55%20PM%20(1).jpeg', title: 'Prachar 14' },
  { id: '15', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.55%20PM.jpeg', title: 'Prachar 15' },
  { id: '16', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.56%20PM%20(1).jpeg', title: 'Prachar 16' },
  { id: '17', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.56%20PM.jpeg', title: 'Prachar 17' },
  { id: '18', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.57%20PM%20(1).jpeg', title: 'Prachar 18' },
  { id: '19', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.57%20PM.jpeg', title: 'Prachar 19' },
  { id: '20', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.58%20PM%20(1).jpeg', title: 'Prachar 20' },
  { id: '21', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.58%20PM.jpeg', title: 'Prachar 21' },
  { id: '22', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.00%20PM%20(1).jpeg', title: 'Prachar 22' },
  { id: '23', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.00%20PM.jpeg', title: 'Prachar 23' },
  { id: '24', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.01%20PM%20(1).jpeg', title: 'Prachar 24' },
  { id: '25', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.01%20PM.jpeg', title: 'Prachar 25' },
  { id: '26', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.02%20PM%20(1).jpeg', title: 'Prachar 26' },
  { id: '27', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.02%20PM%20(2).jpeg', title: 'Prachar 27' },
  { id: '28', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.02%20PM.jpeg', title: 'Prachar 28' },
  { id: '29', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.03%20PM%20(1).jpeg', title: 'Prachar 29' },
  { id: '30', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.03%20PM.jpeg', title: 'Prachar 30' },
  { id: '31', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.04%20PM%20(1).jpeg', title: 'Prachar 31' },
  { id: '32', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.04%20PM.jpeg', title: 'Prachar 32' },
  { id: '33', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.05%20PM%20(1).jpeg', title: 'Prachar 33' },
  { id: '34', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.05%20PM.jpeg', title: 'Prachar 34' },
  { id: '35', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.06%20PM%20(1).jpeg', title: 'Prachar 35' },
  { id: '36', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.06%20PM.jpeg', title: 'Prachar 36' },
  { id: '37', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.07%20PM%20(1).jpeg', title: 'Prachar 37' },
  { id: '38', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.07%20PM.jpeg', title: 'Prachar 38' },
  { id: '39', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.08%20PM%20(1).jpeg', title: 'Prachar 39' },
  { id: '40', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.08%20PM.jpeg', title: 'Prachar 40' },
  { id: '41', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.09%20PM%20(1).jpeg', title: 'Prachar 41' },
  { id: '42', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.09%20PM.jpeg', title: 'Prachar 42' },
  { id: '43', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.10%20PM%20(1).jpeg', title: 'Prachar 43' },
  { id: '44', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.10%20PM.jpeg', title: 'Prachar 44' },
  { id: '45', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.11%20PM%20(1).jpeg', title: 'Prachar 45' },
  { id: '46', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.11%20PM.jpeg', title: 'Prachar 46' },
  { id: '47', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.12%20PM%20(1).jpeg', title: 'Prachar 47' },
  { id: '48', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.12%20PM.jpeg', title: 'Prachar 48' },
  { id: '49', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.13%20PM%20(1).jpeg', title: 'Prachar 49' },
  { id: '50', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.13%20PM.jpeg', title: 'Prachar 50' },
  { id: '51', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.14%20PM%20(1).jpeg', title: 'Prachar 51' },
  { id: '52', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.14%20PM.jpeg', title: 'Prachar 52' },
  { id: '53', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.15%20PM%20(1).jpeg', title: 'Prachar 53' },
  { id: '54', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.15%20PM.jpeg', title: 'Prachar 54' },
  { id: '55', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.16%20PM.jpeg', title: 'Prachar 55' },
  { id: '56', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.17%20PM%20(1).jpeg', title: 'Prachar 56' },
  { id: '57', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.18%20PM%20(1).jpeg', title: 'Prachar 57' },
  { id: '58', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.18%20PM.jpeg', title: 'Prachar 58' },
  { id: '59', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.19%20PM%20(1).jpeg', title: 'Prachar 59' },
  { id: '60', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.19%20PM.jpeg', title: 'Prachar 60' },
  { id: '61', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.20%20PM%20(1).jpeg', title: 'Prachar 61' },
  { id: '62', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.20%20PM.jpeg', title: 'Prachar 62' },
  { id: '63', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/pravas_user_add_131.jpg', title: 'Prachar 63' },
  { id: '64', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/pravas_user_add_133.jpg', title: 'Prachar 64' },
];

function PravasAurPracharPrasarContent() {
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
        <h1 className="text-4xl font-bold font-headline">Pravas aur Prachar-Prasar</h1>
      </div>

      {photos.length > 0 ? (
        <div className="columns-2 gap-4 sm:columns-3 md:columns-4 lg:columns-5">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setCurrentIndex(index)}
              className="mb-4 break-inside-avoid group block cursor-pointer relative rounded-lg overflow-hidden"
            >
              <Image
                src={photo.url}
                alt={photo.title || 'Prachar Photo'}
                width={500}
                height={500}
                className="h-auto w-full object-cover rounded-lg"
                unoptimized
              />
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

export default function PravasAurPracharPrasarPage() {
  return <PravasAurPracharPrasarContent />;
}