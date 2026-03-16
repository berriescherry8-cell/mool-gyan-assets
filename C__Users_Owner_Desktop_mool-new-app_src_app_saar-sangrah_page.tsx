
'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import type { SaarSangrahPhoto } from '@/lib/types';
import { Camera, Loader2, AlertCircle, ChevronLeft, ChevronRight, ArrowLeft, Expand, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/lib/i18n';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import backendData from '@/lib/backend.json';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';


function SaarSangrahContent() {
  const { t } = useLocale();
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const firestore = useFirestore();

  const photosCollection = useMemoFirebase(
    () => (firestore ? collection(firestore, 'saarSangrahPhotos') : null),
    [firestore]
  );
  const { data: livePhotos, isLoading, error } = useCollection<SaarSangrahPhoto>(photosCollection);
  
  const validPhotos = useMemo(() => {
    const staticPhotos: SaarSangrahPhoto[] = (backendData as any).firestore.structure
      .filter((item: any) => item.path.startsWith('/saarSangrahPhotos/'))
      .map((item: any) => (item.definition as any).schema as SaarSangrahPhoto);

    const allPhotosMap = new Map<string, SaarSangrahPhoto>();
    staticPhotos.forEach(p => allPhotosMap.set(p.id, p));
    livePhotos?.forEach(p => allPhotosMap.set(p.id, p));
    
    return Array.from(allPhotosMap.values())
      .filter(photo => photo.imageUrl)
      .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
  }, [livePhotos]);


  const selectedPhoto = currentIndex !== null ? validPhotos[currentIndex] : null;

  const goToNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex === null || !validPhotos || validPhotos.length === 0) return;
    setCurrentIndex((prevIndex) => ((prevIndex! + 1) % validPhotos.length));
  },[currentIndex, validPhotos.length]);

  const goToPrevious = useCallback((e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (currentIndex === null || !validPhotos || validPhotos.length === 0) return;
      setCurrentIndex((prevIndex) => ((prevIndex! - 1 + validPhotos.length) % validPhotos.length));
  }, [currentIndex, validPhotos.length]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'Escape') {
        setCurrentIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, goToNext, goToPrevious]);


  return (
    <Dialog open={currentIndex !== null} onOpenChange={(isOpen) => !isOpen && setCurrentIndex(null)}>
      <div>
        <div className="flex items-center gap-4 mb-8">
            <Link href="/photos" passHref>
              <Button variant="outline" size="icon" aria-label="Back to Galleries">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-4xl font-bold font-headline m-0">{t.nav_sar_sangrah}</h1>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center text-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="mt-4 text-muted-foreground">Loading gallery...</p>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Fetching Photos</AlertTitle>
            <AlertDescription>
              There was an issue loading the Saar Sangrah gallery.
            </AlertDescription>
          </Alert>
        )}

        {validPhotos && validPhotos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {validPhotos.map((photo, index) => (
               <DialogTrigger asChild key={photo.id}>
                <div onClick={() => setCurrentIndex(index)} className="group block cursor-pointer relative rounded-lg overflow-hidden">
                  <Card className="overflow-hidden">
                    <div className="relative w-full aspect-square">
                      <Image
                        src={photo.imageUrl}
                        alt={'Saar Sangrah Photo'}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                     <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Expand className="h-8 w-8 text-white" />
                    </div>
                  </Card>
                </div>
              </DialogTrigger>
            ))}
          </div>
        ) : !isLoading && (
          <div className="text-center py-12">
            <Camera className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-lg font-semibold">No Photos Found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              It looks like no photos have been added to the Saar Sangrah gallery yet.
            </p>
          </div>
        )}
      </div>

       <DialogContent className="max-w-6xl w-[95vw] h-[90vh] bg-black/80 backdrop-blur-sm border-white/10 p-0 flex flex-col">
           <DialogHeader className="p-2 absolute top-0 left-0 z-10">
            <DialogClose asChild>
                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/20">
                    <X className="h-6 w-6"/>
                </Button>
            </DialogClose>
          </DialogHeader>
          <div className="relative flex-1 grid items-center justify-center">
            {validPhotos.length > 1 && (
                <>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white hover:text-white h-10 w-10 md:h-14 md:w-14 rounded-full"
                        onClick={goToPrevious}
                    >
                        <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white hover:text-white h-10 w-10 md:h-14 md:w-14 rounded-full"
                        onClick={goToNext}
                    >
                        <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
                    </Button>
                </>
            )}
            {selectedPhoto && (
                <Image src={selectedPhoto.imageUrl} alt={'Enlarged Saar Sangrah photo'} fill style={{ objectFit: 'contain' }} className="p-4" />
            )}
          </div>
        </DialogContent>
    </Dialog>
  );
}

export default function SaarSangrahPage() {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    return isClient ? <SaarSangrahContent /> : <div className="flex justify-center items-center h-96"><Loader2 className="h-8 w-8 animate-spin" /></div>;
}
