'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import DataTest from '@/components/DataTest';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UploadCloud, Image as ImageIcon, Trash2, AlertCircle, FilePenLine, ExternalLink } from 'lucide-react';
import type { SpiritualPhoto } from '@/lib/types';
import Image from 'next/image';
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
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import EditPhotoDialog from '@/components/EditPhotoDialog'; // keep if you have it, or remove
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { dataManager, useCollection } from '@/lib/data-manager';
import { useUpload } from '@/hooks/use-upload';

const photoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  folder: z.string().optional(),
  photoFile: z.custom<FileList>().refine(files => files && files.length > 0, 'A photo is required.'),
});

type PhotoFormValues = z.infer<typeof photoSchema>;

export default function AdminPhotosirebaPage() {
  const { toast } = useToast();
  const { uploadFile } = useUpload();
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<SpiritualPhoto | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Fetch all photos from our data manager
  const photos = useCollection<SpiritualPhoto>('spiritualPhotos');

  // enforce allowed folder names in case someone tries to submit invalid text
  const allowedFolders = [
    'general',
    'Pravas aur Prachar-Prasar',
    'Saar Sangrah',
    'Reference',
  ];

  const form = useForm<PhotoFormValues>({
    resolver: zodResolver(photoSchema),
    defaultValues: { title: '', description: '', folder: 'general' },
  });

  const onSubmit = async (values: PhotoFormValues) => {
    const photoFile = values.photoFile[0];
    if (!photoFile) return;

    setIsUploading(true);

    try {
      // Use our GitHub upload system
      const photoData = {
        title: values.title || '',
        description: values.description || '',
        folder: values.folder || 'general',
        uploadDate: new Date().toISOString(),
      };

      await uploadFile<SpiritualPhoto>(
        'spiritualPhotos',
        photoData,
        photoFile,
        { fieldName: 'imageUrl', path: 'spiritual-photos' }
      );

      toast({ title: 'Photo Uploaded', description: 'Added to gallery successfully.' });
      form.reset();
    } catch (error: any) {
      console.error("Upload failed:", error);
      toast({ variant: 'destructive', title: 'Upload Failed', description: error.message });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (photo: SpiritualPhoto) => {
    if (!photo.id) return;

    setIsDeleting(photo.id);

    try {
      dataManager.deleteDoc('spiritualPhotos', photo.id);
      toast({ title: 'Photo Deleted', description: 'Removed from gallery.' });
    } catch (e: any) {
      console.error("Delete error:", e);
      toast({ variant: 'destructive', title: 'Deletion Failed', description: e.message });
    } finally {
      setIsDeleting(null);
    }
  };

  const handlePhotoUpdated = (updatedPhoto: SpiritualPhoto) => {
    // Update the photo in our data manager
    dataManager.setDoc('spiritualPhotos', updatedPhoto, updatedPhoto.id);
    setEditingPhoto(null);
  };

  const photosByFolder = useMemo(() => {
    return photos?.reduce((acc, photo) => {
      const folder = photo.folder || 'general';
      if (!acc[folder]) acc[folder] = [];
      acc[folder].push(photo);
      return acc;
    }, {} as Record<string, SpiritualPhoto[]>) || {};
  }, [photos]);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>, onChange: (...event: any[]) => void) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onChange(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  return (
    <div className="space-y-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-3xl flex items-center gap-2">
            <UploadCloud /> Upload Photo
          </CardTitle>
          <CardDescription>Add new images to the photo gallery. Drag & drop or click to select.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="photoFile"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Image File</FormLabel>
                    <FormControl>
                      <div
                        className={cn(
                          'relative w-full h-48 border-2 border-dashed rounded-lg flex flex-col justify-center items-center text-muted-foreground hover:border-primary/50 cursor-pointer transition-colors',
                          isDragging && 'border-primary bg-primary/10'
                        )}
                        onDragEnter={() => setIsDragging(true)}
                        onDragLeave={() => setIsDragging(false)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleFileDrop(e, onChange)}
                      >
                        <Input
                          {...rest}
                          type="file"
                          accept="image/*"
                          onChange={(e) => onChange(e.target.files)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        {value && value.length > 0 ? (
                          <div className="text-center">
                            <ImageIcon className="mx-auto h-10 w-10 text-primary" />
                            <p className="mt-2 font-semibold">{value[0].name}</p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <UploadCloud className="mx-auto h-10 w-10" />
                            <p className="mt-2">Drag & drop or click to select photo</p>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>Title (Optional)</FormLabel>
                  <FormControl><Input placeholder="Title for the photo" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl><Textarea placeholder="Brief description" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField
                control={form.control}
                name="folder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Folder</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value || 'general'}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select folder" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="general">General Photo Gallery</SelectItem>
                        <SelectItem value="Pravas aur Prachar-Prasar">Pravas aur Prachar-Prasar</SelectItem>
                        <SelectItem value="Saar Sangrah">Saar Sangrah</SelectItem>
                        <SelectItem value="Reference">Reference</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button type="submit" disabled={isUploading || form.formState.isSubmitting} className="flex-1">
                  {isUploading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</> : 'Add Photo'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <DataTest />

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Manage Photos</CardTitle>
          <CardDescription>All photos from your GitHub repository. You can edit or delete them here.</CardDescription>
        </CardHeader>
        <CardContent>
          {!photos && <div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}
          {photos && photos.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {photos.map((photo) => (
                <Card key={photo.id} className="group relative overflow-hidden">
                  <Image
                    src={photo.imageUrl || '/placeholder.png'}
                    alt={photo.title || 'Photo'}
                    width={300}
                    height={300}
                    className="object-cover aspect-square rounded-t-lg"
                  />
                  <div className="p-2">
                    <p className="font-semibold text-sm truncate">{photo.title || 'Untitled'}</p>
                    <p className="text-xs text-muted-foreground truncate">{photo.description || '-'}</p>
                    <p className="text-xs text-muted-foreground mt-1">{photo.folder || 'general'}</p>
                    {photo.imageUrl ? (
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded">
                        Shown
                      </span>
                    ) : (
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded">
                        Hidden
                      </span>
                    )}
                  </div>
                  <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="secondary" size="icon" className="h-7 w-7" onClick={() => setEditingPhoto(photo)}>
                            <FilePenLine className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit Photo</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="icon" className="h-7 w-7" disabled={isDeleting === photo.id}>
                                {isDeleting === photo.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Photo?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete "{photo.title || 'this photo'}". Action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(photo)} className="bg-destructive hover:bg-destructive/90">
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TooltipTrigger>
                        <TooltipContent>Delete Photo</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </Card>
              ))}
            </div>
          ) : photos && photos.length === 0 && (
            <div className="text-center py-12">
              <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-lg font-semibold">No Photos Yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Upload your first photo using the form above.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {editingPhoto && (
        <EditPhotoDialog
          photo={editingPhoto}
          onOpenChange={(open) => !open && setEditingPhoto(null)}
          onPhotoUpdated={handlePhotoUpdated}
        />
      )}
    </div>
  );
}