'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { SpiritualPhoto, SaarSangrahPhoto } from '@/lib/types';
import { useMemo } from 'react';
import { Camera, ArrowRight } from 'lucide-react';
import backendData from '@/lib/backend.json';
import { useLocale } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

const GalleryCarousel = ({ photos, href, title, isLoading }: { photos: SpiritualPhoto[]; href: string; title: string; isLoading?: boolean }) => {
  if (isLoading) {
    return (
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, index) => (
            <Card key={index} className="rounded-xl overflow-hidden">
              <Skeleton className="relative aspect-[3/4]" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!photos || photos.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">{title}</h2>
        <div className="flex items-center justify-center h-48 bg-muted/50 rounded-lg">
          <Camera className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>
    );
  }
  
  return (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold font-headline">{title}</h2>
            <Button variant="ghost" asChild>
                <Link href={href}>
                    View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
        <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent className="-ml-4">
            {photos.slice(0, 10).map((photo) => (
                <CarouselItem key={photo.id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5">
                    <Link href={href} className="block">
                        <Card className="rounded-xl overflow-hidden group">
                            <div className="relative aspect-[3/4] overflow-hidden">
                                <Image
                                    src={photo.imageUrl}
                                    alt={photo.title || 'Gallery Photo'}
                                    fill
                                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                        </Card>
                    </Link>
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious className="ml-14" />
            <CarouselNext className="mr-14" />
        </Carousel>
    </div>
  );
};


export default function PhotosPage() {
  const { t } = useLocale();
  const firestore = useFirestore();

  const photosCollection = useMemoFirebase(
    () => (firestore ? collection(firestore, 'spiritualPhotos') : null),
    [firestore]
  );
  const { data: livePhotos, isLoading: isLoadingSpiritual } = useCollection<SpiritualPhoto>(photosCollection);
  
  const saarSangrahCollection = useMemoFirebase(
      () => (firestore ? collection(firestore, 'saarSangrahPhotos') : null),
      [firestore]
  );
  const { data: liveSaarSangrahPhotos, isLoading: isLoadingSaarSangrah } = useCollection<SaarSangrahPhoto>(saarSangrahCollection);

  const { pravasPhotos, generalPhotos, saarSangrahPhotos } = useMemo(() => {
    // Spiritual Photos
    const staticSpiritualPhotos: SpiritualPhoto[] = (backendData as any).firestore.structure
      .filter((item: any) => item.path.startsWith('/spiritualPhotos/'))
      .map((item: any) => (item.definition as any).schema as SpiritualPhoto)
      .filter(p => p.imageUrl);

    const allSpiritualPhotosMap = new Map<string, SpiritualPhoto>();
    staticSpiritualPhotos.forEach(p => allSpiritualPhotosMap.set(p.id, p));
    livePhotos?.forEach(p => allSpiritualPhotosMap.set(p.id, p));
    const allSpiritualPhotos = Array.from(allSpiritualPhotosMap.values());

    const pravas = allSpiritualPhotos.filter(p => p.folder === 'Pravas aur Prachar-Prasar' && p.imageUrl).sort((a,b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
    const general = allSpiritualPhotos.filter(p => p.folder !== 'Pravas aur Prachar-Prasar' && p.imageUrl).sort((a,b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
    
    // Saar Sangrah Photos
    const staticSaarSangrahPhotos: SaarSangrahPhoto[] = (backendData as any).firestore.structure
      .filter((item: any) => item.path.startsWith('/saarSangrahPhotos/'))
      .map((item: any) => (item.definition as any).schema as SaarSangrahPhoto)
      .filter(p => p.imageUrl);

    const allSaarSangrahPhotosMap = new Map<string, SaarSangrahPhoto>();
    staticSaarSangrahPhotos.forEach(p => allSaarSangrahPhotosMap.set(p.id, p));
    liveSaarSangrahPhotos?.forEach(p => allSaarSangrahPhotosMap.set(p.id, p));
    const saarSangrah = Array.from(allSaarSangrahPhotosMap.values())
      .filter(p => p.imageUrl)
      .sort((a,b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());

    return { pravasPhotos: pravas, generalPhotos: general, saarSangrahPhotos: saarSangrah };
  }, [livePhotos, liveSaarSangrahPhotos]);

  const isLoading = isLoadingSpiritual || isLoadingSaarSangrah;
  
  const saarSangrahAsSpiritualPhotos: SpiritualPhoto[] = saarSangrahPhotos.map(p => ({
      id: p.id,
      imageUrl: p.imageUrl,
      uploadDate: p.uploadDate,
      storagePath: p.storagePath,
  }));


  if (isLoading && livePhotos === null && liveSaarSangrahPhotos === null) {
     return (
         <div className="space-y-12">
            <GalleryCarousel photos={[]} href="/photos/pravas-aur-prachar-prasar" title={t.nav_pravas} isLoading={true} />
            <GalleryCarousel photos={[]} href="/saar-sangrah" title={t.nav_sar_sangrah} isLoading={true} />
            <GalleryCarousel photos={[]} href="/photos/gallery" title="General Photo Gallery" isLoading={true} />
        </div>
     );
  }

  return (
      <div className="space-y-12">
        <h1 className="text-4xl font-bold font-headline text-center">{t.nav_photos}</h1>
        
         {(pravasPhotos.length === 0 && generalPhotos.length === 0 && saarSangrahPhotos.length === 0 && !isLoading) ? (
            <div className="text-center py-16">
              <Camera className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-2xl font-semibold">No Galleries Found</h3>
              <p className="mt-2 text-muted-foreground">
                It looks like no photos have been uploaded yet.
              </p>
          </div>
         ) : (
            <div className="space-y-12">
                <GalleryCarousel photos={pravasPhotos} href="/photos/pravas-aur-prachar-prasar" title={t.nav_pravas} isLoading={isLoading && livePhotos === null} />
                <GalleryCarousel photos={saarSangrahAsSpiritualPhotos} href="/saar-sangrah" title={t.nav_sar_sangrah} isLoading={isLoading && liveSaarSangrahPhotos === null} />
                <GalleryCarousel photos={generalPhotos} href="/photos/gallery" title="General Photo Gallery" isLoading={isLoading && livePhotos === null} />
            </div>
         )}
      </div>
  );
}