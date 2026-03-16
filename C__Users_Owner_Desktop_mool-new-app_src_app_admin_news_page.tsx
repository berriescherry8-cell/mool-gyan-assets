
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCollection, useFirestore, useMemoFirebase, errorEmitter } from '@/firebase';
import { collection, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, deleteObject } from "firebase/storage";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Newspaper, Trash2, Edit, AlertCircle, PlusCircle, ExternalLink } from 'lucide-react';
import type { NewsArticle, AppSettings } from '@/lib/types';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { FirestorePermissionError } from '@/firebase/errors';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useUpload } from '@/hooks/use-upload';
import { Slider } from '@/components/ui/slider';
import { useStorage } from '@/firebase';
import { firebaseConfig } from '@/firebase/config';


const newsSchema = z.object({
  title: z.string().min(1, "Title is required."),
  content: z.string().min(1, "Content is required."),
  imageFile: z.custom<FileList>().optional(),
  showInTicker: z.boolean().default(false),
});

type NewsFormValues = z.infer<typeof newsSchema>;

const editNewsSchema = newsSchema.extend({
    imageFile: z.custom<FileList>().optional(), // Make image optional for editing
});

type EditNewsFormValues = z.infer<typeof editNewsSchema>;


export default function ManageNewsPage() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const storage = useStorage();
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const { uploadFile } = useUpload();
  const [fontSize, setFontSize] = useState(14);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const storageBucket = firebaseConfig.storageBucket;
  const storageLink = `https://console.firebase.google.com/project/${firebaseConfig.projectId}/storage/${storageBucket}/files/newsArticles`;


  const articlesCollection = useMemoFirebase(() => firestore ? collection(firestore, 'newsArticles') : null, [firestore]);
  const { data: articles, isLoading, error } = useCollection<NewsArticle>(articlesCollection);

  const form = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: '',
      content: '',
      showInTicker: false,
    },
  });

  const editForm = useForm<EditNewsFormValues>({
    resolver: zodResolver(editNewsSchema),
  });
  
  useEffect(() => {
    if (!firestore) return;
    const settingsRef = doc(firestore, 'appSettings', 'news');
    getDoc(settingsRef).then(docSnap => {
        if (docSnap.exists()) {
            const settings = docSnap.data() as AppSettings;
            if(settings.fontSize) {
                setFontSize(settings.fontSize);
            }
        }
    });
  }, [firestore]);


  const handleAddArticle = async (values: NewsFormValues) => {
    const articleData = {
        title: values.title,
        content: values.content,
        publicationDate: new Date().toISOString(),
        author: 'Admin',
        showInTicker: values.showInTicker,
    };
    const imageFile = values.imageFile?.[0] ?? null;

    try {
      await uploadFile(
          'newsArticles',
          articleData,
          imageFile,
          imageFile ? { fieldName: 'imageUrl', path: 'newsArticles' } : null
      );
      form.reset();
      setIsDialogOpen(false);
    } catch (error) {
        console.error("Failed to add article:", error);
    }
  };
  
  const handleEditArticle = async (values: EditNewsFormValues) => {
      if (!editingArticle) return;
      const imageFile = values.imageFile?.[0];
      const { imageFile: _imageFile, ...articleData } = values;
      
      try {
        await uploadFile(
          'newsArticles',
          articleData,
          imageFile || null,
          imageFile ? { fieldName: 'imageUrl', path: 'newsArticles' } : null,
          editingArticle.id
        );
        setIsEditDialogOpen(false);
        setEditingArticle(null);
      } catch(error) {
        console.error("Failed to edit article:", error);
      }
  }

  const handleDeleteArticle = async (article: NewsArticle) => {
    if (!storage || !firestore) return;
    setProcessingId(article.id);
    try {
        if (article.storagePath) {
            const imageRef = ref(storage, article.storagePath);
            await deleteObject(imageRef).catch(err => {
                if (err.code !== 'storage/object-not-found') {
                    console.warn(`Image not found in storage at path: ${article.storagePath}, but proceeding to delete Firestore doc.`);
                } else {
                    throw err;
                }
            });
        }
    } catch (e: any) {
         toast({ variant: "destructive", title: "Image Deletion Failed", description: "Could not delete the associated image, but will still try to delete the article record." });
    }

    const docRef = doc(firestore, 'newsArticles', article.id);
    deleteDoc(docRef)
        .then(() => {
            toast({ title: 'Article Deleted', description: `"${article.title}" has been removed.` });
        })
        .catch(async (e: any) => {
             errorEmitter.emit('permission-error', new FirestorePermissionError({
                path: docRef.path,
                operation: 'delete',
            }));
        })
        .finally(() => {
            setProcessingId(null);
        });
  }
  
  const openEditDialog = (article: NewsArticle) => {
    setEditingArticle(article);
    editForm.reset({
        title: article.title,
        content: article.content,
        showInTicker: article.showInTicker || false,
    });
    setIsEditDialogOpen(true);
  }

  const handleFontSizeChange = async () => {
    if (!firestore) return;
    setIsSavingSettings(true);
    try {
      const settingsRef = doc(firestore, 'appSettings', 'news');
      await setDoc(settingsRef, { fontSize: fontSize }, { merge: true });
      toast({ title: 'Font Size Saved', description: `News content font size has been set to ${fontSize}px.` });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Error Saving Settings', description: e.message });
    } finally {
      setIsSavingSettings(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Fetching Articles</AlertTitle>
        <AlertDescription>There was an issue loading the news articles.</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
          <CardTitle className="font-headline text-3xl">Manage News</CardTitle>
          <CardDescription>Add, edit, and manage news articles and their visibility in the news ribbon.</CardDescription>
        </div>
        <div className="flex gap-2">
            <Button variant="secondary" asChild>
                <a href={storageLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Manage in Storage
                </a>
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button><PlusCircle /> Add New Article</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                <DialogTitle>Add a New Article</DialogTitle>
                <DialogDescription>Fill out the form to add a new article.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddArticle)} className="space-y-4">
                    <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="Article title" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="content" render={({ field }) => (
                    <FormItem><FormLabel>Content</FormLabel><FormControl><Textarea {...field} rows={5} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField
                        control={form.control}
                        name="imageFile"
                        render={({ field: { onChange, value, ...rest } }) => (
                        <FormItem>
                            <FormLabel>Article Image (Optional)</FormLabel>
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
                    <FormField
                    control={form.control}
                    name="showInTicker"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Show in News Ribbon</FormLabel>
                            <FormDescription>
                            Enable this to show the article title in the scrolling news ribbon on the homepage.
                            </FormDescription>
                        </div>
                        <FormControl>
                            <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        </FormItem>
                    )}
                    />
                    <DialogFooter>
                    <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Add Article'}
                    </Button>
                    </DialogFooter>
                </form>
                </Form>
            </DialogContent>
            </Dialog>
        </div>
        
        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
             <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Edit Article</DialogTitle>
                    <DialogDescription>Make changes to the article details.</DialogDescription>
                </DialogHeader>
                <Form {...editForm}>
                    <form onSubmit={editForm.handleSubmit(handleEditArticle)} className="space-y-4">
                        <FormField control={editForm.control} name="title" render={({ field }) => (
                        <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="Article title" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={editForm.control} name="content" render={({ field }) => (
                        <FormItem><FormLabel>Content</FormLabel><FormControl><Textarea {...field} rows={5} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <FormField
                            control={editForm.control}
                            name="imageFile"
                            render={({ field: { onChange, value, ...rest } }) => (
                            <FormItem>
                                <FormLabel>Replace Image (Optional)</FormLabel>
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
                        <FormField
                          control={editForm.control}
                          name="showInTicker"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel>Show in News Ribbon</FormLabel>
                                <FormDescription>
                                  Show this article in the scrolling news ribbon.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <DialogFooter>
                            <DialogClose asChild><Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button></DialogClose>
                            <Button type="submit" disabled={editForm.formState.isSubmitting}>
                                {editForm.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Changes'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

      </CardHeader>
      <CardContent>
          <div className="border p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold">News Content Font Size</h3>
            <p className="text-sm text-muted-foreground mb-4">Adjust the font size for the content of all news articles.</p>
            <div className="flex items-center gap-4">
              <Slider
                min={10}
                max={24}
                step={1}
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
                className="flex-1"
              />
              <span className="font-bold text-lg w-12 text-center">{fontSize}px</span>
              <Button onClick={handleFontSizeChange} disabled={isSavingSettings}>
                {isSavingSettings ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Save Size
              </Button>
            </div>
          </div>
        {articles && articles.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>In Ribbon</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.sort((a, b) => new Date(b.publicationDate || 0).getTime() - new Date(a.publicationDate || 0).getTime()).map((article) => (
                <TableRow key={article.id} className={processingId === article.id ? 'opacity-50' : ''}>
                  <TableCell>
                      {article.imageUrl ? <Image src={article.imageUrl} alt={article.title || ''} width={64} height={64} className="rounded-md object-cover" /> : <div className='w-16 h-16 bg-muted rounded-md flex items-center justify-center'><Newspaper className='h-8 w-8 text-muted-foreground' /></div>}
                  </TableCell>
                  <TableCell className="font-medium max-w-sm truncate">{article.title}</TableCell>
                   <TableCell>
                    {article.showInTicker ? 
                        <Badge variant='default'>Yes</Badge> : 
                        <Badge variant='outline'>No</Badge>
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(article)} disabled={!!processingId}>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteArticle(article)} disabled={!!processingId}>
                        {processingId === article.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4 text-destructive" />}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12">
            <Newspaper className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-lg font-semibold">No News Articles Found</h3>
            <p className="mt-1 text-sm text-muted-foreground">Add a new article to get started.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
