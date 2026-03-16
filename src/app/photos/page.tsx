'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, ArrowRight } from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

// Using actual GitHub URLs provided by user
const HARDCODED_PHOTOS = {
  general: [
    {
      id: '1',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/WhatsApp%20Image%202025-12-30%20at%208.39.49%20AM.jpeg',
      title: 'WhatsApp Image 2025-12-30 at 8.39.49 AM',
      description: 'General Gallery Photo',
      folder: 'general',
      uploadDate: '2025-12-30',
    },
    {
      id: '2',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/WhatsApp%20Image%202025-12-30%20at%208.39.53%20AM%20-%20Copy.jpeg',
      title: 'WhatsApp Image 2025-12-30 at 8.39.53 AM - Copy',
      description: 'General Gallery Photo',
      folder: 'general',
      uploadDate: '2025-12-30',
    },
    {
      id: '3',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/WhatsApp%20Image%202025-12-30%20at%208.39.54%20AM%20(1)%20-%20Copy.jpeg',
      title: 'WhatsApp Image 2025-12-30 at 8.39.54 AM (1) - Copy',
      description: 'General Gallery Photo',
      folder: 'general',
      uploadDate: '2025-12-30',
    },
    {
      id: '4',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/WhatsApp%20Image%202025-12-30%20at%208.39.55%20AM%20(1).jpeg',
      title: 'WhatsApp Image 2025-12-30 at 8.39.55 AM (1)',
      description: 'General Gallery Photo',
      folder: 'general',
      uploadDate: '2025-12-30',
    },
    {
      id: '5',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/WhatsApp%20Image%202025-12-30%20at%208.39.55%20AM.jpeg',
      title: 'WhatsApp Image 2025-12-30 at 8.39.55 AM',
      description: 'General Gallery Photo',
      folder: 'general',
      uploadDate: '2025-12-30',
    },
    {
      id: '6',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/WhatsApp%20Image%202025-12-30%20at%208.39.56%20AM%20(1).jpeg',
      title: 'WhatsApp Image 2025-12-30 at 8.39.56 AM (1)',
      description: 'General Gallery Photo',
      folder: 'general',
      uploadDate: '2025-12-30',
    },
    {
      id: '7',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/WhatsApp%20Image%202025-12-30%20at%208.39.56%20AM.jpeg',
      title: 'WhatsApp Image 2025-12-30 at 8.39.56 AM',
      description: 'General Gallery Photo',
      folder: 'general',
      uploadDate: '2025-12-30',
    },
    {
      id: '8',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/WhatsApp%20Image%202025-12-30%20at%208.39.57%20AM%20(1)%20-%20Copy.jpeg',
      title: 'WhatsApp Image 2025-12-30 at 8.39.57 AM (1) - Copy',
      description: 'General Gallery Photo',
      folder: 'general',
      uploadDate: '2025-12-30',
    },
    {
      id: '9',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/WhatsApp%20Image%202025-12-30%20at%208.39.57%20AM%20(2).jpeg',
      title: 'WhatsApp Image 2025-12-30 at 8.39.57 AM (2)',
      description: 'General Gallery Photo',
      folder: 'general',
      uploadDate: '2025-12-30',
    },
    {
      id: '10',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/WhatsApp%20Image%202025-12-30%20at%208.39.57%20AM.jpeg',
      title: 'WhatsApp Image 2025-12-30 at 8.39.57 AM',
      description: 'General Gallery Photo',
      folder: 'general',
      uploadDate: '2025-12-30',
    },
    {
      id: '11',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/WhatsApp%20Image%202025-12-30%20at%208.39.58%20AM%20-%20Copy.jpeg',
      title: 'WhatsApp Image 2025-12-30 at 8.39.58 AM - Copy',
      description: 'General Gallery Photo',
      folder: 'general',
      uploadDate: '2025-12-30',
    },
    {
      id: '12',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/WhatsApp%20Image%202026-01-01%20at%202.06.45%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-01 at 2.06.45 PM',
      description: 'General Gallery Photo',
      folder: 'general',
      uploadDate: '2026-01-01',
    },
    {
      id: '13',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/general-gallery/channels4_profile%20(1).jpg',
      title: 'channels4_profile (1)',
      description: 'General Gallery Photo',
      folder: 'general',
      uploadDate: '2026-01-01',
    },
  ],
  pravas: [
    {
      id: '14',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.50%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.58.50 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '15',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.50%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.58.50 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '16',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.51%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.58.51 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '17',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.51%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.58.51 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '18',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.52%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.58.52 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '19',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.52%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.58.52 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '20',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.53%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.58.53 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '21',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.53%20PM%20(2).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.58.53 PM (2)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '22',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.53%20PM%20(3).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.58.53 PM (3)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '23',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.53%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.58.53 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '24',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.54%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.58.54 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '25',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.54%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.58.54 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '26',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.55%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.58.55 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '27',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.55%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.58.55 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '28',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.56%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.58.56 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '29',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.56%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.58.56 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '30',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.57%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.58.57 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '31',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.57%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.58.57 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '32',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.58%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.58.58 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '33',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.58.58%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.58.58 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '34',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.00%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.00 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '35',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.00%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.00 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '36',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.01%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.01 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '37',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.01%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.01 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '38',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.02%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.02 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '39',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.02%20PM%20(2).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.02 PM (2)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '40',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.02%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.02 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '41',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.03%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.03 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '42',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.03%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.03 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '43',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.04%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.04 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '44',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.04%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.04 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '45',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.05%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.05 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '46',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.05%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.05 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '47',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.06%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.06 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '48',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.06%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.06 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '49',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.07%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.07 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '50',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.07%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.07 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '51',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.08%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.08 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '52',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.08%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.08 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '53',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.09%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.09 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '54',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.09%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.09 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '55',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.10%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.10 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '56',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.10%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.10 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '57',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.11%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.11 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '58',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.11%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.11 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '59',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.12%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.12 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '60',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.12%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.12 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '61',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.13%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.13 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '62',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.13%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.13 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '63',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.14%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.14 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '64',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.14%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.14 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '65',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.15%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.15 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '66',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.15%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.15 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '67',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.16%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.16 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '68',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.17%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.17 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '69',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.18%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.18 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '70',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.18%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.18 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '71',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.19%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.19 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '72',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.19%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.19 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '73',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.20%20PM%20(1).jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.20 PM (1)',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '74',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/WhatsApp%20Image%202026-01-24%20at%205.59.20%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-24 at 5.59.20 PM',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '75',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/pravas_user_add_131.jpg',
      title: 'pravas_user_add_131',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
    {
      id: '76',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/prachar-aur-prasar/pravas_user_add_133.jpg',
      title: 'pravas_user_add_133',
      description: 'Prachar aur Prasar Photo',
      folder: 'pravas',
      uploadDate: '2026-01-24',
    },
  ],
  saarSangrah: [
    {
      id: '77',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202025-12-30%20at%208.01.28%20AM.jpeg',
      title: 'WhatsApp Image 2025-12-30 at 8.01.28 AM',
      description: 'Saar Sangrah Photo',
      folder: 'saarSangrah',
      uploadDate: '2025-12-30',
    },
    {
      id: '78',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202025-12-30%20at%208.01.29%20AM.jpeg',
      title: 'WhatsApp Image 2025-12-30 at 8.01.29 AM',
      description: 'Saar Sangrah Photo',
      folder: 'saarSangrah',
      uploadDate: '2025-12-30',
    },
    {
      id: '79',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202025-12-30%20at%208.01.30%20AM.jpeg',
      title: 'WhatsApp Image 2025-12-30 at 8.01.30 AM',
      description: 'Saar Sangrah Photo',
      folder: 'saarSangrah',
      uploadDate: '2025-12-30',
    },
    {
      id: '80',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202026-01-01%20at%202.05.11%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-01 at 2.05.11 PM',
      description: 'Saar Sangrah Photo',
      folder: 'saarSangrah',
      uploadDate: '2026-01-01',
    },
    {
      id: '81',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202026-01-01%20at%202.05.47%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-01 at 2.05.47 PM',
      description: 'Saar Sangrah Photo',
      folder: 'saarSangrah',
      uploadDate: '2026-01-01',
    },
    {
      id: '82',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202026-01-01%20at%202.06.36%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-01 at 2.06.36 PM',
      description: 'Saar Sangrah Photo',
      folder: 'saarSangrah',
      uploadDate: '2026-01-01',
    },
    {
      id: '83',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202026-01-01%20at%202.06.51%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-01 at 2.06.51 PM',
      description: 'Saar Sangrah Photo',
      folder: 'saarSangrah',
      uploadDate: '2026-01-01',
    },
    {
      id: '84',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202026-01-01%20at%202.06.53%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-01 at 2.06.53 PM',
      description: 'Saar Sangrah Photo',
      folder: 'saarSangrah',
      uploadDate: '2026-01-01',
    },
    {
      id: '85',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202026-01-01%20at%202.06.55%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-01 at 2.06.55 PM',
      description: 'Saar Sangrah Photo',
      folder: 'saarSangrah',
      uploadDate: '2026-01-01',
    },
    {
      id: '86',
      imageUrl: 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/saar-sangrah/WhatsApp%20Image%202026-01-01%20at%202.07.37%20PM.jpeg',
      title: 'WhatsApp Image 2026-01-01 at 2.07.37 PM',
      description: 'Saar Sangrah Photo',
      folder: 'saarSangrah',
      uploadDate: '2026-01-01',
    },
  ],
};

type SpiritualPhoto = {
  id: string;
  imageUrl?: string;
  title?: string;
  description?: string;
  folder?: string;
  uploadDate?: string;
};

const GalleryCarousel = ({ photos, href, title }: { photos: SpiritualPhoto[]; href: string; title: string }) => {
  if (!photos || photos.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">{title}</h2>
        <div className="flex items-center justify-center h-48 bg-muted/50 rounded-lg">
          <Camera className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold font-headline">{title}</h2>
        <Button variant="ghost" asChild>
          <Link href={href}>
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Carousel opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-4">
          {photos.slice(0, 10).map((photo) => (
            <CarouselItem key={photo.id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5">
              <Link href={href} className="block">
                <Card className="rounded-xl overflow-hidden group">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={photo.imageUrl || '/placeholder.png'}
                      alt={photo.title || 'Gallery Photo'}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-14" />
        <CarouselNext className="mr-14" />
      </Carousel>
    </div>
  );
};

export default function PhotosPage() {
  const { t } = useLocale();

  const pravasPhotos = HARDCODED_PHOTOS.pravas;
  const generalPhotos = HARDCODED_PHOTOS.general;
  const saarSangrahPhotos = HARDCODED_PHOTOS.saarSangrah;

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold font-headline text-center">{t.nav_photos}</h1>

      {pravasPhotos.length === 0 && generalPhotos.length === 0 && saarSangrahPhotos.length === 0 ? (
        <div className="text-center py-16">
          <Camera className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-2xl font-semibold">No Galleries Found</h3>
          <p className="mt-2 text-muted-foreground">
            It looks like no photos have been uploaded yet.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          <GalleryCarousel photos={pravasPhotos} href="/photos/pravas-aur-prachar-prasar" title={t.nav_pravas} />
          <GalleryCarousel photos={saarSangrahPhotos} href="/saar-sangrah" title={t.nav_sar_sangrah} />
          <GalleryCarousel photos={generalPhotos} href="/photos/gallery" title="General Photo Gallery" />
        </div>
      )}
    </div>
  );
}
