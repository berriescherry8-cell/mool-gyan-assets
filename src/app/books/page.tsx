'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ShoppingCart, Expand, Shirt, Notebook } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

// Updated books with your new Supabase URLs
const books = [
  {
    id: '1',
    title: 'विदेही ज्ञान',
    author: 'श्री नितिनदास जी साहिब',
    price: 12,
    description: 'विदेही ज्ञान की खोज',
    coverUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/9facf173580f159d7224bdaf808e8feb21fe238e/covers/videhi-gyan.jpeg',
    pdfUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/pdfs/%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%BE%E0%A4%A8%20%E0%A4%B5%E0%A4%BF%E0%A4%B5%E0%A5%87%E0%A4%A6%E0%A5%80%20pdf.pdf',
    stockStatus: 'in-stock',
  },
  {
    id: '2',
    title: 'संतों का सार सन्देश',
    author: 'श्री नितिनदास जी साहिब',
    price: 10,
    description: 'संतों का अनमोल सन्देश',
    coverUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/9facf173580f159d7224bdaf808e8feb21fe238e/covers/snato-ka.jpeg',
    pdfUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/pdfs/2025_12_08%209_20%20am%20Office%20Lens_compressed%20(1).pdf',
    stockStatus: 'in-stock',
  },
  {
    id: '3',
    title: 'हर हर गीता 4th संस्करण',
    author: 'श्री नितिनदास जी साहिब',
    price: 6.5,
    description: 'हर हर गीता घर घर गीता',
    coverUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/9facf173580f159d7224bdaf808e8feb21fe238e/covers/har-geeta%204rth.jpeg',
    pdfUrl: undefined,
    stockStatus: 'in-stock',
  },
  {
    id: '4',
    title: 'हर हर गीता 3rd संस्करण',
    author: 'श्री नितिनदास जी साहिब',
    price: 6.5,
    description: 'हर हर गीता घर घर गीता',
    coverUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/9facf173580f159d7224bdaf808e8feb21fe238e/covers/har-har-geeta-3rd%20.jpeg',
    pdfUrl: undefined,
    stockStatus: 'in-stock',
  },
  {
    id: '5',
    title: 'हर हर गीता 2nd संस्करण',
    author: 'श्री नितिनदास जी साहिब',
    price: 6.5,
    description: 'हर हर गीता घर घर गीता',
    coverUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/9facf173580f159d7224bdaf808e8feb21fe238e/covers/har-geeta-2ndedi%201.jpeg',
    pdfUrl: undefined,
    stockStatus: 'in-stock',
  },
  {
    id: '6',
    title: 'हर हर गीता 1st संस्करण',
    author: 'श्री नितिनदास जी साहिब',
    price: 6.5,
    description: 'हर हर गीता घर घर गीता',
    coverUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/9facf173580f159d7224bdaf808e8feb21fe238e/covers/har-geeta-1nd%201.jpeg',
    pdfUrl: undefined,
    stockStatus: 'in-stock',
  },
  {
    id: '7',
    title: 'सत्यनाम',
    author: 'श्री नितिनदास जी साहिब',
    price: 0,
    description: 'सत्यनाम (केवल पठन हेतु)',
    coverUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/9facf173580f159d7224bdaf808e8feb21fe238e/covers/satya-nam.jpg', // ← yeh bhi Supabase se daal diya agar available hai
    pdfUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/pdfs/2025_12_08%209_20%20am%20Office%20Lens_compressed%20(1).pdf',
    stockStatus: 'read-only',
  },
  {
    id: '8',
    title: 'मूलज्ञान का दिव्य प्रकाश',
    author: 'श्री नितिनदास जी साहिब',
    price: 0,
    description: 'मूल ज्ञान का दिव्य प्रकाश (केवल पठन हेतु)',
    coverUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/9facf173580f159d7224bdaf808e8feb21fe238e/covers/moolgyaPrakash.jpg', // ← Supabase se (agar hai toh)
    pdfUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/pdfs/DOC-20250130-WA0004_compressed%20(1)%20(1).pdf',
    stockStatus: 'read-only',
  },
];

function BookImageDialog({ book, children }: { book: typeof books[0]; children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-black/80 backdrop-blur-sm border-white/10">
        <div className="relative w-full h-[80vh]">
          <Image src={book.coverUrl} alt={book.title} fill className="object-contain" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function BooksPage() {
  const handleOrderClick = (book: typeof books[0]) => {
    // Redirect directly to Google Form with book title pre-filled
    const googleFormUrl = `https://docs.google.com/forms/d/e/1FAIpQLSegbq8uEHe7g3-QZB1qZme4h5uOH-DcwlHbmTx5qJeO-F_8tw/viewform?usp=dialog&entry.123456789=${encodeURIComponent(book.title)}`;
    window.open(googleFormUrl, '_blank');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">मूल ज्ञान की पुस्तकें</h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => {
          const isReadOnly = book.stockStatus === 'read-only' || book.price === 0;
          const isForSale = !isReadOnly && book.price > 0;
          const hasPdf = !!book.pdfUrl;

          return (
            <Card key={book.id} className="overflow-hidden shadow-lg">
              <BookImageDialog book={book}>
                <div className="relative h-64 cursor-pointer">
                  <Image
                    src={book.coverUrl}
                    alt={book.title}
                    fill
                    className="object-cover"
                    unoptimized // Supabase URLs ke liye zaroori (next/image ke caching issue avoid)
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Expand className="h-10 w-10 text-white" />
                  </div>
                </div>
              </BookImageDialog>

              <div className="p-4">
                <h2 className="text-xl font-bold">{book.title}</h2>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-lg font-semibold mt-2">
                  {isReadOnly ? <Badge variant="secondary">केवल पढ़ने हेतु</Badge> : `₹${book.price}`}
                </p>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{book.description}</p>

                <div className="mt-4 flex gap-2">
                  {hasPdf && (
                    <Button asChild variant="outline">
                      <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <BookOpen className="mr-2 h-4 w-4" />
                        पढ़ें
                      </a>
                    </Button>
                  )}
                  {isForSale && (
                    <Button onClick={() => handleOrderClick(book)}>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      ऑर्डर करें
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Merchandise Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">आगामी मर्चेंडाइज़</h2>
        <p className="text-center text-gray-600 mb-12">नितिनदास जी के संदेशों के साथ विशेष टी-शर्ट और डायरी</p>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {/* T-Shirt Merchandise */}
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative h-64">
              <Image
                src="https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/c590461b39a74c9c3d28781874c46901f526147b/image.png"
                alt="Nitindas Ji T-Shirt"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">नितिनदास जी टी-शर्ट</h3>
                  <Badge variant="secondary" className="text-lg px-4 py-2 bg-white/90 text-red-600 font-semibold">
                    जल्द आ रहा है
                  </Badge>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-semibold mb-2">विशेष डिज़ाइन टी-शर्ट</h4>
              <p className="text-gray-600 mb-4">
                नितिनदास जी के प्रेरणादायक संदेशों और आध्यात्मिक चित्रण के साथ बनाया गया विशेष टी-शर्ट।
                उच्च गुणवत्ता कपड़े और आरामदायक फिट।
              </p>
              <div className="flex gap-4">
                <Button variant="outline" disabled className="flex-1">
                  <Shirt className="mr-2 h-4 w-4" />
                  जल्द उपलब्ध
                </Button>
                <Button variant="outline" disabled className="flex-1">
                  अधिसूचना प्राप्त करें
                </Button>
              </div>
            </div>
          </Card>

          {/* Diary Merchandise */}
          <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative h-64 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <Notebook className="h-24 w-24 text-blue-600 opacity-20" />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">आध्यात्मिक डायरी</h3>
                <Badge variant="secondary" className="text-lg px-4 py-2 bg-white/90 text-blue-600 font-semibold">
                  जल्द आ रहा है
                </Badge>
              </div>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-semibold mb-2">प्रेरणादायक डायरी</h4>
              <p className="text-gray-600 mb-4">
                नितिनदास जी के ज्ञानवर्धक उद्धरणों और आध्यात्मिक प्रेरणा से भरी हुई विशेष डायरी।
                रोज़ाना लिखने और चिंतन के लिए आदर्श।
              </p>
              <div className="flex gap-4">
                <Button variant="outline" disabled className="flex-1">
                  <Notebook className="mr-2 h-4 w-4" />
                  जल्द उपलब्ध
                </Button>
                <Button variant="outline" disabled className="flex-1">
                  अधिसूचना प्राप्त करें
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Join KGF Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">क्या आप नितिनदास जी के संदेशों के साथ जुड़ना चाहते हैं?</p>
          <Button asChild className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105">
            <a href="/join" className="flex items-center">
              KGF में शामिल हों
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
