'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, BookOpen, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Hardcoded ALL 8 books with GitHub RAW links (no Supabase, no errors)
const books = [
  {
    id: '1',
    title: 'विदेही ज्ञान',
    author: 'श्री नितिनदास जी साहिब',
    price: 12,
    description: 'विदेही ज्ञान की खोज और आध्यात्मिक मार्ग',
    coverUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/covers/videhi%20gyan%201.jpeg',
    pdfUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/pdfs/%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%BE%E0%A4%A8%20%E0%A4%B5%E0%A4%BF%E0%A4%B5%E0%A5%87%E0%A4%A6%E0%A5%80%20pdf.pdf',
    stockStatus: 'in-stock',
  },
  {
    id: '2',
    title: 'संतों का सार सन्देश',
    author: 'श्री नितिनदास जी साहिब',
    price: 10,
    description: 'संतों के अनमोल वचनों का सार',
    coverUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/covers/snato%20ka%201.jpeg',
    pdfUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/pdfs/2025_12_08%209_20%20am%20Office%20Lens_compressed%20(1).pdf',
    stockStatus: 'in-stock',
  },
  {
    id: '3',
    title: 'हर हर गीता 4th संस्करण',
    author: 'श्री नितिनदास जी साहिब',
    price: 6.5,
    description: 'हर हर गीता घर घर गीता – 4th Edition',
    coverUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/covers/har%20geeta%204rth.jpeg',
    pdfUrl: undefined,
    stockStatus: 'in-stock',
  },
  {
    id: '4',
    title: 'हर हर गीता 3rd संस्करण',
    author: 'श्री नितिनदास जी साहिब',
    price: 6.5,
    description: 'हर हर गीता घर घर गीता – 3rd Edition',
    coverUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/covers/har%20har%20geeta%203rd%201.jpeg',
    pdfUrl: undefined,
    stockStatus: 'in-stock',
  },
  {
    id: '5',
    title: 'हर हर गीता 2nd संस्करण',
    author: 'श्री नितिनदास जी साहिब',
    price: 6.5,
    description: 'हर हर गीता घर घर गीता – 2nd Edition',
    coverUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/covers/har%20geeta%202ndedi%201.jpeg',
    pdfUrl: undefined,
    stockStatus: 'in-stock',
  },
  {
    id: '6',
    title: 'हर हर गीता 1st संस्करण',
    author: 'श्री नितिनदास जी साहिब',
    price: 6.5,
    description: 'हर हर गीता घर घर गीता – 1st Edition',
    coverUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/covers/har%20geeta%201nd%201.jpeg',
    pdfUrl: undefined,
    stockStatus: 'in-stock',
  },
  {
    id: '7',
    title: 'सत्यनाम',
    author: 'श्री नितिनदास जी साहिब',
    price: 0,
    description: 'सत्यनाम – केवल पठन हेतु',
    coverUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/covers/satya-nam.jpg',
    pdfUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/pdfs/2025_12_08%209_20%20am%20Office%20Lens_compressed%20(1).pdf',
    stockStatus: 'read-only',
  },
  {
    id: '8',
    title: 'मूलज्ञान का दिव्य प्रकाश',
    author: 'श्री नितिनदास जी साहिब',
    price: 0,
    description: 'मूल ज्ञान का दिव्य प्रकाश – केवल पठन हेतु',
    coverUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/covers/moolgyaPrakash.jpg',
    pdfUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/pdfs/DOC-20250130-WA0004_compressed%20(1)%20(1).pdf',
    stockStatus: 'read-only',
  },
];

export default function AdminBooksPage() {
  return (
    <div className="p-6 space-y-8">
      <Alert variant="default">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>Admin Mode – Static Only</AlertTitle>
        <AlertDescription>
          Naya book add karne ke liye:
          1. GitHub Desktop se repo kholo (mool-gyan-assets)
          2. covers/ aur pdfs/ folder mein files daalo
          3. Commit & Push karo
          4. Yahan code mein naya book object add kar dena (upar wale array mein)
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Manage Books (8 Books Loaded)</CardTitle>
          <CardDescription>All books using GitHub RAW links – no Supabase</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map(book => (
              <Card key={book.id} className="overflow-hidden shadow-md">
                <div className="relative h-64">
                  <Image
                    src={book.coverUrl}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{book.title}</h3>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                  <p className="font-bold mt-2">
                    {book.stockStatus === 'read-only' ? 'केवल पढ़ने हेतु' : `₹${book.price}`}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {book.pdfUrl && (
                      <Button size="sm" asChild variant="outline">
                        <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Read PDF
                        </a>
                      </Button>
                    )}
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete (GitHub se)
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}