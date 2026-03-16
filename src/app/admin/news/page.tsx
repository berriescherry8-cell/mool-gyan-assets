'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Loader2, Newspaper, Trash2, Edit, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

// Hardcoded news articles
const HARDCODED_NEWS = [
  {
    id: '1',
    title: 'सतगुरु का नया सत्संग शुरू',
    content: 'आज से सतगुरु का नया सत्संग शुरू हो गया है। सभी भक्तों से अनुरोध है कि नियमित रूप से भाग लें।',
    publicationDate: '2024-01-15',
    author: 'Admin',
    showInTicker: true,
    imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/news/satsang.jpg',
  },
  {
    id: '2',
    title: 'मूल ज्ञान पुस्तक का विमोचन',
    content: 'सतगुरु की नई पुस्तक "मूल ज्ञान" का विमोचन समारोह 25 जनवरी को होगा।',
    publicationDate: '2024-01-20',
    author: 'Admin',
    showInTicker: false,
    imageUrl: null,
  },
  {
    id: '3',
    title: 'नए मंदिर का निर्माण कार्य शुरू',
    content: 'ग्राम में नए मंदिर का निर्माण कार्य आज से शुरू हो गया है। सभी भक्तों का सहयोग अपेक्षित है।',
    publicationDate: '2024-01-25',
    author: 'Admin',
    showInTicker: true,
    imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/news/temple.jpg',
  }
];

type NewsArticle = {
  id: string;
  title: string;
  content: string;
  publicationDate: string;
  author: string;
  showInTicker: boolean;
  imageUrl: string | null;
};

export default function ManageNewsPage() {
  const { toast } = useToast();
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [articles, setArticles] = useState<NewsArticle[]>(HARDCODED_NEWS);

  const handleDeleteArticle = async (article: NewsArticle) => {
    setProcessingId(article.id);
    try {
      // Simulate delete operation
      setTimeout(() => {
        setArticles(prev => prev.filter(a => a.id !== article.id));
        toast({
          title: 'Article Deleted',
          description: `"${article.title}" has been removed.`,
        });
        setProcessingId(null);
      }, 500);
    } catch (e: any) {
      console.error("Error deleting article: ", e);
      toast({
        variant: "destructive",
        title: "Deletion Failed",
        description: e.message || "Could not delete the article.",
      });
      setProcessingId(null);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
          <CardTitle className="font-headline text-3xl">Manage News</CardTitle>
          <CardDescription>Add, edit, and manage news articles and their visibility in the news ribbon.</CardDescription>
        </div>
        <div className="flex gap-2">
            <Button disabled>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Article
            </Button>
        </div>
      </CardHeader>
      <CardContent>
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
                    <Button variant="ghost" size="icon" disabled>
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
