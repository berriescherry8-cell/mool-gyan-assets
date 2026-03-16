
'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Download } from 'lucide-react';
import React, { Suspense } from 'react';
import { useToast } from '@/hooks/use-toast';

function PdfViewer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pdfUrl = searchParams.get('url');
  const bookTitle = searchParams.get('title') || 'document';
  const { toast } = useToast();

  if (!pdfUrl) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p>No PDF URL provided.</p>
      </div>
    );
  }

  const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`;

  const handleDownload = async () => {
    if (!pdfUrl) {
      toast({
        variant: 'destructive',
        title: 'Download Failed',
        description: 'No URL is available for this document.',
      });
      return;
    }
    const fileName = `${bookTitle}.pdf`;
    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error('Network response was not ok.');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast({
        title: 'Download Started',
        description: `"${fileName}" is being saved.`,
      });
    } catch (error) {
      console.error('Download error:', error);
      // Fallback for CORS or other issues
      window.open(pdfUrl, '_blank');
      toast({
        title: 'Download Started',
        description: 'Your browser will handle the download.',
      });
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex-shrink-0 mb-4 flex justify-between items-center">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>
      <div className="flex-grow relative border rounded-lg overflow-hidden bg-muted">
         <div className="absolute inset-0 flex flex-col items-center justify-center -z-10 bg-muted">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="ml-4 mt-2">Loading PDF Viewer...</p>
        </div>
        <iframe
          src={viewerUrl}
          title={bookTitle}
          className="w-full h-full border-0 relative z-10"
        />
      </div>
    </div>
  );
}

export default function PdfViewerPage() {
  return (
    <Suspense fallback={<div className="flex h-full w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <PdfViewer />
    </Suspense>
  );
}
