'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

// Sab tere GitHub RAW links (Prachar-Prasar ke 64 + General + Saar Sangrah)
const allPhotos = {
  'general-gallery': [
    { id: 'g1', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/WhatsApp%20Image%202025-12-30%20at%208.39.49%20AM.jpeg' },
    { id: 'g2', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/WhatsApp%20Image%202025-12-30%20at%208.39.53%20AM%20-%20Copy.jpeg' },
    { id: 'g3', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/WhatsApp%20Image%202025-12-30%20at%208.39.54%20AM%20(1)%20-%20Copy.jpeg' },
    { id: 'g4', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/WhatsApp%20Image%202025-12-30%20at%208.39.55%20AM%20(1).jpeg' },
    { id: 'g5', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/WhatsApp%20Image%202025-12-30%20at%208.39.55%20AM.jpeg' },
    { id: 'g6', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/WhatsApp%20Image%202025-12-30%20at%208.39.56%20AM%20(1).jpeg' },
    { id: 'g7', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/WhatsApp%20Image%202025-12-30%20at%208.39.56%20AM.jpeg' },
    { id: 'g8', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/WhatsApp%20Image%202025-12-30%20at%208.39.57%20AM%20(1)%20-%20Copy.jpeg' },
    { id: 'g9', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/WhatsApp%20Image%202025-12-30%20at%208.39.57%20AM%20(2).jpeg' },
    { id: 'g10', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/WhatsApp%20Image%202025-12-30%20at%208.39.57%20AM.jpeg' },
    { id: 'g11', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/WhatsApp%20Image%202025-12-30%20at%208.39.58%20AM%20-%20Copy.jpeg' },
    { id: 'g12', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/WhatsApp%20Image%202026-01-01%20at%202.06.45%20PM.jpeg' },
    { id: 'g13', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/channels4_profile%20(1).jpg' },
  ],

  'prachar-aur-prasar': [
    { id: 'p1', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.50%20PM%20(1).jpeg' },
    { id: 'p2', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.50%20PM.jpeg' },
    { id: 'p3', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.51%20PM%20(1).jpeg' },
    { id: 'p4', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.51%20PM.jpeg' },
    { id: 'p5', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.52%20PM%20(1).jpeg' },
    { id: 'p6', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.52%20PM.jpeg' },
    { id: 'p7', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.52%20PM.jpeg' },
    { id: 'p8', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.53%20PM%20(1).jpeg' },
    { id: 'p9', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.53%20PM%20(2).jpeg' },
    { id: 'p10', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.53%20PM%20(3).jpeg' },
    { id: 'p11', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.53%20PM.jpeg' },
    { id: 'p12', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.54%20PM%20(1).jpeg' },
    { id: 'p13', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.54%20PM.jpeg' },
    { id: 'p14', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.55%20PM%20(1).jpeg' },
    { id: 'p15', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.55%20PM.jpeg' },
    { id: 'p16', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.56%20PM%20(1).jpeg' },
    { id: 'p17', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.56%20PM.jpeg' },
    { id: 'p18', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.57%20PM%20(1).jpeg' },
    { id: 'p19', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.57%20PM.jpeg' },
    { id: 'p20', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.58%20PM%20(1).jpeg' },
    { id: 'p21', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.58%20PM.jpeg' },
    { id: 'p22', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.00%20PM%20(1).jpeg' },
    { id: 'p23', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.00%20PM.jpeg' },
    { id: 'p24', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.01%20PM%20(1).jpeg' },
    { id: 'p25', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.01%20PM.jpeg' },
    { id: 'p26', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.02%20PM%20(1).jpeg' },
    { id: 'p27', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.02%20PM%20(2).jpeg' },
    { id: 'p28', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.02%20PM.jpeg' },
    { id: 'p29', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.03%20PM%20(1).jpeg' },
    { id: 'p30', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.03%20PM.jpeg' },
    { id: 'p31', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.04%20PM%20(1).jpeg' },
    { id: 'p32', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.04%20PM.jpeg' },
    { id: 'p33', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.05%20PM%20(1).jpeg' },
    { id: 'p34', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.05%20PM.jpeg' },
    { id: 'p35', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.06%20PM%20(1).jpeg' },
    { id: 'p36', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.06%20PM.jpeg' },
    { id: 'p37', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.07%20PM%20(1).jpeg' },
    { id: 'p38', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.07%20PM.jpeg' },
    { id: 'p39', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.08%20PM%20(1).jpeg' },
    { id: 'p40', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.08%20PM.jpeg' },
    { id: 'p41', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.09%20PM%20(1).jpeg' },
    { id: 'p42', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.09%20PM.jpeg' },
    { id: 'p43', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.10%20PM%20(1).jpeg' },
    { id: 'p44', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.10%20PM.jpeg' },
    { id: 'p45', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.11%20PM%20(1).jpeg' },
    { id: 'p46', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.11%20PM.jpeg' },
    { id: 'p47', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.12%20PM%20(1).jpeg' },
    { id: 'p48', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.12%20PM.jpeg' },
    { id: 'p49', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.13%20PM%20(1).jpeg' },
    { id: 'p50', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.13%20PM.jpeg' },
    { id: 'p51', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.14%20PM%20(1).jpeg' },
    { id: 'p52', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.14%20PM.jpeg' },
    { id: 'p53', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.15%20PM%20(1).jpeg' },
    { id: 'p54', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.15%20PM.jpeg' },
    { id: 'p55', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.16%20PM.jpeg' },
    { id: 'p56', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.17%20PM%20(1).jpeg' },
    { id: 'p57', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.18%20PM%20(1).jpeg' },
    { id: 'p58', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.18%20PM.jpeg' },
    { id: 'p59', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.19%20PM%20(1).jpeg' },
    { id: 'p60', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.19%20PM.jpeg' },
    { id: 'p61', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.20%20PM%20(1).jpeg' },
    { id: 'p62', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.20%20PM.jpeg' },
    { id: 'p63', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/pravas_user_add_131.jpg' },
    { id: 'p64', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/pravas_user_add_133.jpg' },
  ],

  'saar-sangrah': [
    { id: 's1', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202025-12-30%20at%208.01.28%20AM.jpeg' },
    { id: 's2', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202025-12-30%20at%208.01.29%20AM.jpeg' },
    { id: 's3', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202025-12-30%20at%208.01.30%20AM.jpeg' },
    { id: 's4', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202026-01-01%20at%202.05.11%20PM.jpeg' },
    { id: 's5', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202026-01-01%20at%202.05.47%20PM.jpeg' },
    { id: 's6', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202026-01-01%20at%202.06.36%20PM.jpeg' },
    { id: 's7', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202026-01-01%20at%202.06.51%20PM.jpeg' },
    { id: 's8', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202026-01-01%20at%202.06.53%20PM.jpeg' },
    { id: 's9', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202026-01-01%20at%202.06.55%20PM.jpeg' },
    { id: 's10', url: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202026-01-01%20at%202.07.37%20PM.jpeg' },
  ]
};

export default function AdminPhotosPage() {
  const { toast } = useToast();
  const [selectedFolder, setSelectedFolder] = useState<'general-gallery' | 'prachar-aur-prasar' | 'saar-sangrah'>('general-gallery');

  const currentPhotos = allPhotos[selectedFolder] || [];

  const handleDelete = (id: string) => {
    if (!confirm('Is photo ko GitHub se delete karna hai?')) return;
    
    toast({
      title: 'Manual Delete',
      description: `GitHub Desktop khol kar ${selectedFolder} folder se file delete karo aur push kar do.`,
    });
  };

  const handleAdd = () => {
    toast({
      title: 'Naya Photo Add Karo',
      description: 'GitHub Desktop se file upload karo → folder mein daalo → commit & push karo. Phir yahan page refresh kar dena.',
    });
  };

  return (
    <div className="p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Photos Admin – GitHub Static Mode</CardTitle>
          <CardDescription>Upload/Delete ke liye GitHub Desktop use karo (no backend)</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Select value={selectedFolder} onValueChange={(v) => setSelectedFolder(v as any)}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select Gallery" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general-gallery">General Gallery</SelectItem>
              <SelectItem value="prachar-aur-prasar">Prachar aur Prasar</SelectItem>
              <SelectItem value="saar-sangrah">Saar Sangrah</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Photo (GitHub se)
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{selectedFolder.replace('-', ' ').toUpperCase()} — {currentPhotos.length} Photos</CardTitle>
        </CardHeader>
        <CardContent>
          {currentPhotos.length === 0 ? (
            <p className="text-center py-12 text-muted-foreground">No photos in this folder yet</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {currentPhotos.map(photo => (
                <div key={photo.id} className="relative group rounded-lg overflow-hidden border border-white/10">
                  <div className="relative w-full pt-[100%]">
                    <Image 
                      src={photo.url} 
                      alt={photo.id} 
                      fill 
                      className="object-cover"
                      unoptimized // GitHub RAW ke liye zaroori
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(photo.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground text-center py-4">
        Note: Real delete/add ke liye GitHub repo mein jaake files manage karo → push karo → page refresh karo.
      </div>
    </div>
  );
}