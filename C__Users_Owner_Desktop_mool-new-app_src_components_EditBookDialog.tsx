'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import type { Book } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useUpload } from '@/hooks/use-upload';
import { useStorage, useFirestore } from '@/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { doc, setDoc } from 'firebase/firestore';

const bookFormSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  author: z.string().min(1, 'Author is required.'),
  description: z.string().optional(),
  price: z.coerce.number().min(0, 'Price must be a positive number.'),
  stockStatus: z.enum(['in-stock', 'out-of-stock']),
  coverImage: z.custom<FileList>().optional(),
});

type BookFormValues = z.infer<typeof bookFormSchema>;

interface EditBookDialogProps {
  book: Book;
  onOpenChange: (open: boolean) => void;
  onBookUpdated: () => void;
}

export default function EditBookDialog({ book, onOpenChange, onBookUpdated }: EditBookDialogProps) {
  const { toast } = useToast();
  const storage = useStorage();
  const { uploadFile } = useUpload();
  const firestore = useFirestore();


  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: book.title || '',
      author: book.author || '',
      description: book.description || '',
      price: book.price || 0,
      stockStatus: book.stockStatus || 'in-stock',
    },
  });

  const onSubmit = async (values: BookFormValues) => {
    if (!firestore) {
        toast({variant: 'destructive', title: 'Error', description: 'Database not available.'})
        return;
    }
    const imageFile = values.coverImage?.[0];
    const { coverImage, ...bookData } = values;

    try {
        if (imageFile && book.storagePath) {
            const oldImageRef = ref(storage, book.storagePath);
            await deleteObject(oldImageRef).catch(err => console.warn("Old image deletion failed, may not exist:", err));
        }

        const docRef = doc(firestore, 'books', book.id);
        const finalData: Partial<Book> = { ...bookData };

        if (imageFile) {
            await uploadFile(
                'books',
                bookData,
                imageFile,
                { fieldName: 'imageUrl', path: 'book-covers' },
                book.id
            );
        } else {
             await setDoc(docRef, finalData, { merge: true });
        }

        toast({title: 'Book updated successfully!'})
        onBookUpdated();
        onOpenChange(false);
    } catch (e: any) {
        console.error('Error updating book: ', e);
    }
  };

  return (
    <DialogContent className="max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogDescription>
          Modify the details for "{book.title}".
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
           <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="author" render={({ field }) => (
                <FormItem><FormLabel>Author</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem><FormLabel>Price (₹)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="stockStatus" render={({ field }) => (
                <FormItem><FormLabel>Stock Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                        <SelectContent>
                            <SelectItem value="in-stock">In Stock</SelectItem>
                            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                        </SelectContent>
                    </Select>
                <FormMessage /></FormItem>
            )}/>
            <FormField
                control={form.control}
                name="coverImage"
                render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                    <FormLabel>Update Cover Image (Optional)</FormLabel>
                    <FormControl>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onChange(e.target.files)}
                        {...rest}
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
          <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
