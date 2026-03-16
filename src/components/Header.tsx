'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLocale } from '@/lib/i18n';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { getNavItems } from '@/lib/nav-items';
import { cn } from '@/lib/utils';

export default function Header() {
  const { t } = useLocale();
  const isMobile = useIsMobile();
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/10 bg-background/30 px-4 md:px-6 backdrop-blur-sm">
      <div className="flex items-center gap-2">
         {!isMobile && (
           <SidebarTrigger asChild>
              <Button variant="default" size="icon" className="bg-amber-500 text-black hover:bg-amber-600 shadow-lg shadow-amber-500/20 border-none transition-all duration-300 active:scale-95">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
           </SidebarTrigger>
         )}
      
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://i.ibb.co/RGXxNK8D/d110636d-8ff5-4c7d-8964-6934a17c5812-removebg-preview.png"
            alt="Mool Gyan Logo"
            width={40}
            height={40}
          />
          <span className="text-xl font-bold font-headline text-foreground">
            {t.app_name}
          </span>
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
        <Button asChild size="sm" className="bg-amber-500 text-black hover:bg-amber-600 hidden sm:flex">
          <Link href="/deeksha-aavedan">
            दीक्षा आवेदन
          </Link>
        </Button>
        <LanguageSwitcher />
        {isMobile && (
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="default" size="icon" className="bg-amber-500 text-black hover:bg-amber-600 shadow-lg shadow-amber-500/20 border-none">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-3/4 p-0 bg-black/80 backdrop-blur-lg border-l-white/10">
              <SheetHeader className="sr-only">
                <SheetTitle>Main Menu</SheetTitle>
              </SheetHeader>
               <SidebarNavMobile />
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  );
}

function SidebarNavMobile() {
  const pathname = usePathname();
  const { t } = useLocale();
  const navItems = getNavItems(t);

  // No Firebase auth - admin access always available for demo
  const isAdmin = true;
  const regularItems = navItems.filter(item => !item.isAdmin && !item.isHidden);
  const adminItems = navItems.filter(item => item.isAdmin);


  return (
     <nav className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b border-white/10 px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Image
            src="https://i.ibb.co/RGXxNK8D/d110636d-8ff5-4c7d-8964-6934a17c5812-removebg-preview.png"
            alt="Mool Gyan Logo"
            width={40}
            height={40}
          />
          <span className="font-headline">{t.app_name}</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <div className="flex flex-col gap-1 px-2 text-sm font-medium">
          {regularItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted/50',
                {
                  'bg-muted text-primary': pathname === item.href,
                }
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>
        
        {isAdmin && (
          <>
            <Separator className="my-2" />
            <div className="px-2 space-y-2">
              <p className="px-3 text-xs font-semibold text-muted-foreground">Admin</p>
              <div className="flex flex-col gap-1 text-sm font-medium">
                {adminItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted/50',
                      { 'bg-muted text-primary': pathname.startsWith(item.href) }
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
       <div className="mt-auto p-4 border-t border-white/10">
          {/* No logout needed - admin access always available */}
        </div>
    </nav>
  )
}