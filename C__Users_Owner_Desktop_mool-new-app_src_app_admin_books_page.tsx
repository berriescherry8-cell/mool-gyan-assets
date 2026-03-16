'use client';

import React, { useState, useMemo, useEffect } from 'react';
import type { Book } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Trash2, AlertCircle, FilePenLine, Loader2 } from 'lucide-react';
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
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import backendData from '@/lib/backend.json';
import { useToast } from '@/hooks/use-toast';
import { useCollection, useFirestore, useMemoFirebase, useStorage } from '@/firebase';
import { collection, doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import EditBookDialog from '@/components/EditBookDialog';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

type ManageableBook = Book & { isStatic?: boolean };

function AdminBooksContent() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const storage = useStorage();
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [editingBook, setEditingBook] = useState<ManageableBook | null>(null);

  const booksCollection = useMemoFirebase(() => (firestore ? collection(firestore, 'books') : null), [firestore]);
  const { data: liveBooks, isLoading, error } = useCollection<Book>(booksCollection);

  const allBooks: ManageableBook[] = useMemo(() => {
    const staticBooks: ManageableBook[] = (backendData as any).firestore.structure
      .filter((item:any) => item.path.startsWith('/books/') && (item.definition.schema as any).id)
      .map((item:any) => ({ ...((item.definition as any).schema as Book), isStatic: true }));

    const allBooksMap = new Map<string, ManageableBook>();
    
    staticBooks.forEach(b => allBooksMap.set(b.id, b));
    
    liveBooks?.forEach(b => allBooksMap.set(b.id, { ...b, isStatic: false }));
    
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

    return Array.from(allBooksMap.values()).sort((a, b) => {
        const indexA = desiredOrder.indexOf(a.id);
        const indexB = desiredOrder.indexOf(b.id);
        if (indexA === -1 && indexB === -1) return 0;
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });
  }, [liveBooks]);

  const handleDelete = async (book: ManageableBook) => {
    if (book.isStatic) {
        toast({
            variant: 'destructive',
            title: 'Action Disabled',
            description: 'Cannot delete statically defined books. Please ask the AI assistant to remove it from the configuration file.',
        });
        return;
    }
    if (!firestore || !storage) return;

    setProcessingId(book.id);
    try {
      if (book.storagePath) {
        const imageRef = ref(storage, book.storagePath);
        await deleteObject(imageRef).catch(err => {
          if (err.code !== 'storage/object-not-found') throw err;
        });
      }
      await deleteDoc(doc(firestore, 'books', book.id));
      toast({ title: 'Book Deleted' });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Deletion Failed', description: e.message });
    } finally {
      setProcessingId(null);
    }
  }

  const handleBookUpdated = () => {
    setEditingBook(null);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Book Inventory</CardTitle>
          <CardDescription>Manage all books in your store. Statically defined books cannot be deleted from this UI.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error Loading Books</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          ) : allBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allBooks.map((book) => {
                const coverImage = book.imageUrl || book.imageUrls?.[0] || 'https://picsum.photos/seed/placeholder-book/400/600';
                const altText = book.title || 'Book cover';
                return (
                  <Card key={book.id} className="group relative flex flex-col">
                    <div className="relative w-full aspect-[2/3] bg-muted">
                      <Image src={coverImage} alt={altText} fill className="object-contain" />
                    </div>
                    <div className="p-3 flex flex-col flex-grow">
                      <h3 className="font-semibold text-sm truncate">{book.title}</h3>
                      <p className="text-xs text-muted-foreground">{book.author}</p>
                      <div className="flex-grow" />
                      <div className="flex justify-between items-center mt-2">
                        <p className="font-bold text-primary">₹{book.price}</p>
                        <Badge variant={book.stockStatus === 'in-stock' ? 'default' : 'destructive'}>
                          {book.stockStatus === 'in-stock' ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </div>
                    </div>
                    <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Dialog open={editingBook?.id === book.id} onOpenChange={(isOpen) => !isOpen && setEditingBook(null)}>
                        <DialogTrigger asChild>
                          <Button variant="secondary" size="icon" className="h-7 w-7" onClick={() => setEditingBook(book)}>
                            <FilePenLine className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        {editingBook?.id === book.id && (
                          <EditBookDialog
                            book={editingBook}
                            onOpenChange={(isOpen) => !isOpen && setEditingBook(null)}
                            onBookUpdated={handleBookUpdated}
                          />
                        )}
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="icon" className="h-7 w-7" disabled={processingId === book.id || book.isStatic}>
                            {processingId === book.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete this book?</AlertDialogTitle>
                            <AlertDialogDescription>This will permanently delete "{book.title}" from the live database. This action cannot be undone.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(book)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-lg font-semibold">No Books Found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                No books were found in the database or configuration file.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminBooksPage() {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    return isClient ? <AdminBooksContent /> : <div className="flex justify-center items-center h-96"><Loader2 className="h-8 w-8 animate-spin" /></div>;
}
