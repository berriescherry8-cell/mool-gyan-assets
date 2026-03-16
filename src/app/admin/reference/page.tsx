'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, UploadCloud, Trash2, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Hardcoded reference documents
const HARDCODED_DOCUMENTS = [
  {
    id: '1',
    title: 'मूल ज्ञान पुस्तक - अध्याय 1',
    fileUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/reference/mool-gyan-chapter-1.pdf',
    uploadDate: '2024-01-15',
  },
  {
    id: '2',
    title: 'सतगुरु के उपदेश - संग्रह',
    fileUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/reference/satguru-updesh.pdf',
    uploadDate: '2024-01-20',
  },
  {
    id: '3',
    title: 'भक्ति मार्ग दिशानिर्देश',
    fileUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/reference/bhakti-marg-guide.pdf',
    uploadDate: '2024-01-25',
  }
];

type ReferenceDocument = {
  id: string;
  title: string;
  fileUrl: string;
  uploadDate: string;
};

export default function AdminReferencePage() {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [documents, setDocuments] = useState<ReferenceDocument[]>(HARDCODED_DOCUMENTS);

  const handleDelete = async (docToDelete: ReferenceDocument) => {
    setIsDeleting(docToDelete.id);
    try {
      // Simulate delete operation
      setTimeout(() => {
        setDocuments(prev => prev.filter(d => d.id !== docToDelete.id));
        toast({
          title: 'Document Deleted',
          description: `"${docToDelete.title}" has been removed.`,
        });
        setIsDeleting(null);
      }, 500);
    } catch (e: any) {
      console.error("Delete error:", e);
      toast({
        variant: 'destructive',
        title: 'Deletion Failed',
        description: e.message,
      });
      setIsDeleting(null);
    }
  }

  const sortedDocuments = documents?.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl flex items-center gap-2">
            <UploadCloud /> Manage Reference Documents
          </CardTitle>
          <CardDescription>Upload new documents (e.g., PDF) to the Reference section.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Document upload functionality is currently disabled in demo mode.</p>
            <Button disabled className="mt-4">
              Upload Document
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Uploaded Documents</CardTitle>
            <CardDescription>Manage existing documents.</CardDescription>
        </CardHeader>
        <CardContent>
            {sortedDocuments && sortedDocuments.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Uploaded On</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedDocuments.map(docItem => (
                      <TableRow key={docItem.id}>
                        <TableCell className="font-medium">{docItem.title}</TableCell>
                        <TableCell>{new Date(docItem.uploadDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right space-x-2">
                           <Button asChild variant="outline" size="sm">
                              <a href={docItem.fileUrl} target="_blank" rel="noopener noreferrer">
                                <Download className="mr-2 h-4 w-4" /> View
                              </a>
                            </Button>
                           <AlertDialog>
                              <AlertDialogTrigger asChild>
                                  <Button variant="destructive" size="sm" disabled={isDeleting === docItem.id}>
                                      {isDeleting === docItem.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                  </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                  <AlertDialogHeader>
                                      <AlertDialogTitle>Delete this document?</AlertDialogTitle>
                                      <AlertDialogDescription>This will permanently delete "{docItem.title}". This action cannot be undone.</AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDelete(docItem)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                                  </AlertDialogFooter>
                              </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            ) : (
                 <div className="text-center py-12">
                    <p className="mt-1 text-sm text-muted-foreground">
                        No documents have been uploaded yet.
                    </p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
