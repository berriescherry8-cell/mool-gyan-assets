
'use client';

import { useCollection } from '@/lib/data-manager';
import type { ReferenceDocument } from '@/lib/types';
import { Loader2, AlertCircle, FileText, Download } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/lib/i18n';
import Image from 'next/image';

export default function ReferencePage() {
  const { t } = useLocale();
  const documents = useCollection<ReferenceDocument>('referenceDocuments');

  const sortedDocuments = documents?.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
  const guruParichayImage = "https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/WhatsApp_Image_2025-12-30_at_8.39.57_AM_(1)_-_Copy.jpeg";

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 font-headline">{t.nav_reference}</h1>

      {/* Guru Parichay Section */}
      <Card className="relative mb-12 overflow-hidden group">
        <div className="absolute inset-0">
          <Image
            src={guruParichayImage}
            alt="Satguru Nitin Das Ji"
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        <div className="relative p-6 md:p-8 text-white flex flex-col justify-end min-h-[500px]">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="font-headline text-4xl text-white drop-shadow-lg">{t.nav_guru_parichay}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-white/80 whitespace-pre-line leading-relaxed text-base max-h-60 overflow-y-auto pr-4">
              {t.guru_parichay_content}
            </p>
          </CardContent>
        </div>
      </Card>


      {/* Existing Reference Documents Section */}
      {sortedDocuments && sortedDocuments.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedDocuments.map((doc) => (
            <Card key={doc.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-primary" />
                  {doc.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                 <p className="text-sm text-muted-foreground">Click the button below to view or download the document.</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Open Document
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-2xl font-semibold">No Documents Found</h3>
          <p className="mt-2 text-muted-foreground">
            Reference materials will be available here soon.
          </p>
        </div>
      )}
    </div>
  );
}
