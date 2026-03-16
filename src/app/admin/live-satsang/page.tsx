'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { dataManager, useCollection } from '@/lib/data-manager';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Youtube, Video, Trash2, AlertCircle, PlusCircle, FilePenLine, Star, UploadCloud, Bell, Play, ExternalLink } from 'lucide-react';
import type { SatsangVideo } from '@/lib/types';
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
import { VideoPlayer } from '@/components/VideoPlayer';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import EditVideoDialog from '@/components/EditVideoDialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUpload } from '@/hooks/use-upload';

const extractVideoDetails = (input: string): { embedUrl: string; videoId: string } | null => {
    if (!input || typeof input !== 'string') {
        return null;
    }
    
    const trimmedInput = input.trim();
    if (!trimmedInput) {
        return null;
    }
    
    // Handle various YouTube URL formats
    const youtubeIdRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|v\/|e(?:mbed)?\/|live\/|watch\?v=)|youtu\.be\/)([^"&?\/ ]{11})/;
    const idMatch = trimmedInput.match(youtubeIdRegex);

    if (idMatch && idMatch[1]) {
        const videoId = idMatch[1];
        return { embedUrl: `https://www.youtube.com/embed/${videoId}`, videoId: videoId };
    }
    
    // Handle direct embed URLs
    const embedRegex = /(?:youtube\.com\/embed\/)([^"&?\/ ]+)/;
    const embedMatch = trimmedInput.match(embedRegex);
    
    if (embedMatch && embedMatch[1]) {
        const videoId = embedMatch[1];
        return { embedUrl: `https://www.youtube.com/embed/${videoId}`, videoId: videoId };
    }
    
    return null;
};

const youtubeVideoSchema = z.object({
  title: z.string().min(3, 'A title is required.'),
  description: z.string().optional(),
  videoInput: z.string().refine(val => extractVideoDetails(val) !== null, {
      message: "Please enter a valid YouTube URL or embed code.",
  }),
  isFeatured: z.boolean().default(false),
  isLive: z.boolean().default(false),
});
type YouTubeVideoFormValues = z.infer<typeof youtubeVideoSchema>;

const uploadVideoSchema = z.object({
  title: z.string().min(3, 'A title is required.'),
  description: z.string().optional(),
  videoFile: z.custom<FileList>().refine(files => files && files.length > 0, 'A video file is required.'),
  isFeatured: z.boolean().default(false),
  isLive: z.boolean().default(false),
});
type UploadVideoFormValues = z.infer<typeof uploadVideoSchema>;

function VideoGrid({ videos, processingId, onFeatureToggle, onLiveToggle, onEdit, onDelete }: {
    videos: SatsangVideo[];
    processingId: string | null;
    onFeatureToggle: (video: SatsangVideo) => void;
    onLiveToggle: (video: SatsangVideo) => void;
    onEdit: (video: SatsangVideo) => void;
    onDelete: (video: SatsangVideo) => void;
}) {
    if (videos.length === 0) {
        return (
            <div className="text-center py-12">
                <Video className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-semibold">No Videos Found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                    There are no videos in this section.
                </p>
            </div>
        )
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map(video => (
          <Card key={video.id} className="group relative flex flex-col">
             <Dialog>
              <AlertDialog>
                {video.isFeatured && (
                    <Badge className="absolute top-2 left-2 z-10">
                        <Star className="h-3 w-3 mr-1"/> Featured
                    </Badge>
                )}
                {video.isLive && (
                    <Badge variant="destructive" className="absolute top-2 left-20 z-10">
                        <Play className="h-3 w-3 mr-1"/> Live
                    </Badge>
                )}
                <VideoPlayer video={video} />
                <div className="p-2 flex-grow flex flex-col">
                  <p className="font-semibold text-sm truncate flex-grow">{video.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{video.description || 'No description'}</p>
                </div>
                 <div className="p-2 border-t flex items-center justify-between">
                   <div className="flex items-center space-x-2">
                     <Switch
                       id={`feature-switch-${video.id}`}
                       checked={!!video.isFeatured}
                       onCheckedChange={() => onFeatureToggle(video)}
                       disabled={processingId === video.id}
                     />
                     <Label htmlFor={`feature-switch-${video.id}`} className="text-xs">Featured</Label>
                     <Switch
                       id={`live-switch-${video.id}`}
                       checked={!!video.isLive}
                       onCheckedChange={() => onLiveToggle(video)}
                       disabled={processingId === video.id}
                     />
                     <Label htmlFor={`live-switch-${video.id}`} className="text-xs">Live</Label>
                   </div>
                    <div className="flex gap-1">
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEdit(video)}>
                              <FilePenLine className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive">
                                {processingId === video.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete this video?</AlertDialogTitle>
                                <AlertDialogDescription>This will permanently delete "{video.title}". This action cannot be undone.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => onDelete(video)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </div>
                </div>
              </AlertDialog>
            </Dialog>
          </Card>
        ))}
      </div>
    )
}

export default function AdminLiveSatsangPage() {
  const { toast } = useToast();
  const { uploadFile } = useUpload();
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [editingVideo, setEditingVideo] = useState<SatsangVideo | null>(null);

  // Use collection for live satsang videos
  const videos = useCollection<SatsangVideo>('live_satsang_videos');

  const youtubeForm = useForm<YouTubeVideoFormValues>({
    resolver: zodResolver(youtubeVideoSchema),
    defaultValues: { videoInput: '', title: '', description: '', isFeatured: false, isLive: false },
  });

  const uploadForm = useForm<UploadVideoFormValues>({
    resolver: zodResolver(uploadVideoSchema),
    defaultValues: { title: '', description: '', isFeatured: false, isLive: false },
  });

  const handleAddYouTubeVideo = async (values: YouTubeVideoFormValues) => {
    const details = extractVideoDetails(values.videoInput);
    if (!details) {
        toast({ variant: 'destructive', title: 'Invalid Input', description: 'Could not extract a video from the provided text.'});
        return;
    }
    const videoData = {
      title: values.title,
      description: values.description || '',
      videoId: details.videoId ?? undefined,
      videoUrl: details.embedUrl,
      uploadDate: new Date().toISOString(),
      thumbnailUrl: details.videoId ? `https://i.ytimg.com/vi/${details.videoId}/hqdefault.jpg` : undefined,
      isFeatured: values.isFeatured,
      isLive: values.isLive,
    };
    
    // Save to appropriate collection based on isFeatured and isLive status
    try {
      if (values.isFeatured || values.isLive) {
        // Save to live_satsang_videos collection for featured/live videos
        await dataManager.setDoc('live_satsang_videos', videoData);
        toast({ title: 'Video Added to Live Satsang!', description: `"${values.title}" is now in your live satsang gallery.` });
      } else {
        // Save to satsangVideos collection for regular videos
        await dataManager.setDoc('satsangVideos', videoData);
        toast({ title: 'Video Added to General Videos!', description: `"${values.title}" is now in your general video gallery.` });
      }
      youtubeForm.reset();
    } catch(e) {
        console.error("Error adding video:", e);
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to add video. Please try again.' });
    }
  };

  const handleUploadVideoFile = async (values: UploadVideoFormValues) => {
      const videoFile = values.videoFile?.[0];
      if (!videoFile) return;

      const videoData: Partial<SatsangVideo> = {
          title: values.title,
          description: values.description || '',
          uploadDate: new Date().toISOString(),
          isFeatured: values.isFeatured,
          isLive: values.isLive,
      };

      try {
          await uploadFile<SatsangVideo>(
            'live_satsang_videos',
            videoData,
            videoFile,
            { fieldName: 'videoUrl', path: 'live-satsang-videos' }
          );
          uploadForm.reset();
      } catch(e) {
          // Error is handled by the hook
      }
  }
  
  const handleDelete = async (video: SatsangVideo) => {
    setProcessingId(video.id);

    try {
      dataManager.deleteDoc('live_satsang_videos', video.id);
      toast({ title: 'Video Deleted', description: 'The video has been permanently removed.' });
    } catch (e: any) {
      console.error("Delete error:", e);
      toast({ variant: 'destructive', title: 'Deletion Failed', description: e.message });
    } finally {
      setProcessingId(null);
    }
  }

  const handleFeatureToggle = async (video: SatsangVideo) => {
    setProcessingId(video.id);
    const newStatus = !video.isFeatured;
    try {
        await dataManager.setDoc('live_satsang_videos', { ...video, isFeatured: newStatus }, video.id);
        toast({
            title: `Video ${newStatus ? 'Featured' : 'Unfeatured'}`,
            description: `"${video.title}" is now ${newStatus ? 'featured' : 'no longer featured'}.`
        });
    } catch (e: any) {
        console.error("Error updating feature status:", e);
        toast({ variant: 'destructive', title: 'Update Failed', description: e.message });
    } finally {
        setProcessingId(null);
    }
  }

  const handleLiveToggle = async (video: SatsangVideo) => {
    setProcessingId(video.id);
    const newStatus = !video.isLive;
    try {
        await dataManager.setDoc('live_satsang_videos', { ...video, isLive: newStatus }, video.id);
        if (newStatus) {
            // Send notification when going live
            await sendLiveNotification(video);
        }
        toast({
            title: `Video ${newStatus ? 'Going Live' : 'Offline'}`,
            description: `"${video.title}" is now ${newStatus ? 'live' : 'offline'}.`
        });
    } catch (e: any) {
        console.error("Error updating live status:", e);
        toast({ variant: 'destructive', title: 'Update Failed', description: e.message });
    } finally {
        setProcessingId(null);
    }
  }

  const sendLiveNotification = async (video: SatsangVideo) => {
    try {
      // Send notification to all subscribed users
      const response = await fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Live Satsang Started!',
          body: `${video.title} is now live. Join now!`,
          icon: '/icons/icon-192x192.png',
          data: {
            url: '/live-satsang',
            videoId: video.id
          }
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send notification');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }
  
  const sortedVideos = videos?.sort((a,b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
  const featuredVideos = sortedVideos?.filter(v => v.isFeatured);
  const liveVideos = sortedVideos?.filter(v => v.isLive);
  const regularVideos = sortedVideos?.filter(v => !v.isFeatured && !v.isLive);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl flex items-center gap-2">
            <Video /> Live Satsang Management
          </CardTitle>
          <CardDescription>
            Manage live satsang videos. Add YouTube links or upload files. Mark as "featured" to show in the LIVE Satsang tab and "live" to send notifications to users.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="youtube">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="youtube"><Youtube className="mr-2 h-4 w-4" /> Add from YouTube</TabsTrigger>
                    <TabsTrigger value="upload"><UploadCloud className="mr-2 h-4 w-4"/> Upload a File</TabsTrigger>
                </TabsList>
                <TabsContent value="youtube" className="pt-4">
                    <Form {...youtubeForm}>
                        <form onSubmit={youtubeForm.handleSubmit(handleAddYouTubeVideo)} className="space-y-6">
                            <FormField control={youtubeForm.control} name="videoInput" render={({ field }) => (
                                <FormItem><FormLabel>YouTube URL or Embed Code</FormLabel><FormControl><Textarea placeholder='<iframe width="560"... or https://www.youtube.com/watch?v=...' {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={youtubeForm.control} name="title" render={({ field }) => (
                                <FormItem><FormLabel>Video Title</FormLabel><FormControl><Input placeholder="Enter a title for the video" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={youtubeForm.control} name="description" render={({ field }) => (
                                <FormItem><FormLabel>Description (Optional)</FormLabel><FormControl><Textarea placeholder="Enter a brief description" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField control={youtubeForm.control} name="isFeatured" render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <FormLabel>Feature this video?</FormLabel>
                                            <p className="text-xs text-muted-foreground">Show in featured section of Live Satsang page</p>
                                        </div>
                                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                    </FormItem>
                                )} />
                                <FormField control={youtubeForm.control} name="isLive" render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <FormLabel>Mark as Live?</FormLabel>
                                            <p className="text-xs text-muted-foreground">Send notification to users when going live</p>
                                        </div>
                                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                    </FormItem>
                                )} />
                            </div>
                            <Button type="submit" disabled={youtubeForm.formState.isSubmitting} className="w-full">
                                {youtubeForm.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />} Add YouTube Video
                            </Button>
                        </form>
                    </Form>
                </TabsContent>
                <TabsContent value="upload" className="pt-4">
                     <Form {...uploadForm}>
                        <form onSubmit={uploadForm.handleSubmit(handleUploadVideoFile)} className="space-y-6">
                            <FormField control={uploadForm.control} name="videoFile" render={({ field }) => (
                                <FormItem><FormLabel>Video File</FormLabel><FormControl><Input type="file" accept="video/*" onChange={(e) => field.onChange(e.target.files)} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={uploadForm.control} name="title" render={({ field }) => (
                                <FormItem><FormLabel>Video Title</FormLabel><FormControl><Input placeholder="Enter a title for the video" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={uploadForm.control} name="description" render={({ field }) => (
                                <FormItem><FormLabel>Description (Optional)</FormLabel><FormControl><Textarea placeholder="Enter a brief description" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField control={uploadForm.control} name="isFeatured" render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <FormLabel>Feature this video?</FormLabel>
                                            <p className="text-xs text-muted-foreground">Mark as featured to show in LIVE Satsang tab</p>
                                        </div>
                                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                    </FormItem>
                                )} />
                                <FormField control={uploadForm.control} name="isLive" render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <FormLabel>Mark as Live?</FormLabel>
                                            <p className="text-xs text-muted-foreground">Send notification to users when going live</p>
                                        </div>
                                        <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                    </FormItem>
                                )} />
                            </div>
                            <Button type="submit" disabled={uploadForm.formState.isSubmitting} className="w-full">
                                {uploadForm.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />} Upload and Add Video
                            </Button>
                        </form>
                    </Form>
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Live Satsang Video Gallery</CardTitle>
            <CardDescription>Manage live satsang videos and their featured/live status.</CardDescription>
        </CardHeader>
        <CardContent>
            <Dialog open={!!editingVideo} onOpenChange={(isOpen) => !isOpen && setEditingVideo(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Video</DialogTitle>
                    </DialogHeader>
                    {editingVideo && (
                        <EditVideoDialog 
                            video={editingVideo} 
                            onOpenChange={(isOpen) => !isOpen && setEditingVideo(null)}
                            onVideoUpdated={() => {}}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {!videos && (
                 <div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
            )}
            
            {videos && (
                 <Tabs defaultValue="all">
                    <TabsList>
                        <TabsTrigger value="all">All Videos ({sortedVideos?.length || 0})</TabsTrigger>
                        <TabsTrigger value="featured">Featured ({featuredVideos?.length || 0})</TabsTrigger>
                        <TabsTrigger value="live">Live ({liveVideos?.length || 0})</TabsTrigger>
                        <TabsTrigger value="regular">Regular ({regularVideos?.length || 0})</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="mt-4">
                        <VideoGrid 
                            videos={sortedVideos || []} 
                            processingId={processingId}
                            onFeatureToggle={handleFeatureToggle}
                            onLiveToggle={handleLiveToggle}
                            onEdit={setEditingVideo}
                            onDelete={handleDelete}
                        />
                    </TabsContent>
                    <TabsContent value="featured" className="mt-4">
                        <VideoGrid 
                            videos={featuredVideos || []} 
                            processingId={processingId}
                            onFeatureToggle={handleFeatureToggle}
                            onLiveToggle={handleLiveToggle}
                            onEdit={setEditingVideo}
                            onDelete={handleDelete}
                        />
                    </TabsContent>
                    <TabsContent value="live" className="mt-4">
                         <VideoGrid 
                            videos={liveVideos || []} 
                            processingId={processingId}
                            onFeatureToggle={handleFeatureToggle}
                            onLiveToggle={handleLiveToggle}
                            onEdit={setEditingVideo}
                            onDelete={handleDelete}
                        />
                    </TabsContent>
                    <TabsContent value="regular" className="mt-4">
                         <VideoGrid 
                            videos={regularVideos || []} 
                            processingId={processingId}
                            onFeatureToggle={handleFeatureToggle}
                            onLiveToggle={handleLiveToggle}
                            onEdit={setEditingVideo}
                            onDelete={handleDelete}
                        />
                    </TabsContent>
                </Tabs>
            )}

            {videos && videos.length === 0 && (
                 <div className="text-center py-12">
                    <Video className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-semibold">No Videos Found</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Add a video using the form above to get started.
                    </p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}