
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ShoppingCart, BookOpen, Expand, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import OrderDialog from '@/components/OrderDialog';
import { useLocale } from '@/lib/i18n';
import type { Book } from '@/lib/types';
import { placeholderImages } from '@/lib/placeholder-images';
import backendData from '@/lib/backend.json';
import { Badge } from '@/components/ui/badge';

const allBooksData: Book[] = (backendData as any).firestore.structure
  .filter((item:any) => item.path.startsWith('/books/') && (item.definition.schema as any).id)
  .map((item:any) => {
    const schema = item.definition.schema as any;
    return {
      id: schema.id,
      title: schema.title,
      author: schema.author,
      description: schema.description,
      price: schema.price,
      stockStatus: schema.stockStatus,
      imageUrls: schema.imageUrls,
      imageUrl: schema.imageUrl,
      altText: schema.title,
      pdfUrl: schema.pdfUrl,
    } as Book;
  });

const desiredOrder = [
  'videhi-gyan',
  'santo-ka-saar-sandesh',
  'har-har-geeta-chaturth-sanskaran',
  'har-har-geeta-pratham-sanskaran',
  'har-har-geeta-dvitiya-sanskaran',
  'har-har-geeta-tritiya-sanskaran',
  'mool-gyan-ka-divya-prakash',
  'satynam'
];

const allBooks = allBooksData.sort((a, b) => {
  const indexA = desiredOrder.indexOf(a.id);
  const indexB = desiredOrder.indexOf(b.id);

  if (indexA === -1 && indexB === -1) return 0;
  if (indexA === -1) return 1;
  if (indexB === -1) return -1;

  return indexA - indexB;
});


function BookImageDialog({ book, children }: { book: Book; children: React.ReactNode }) {
  const images = (book.imageUrls && book.imageUrls.length > 0) ? book.imageUrls : (book.imageUrl ? [book.imageUrl] : []);
  const hasMultipleImages = images.length > 1;
  const altText = book.title || 'Book cover';

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-black/80 backdrop-blur-sm border-white/10">
        <DialogHeader>
          <DialogTitle className='sr-only'>{book.title}</DialogTitle>
        </DialogHeader>
        {hasMultipleImages ? (
          <Carousel>
            <CarouselContent>
              {images.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="relative w-full h-[80vh]">
                    <Image src={img} alt={`${altText} - page ${index + 1}`} fill style={{ objectFit: 'contain' }} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-white hover:text-white left-2 bg-black/50 hover:bg-black/70 border-white/20" />
            <CarouselNext className="text-white hover:text-white right-2 bg-black/50 hover:bg-black/70 border-white/20" />
          </Carousel>
        ) : images[0] ? (
          <div className="relative w-full h-[80vh]">
            <Image src={images[0]} alt={altText} fill style={{ objectFit: 'contain' }} />
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

function BooksPageContent() {
  const { t } = useLocale();
  const qrCodeImage = placeholderImages.find(p => p.id === 'payment-qr-code');

  if (allBooks.length === 0) {
     return (
         <div className="text-center py-16">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-2xl font-semibold">No Books Available</h3>
            <p className="mt-2 text-muted-foreground">
              Please check back later.
            </p>
        </div>
      );
  }


  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 font-headline">{t.nav_bookstore}</h1>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allBooks.map((book) => {
          const coverImage = book.imageUrl || book.imageUrls?.[0] || 'https://picsum.photos/seed/placeholder-book/400/600';
          const altText = book.altText || book.title || 'Book cover';
          const isForSale = book.stockStatus === 'in-stock' && book.price > 0;
          const isReadable = !!book.pdfUrl;
          const isForReadingOnly = isReadable && !isForSale;
          
          return (
            <Card key={book.id} className="group relative flex flex-col bg-card/50 backdrop-blur-sm overflow-hidden">
                <BookImageDialog book={book}>
                    <div className="overflow-hidden cursor-pointer relative aspect-[2/3]">
                        <Image
                            src={coverImage}
                            alt={altText}
                            width={400}
                            height={600}
                            className="object-cover w-full h-full"
                        />
                         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Expand className="h-8 w-8 text-white" />
                        </div>
                    </div>
                </BookImageDialog>

                <div className="p-4 flex flex-col flex-grow">
                    <h2 className="font-bold text-lg">{book.title}</h2>
                    <p className="text-sm text-muted-foreground">{t.by_author} {book.author}</p>
                    
                    <div className="flex-grow mt-2">
                        <p className="text-xs text-muted-foreground line-clamp-2">{book.description}</p>
                    </div>

                    <div className="flex justify-between items-end mt-4 pt-4 border-t border-white/10">
                        <div>
                             <p className="font-bold text-xl text-primary">
                                {isForSale ? `₹${book.price}` : (isForReadingOnly ? <Badge variant="secondary">Read Only</Badge> : '')}
                            </p>
                            {!isForSale && !isReadable && <Badge variant="destructive">Out of Stock</Badge>}
                        </div>
                        <div className="flex gap-2">
                           {isReadable && book.pdfUrl && (
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/pdf-viewer?url=${encodeURIComponent(book.pdfUrl)}&title=${encodeURIComponent(book.title)}`}>
                                  <BookOpen className="mr-2 h-4 w-4" />
                                  Read
                                </Link>
                              </Button>
                           )}
                           {isForSale && (
                              <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="sm">
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    {t.order_now}
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                    <DialogTitle className="sr-only">Order Book: {book.title}</DialogTitle>
                                    </DialogHeader>
                                    <OrderDialog book={book} qrCodeImage={qrCodeImage} />
                                </DialogContent>
                              </Dialog>
                           )}
                        </div>
                    </div>
                </div>
            </Card>
          )})}
      </div>
    </div>
  );
}

export default function BooksPage() {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    return isClient ? <BooksPageContent /> : <div className="flex justify-center items-center h-96"><Loader2 className="h-8 w-8 animate-spin" /></div>;
}
