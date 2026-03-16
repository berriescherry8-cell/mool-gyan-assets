
'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowRight, BookOpen, Camera, Video, Library, Wifi } from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import NewsTicker from '@/components/NewsTicker';

export default function Home() {
  const { t } = useLocale();
  const sections = [
    {
      title: t.nav_live_satsang,
      description: 'Watch the latest featured spiritual talks and discourses.',
      icon: Wifi,
      href: '/live-satsang',
      cta: 'Watch Now',
    },
    {
      title: t.nav_satsang,
      description: 'Explore the complete archive of all satsang videos.',
      icon: Video,
      href: '/satsang',
      cta: 'View Archive',
    },
    {
      title: t.nav_photos,
      description: 'View a curated gallery of spiritual and inspirational images.',
      icon: Camera,
      href: '/photos',
      cta: 'Explore Gallery',
    },
    {
      title: t.nav_bookstore,
      description: 'Order spiritual books and materials to aid your journey.',
      icon: BookOpen,
      href: '/books',
      cta: 'Visit Store',
    },
  ];

  return (
    <div className="w-full">
      {/* Futuristic Hero Section */}
      <div className="relative isolate overflow-hidden rounded-xl p-8 md:p-12 text-center h-[50vh] flex flex-col justify-center items-center -mx-4 md:-mx-6 lg:-mx-8">
        {/* Animated Background */}
        <div 
            className="absolute inset-0 -z-10 h-full w-full bg-cover bg-fixed bg-center animate-pan-background"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop')"}}
        >
             <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <h1 
          className="text-4xl md:text-6xl font-bold font-headline leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white/90 via-white to-white/80 animate-fade-in-up"
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards', opacity: 0 }}
        >
          {t.app_name}
        </h1>
        <div 
          className="mt-4 max-w-2xl mx-auto text-lg text-white/80 animate-fade-in-up"
          style={{ animationDelay: '0.4s', animationFillMode: 'forwards', opacity: 0, whiteSpace: 'pre-line' }}
        >
          <p>सोई गुरु पूरा कहावे दो अक्षर का भेद बताये</p>
          <p>एक छुडाये एक लखाए तब प्राणी निज घर को पाए ......</p>
          <p>साहिब बंदगी सतनाम</p>
        </div>
      </div>

       {/* News Ticker Section */}
      <div className="my-8">
        <NewsTicker />
      </div>

      {/* Glassmorphism Cards Section */}
      <div 
        className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-2"
      >
        {sections.map((section, index) => (
          <Link 
            href={section.href} 
            key={section.title} 
            className="group block animate-fade-in-up"
            style={{ animationDelay: `${0.6 + index * 0.2}s`, animationFillMode: 'forwards', opacity: 0 }}
          >
            <Card className="h-full bg-white/5 border-white/10 backdrop-blur-lg text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/20">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-lg transition-transform duration-300 group-hover:scale-110">
                    <section.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-white">{section.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-white/60">{section.description}</CardDescription>
              </CardContent>
              <CardFooter className="pt-0">
                 <div className="text-sm font-medium text-white flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                    {section.cta} <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-125" />
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
