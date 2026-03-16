'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarRail,
  SidebarFooter,
} from '@/components/ui/sidebar';
import Header from '@/components/Header';
import SidebarNav from '@/components/SidebarNav';
import SplashScreen from './SplashScreen';
import { useIsMobile } from '@/hooks/use-mobile';
import BottomNavBar from './BottomNavBar';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import AppOnboarding from './AppOnboarding';

// No Firebase auth - admin access open for now (demo mode)
const ADMIN_ACCESS_ENABLED = true;

function ClientOnlyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();
  const isLoginPage = pathname === '/login';
  const isAdminPage = pathname.startsWith('/admin');

  useEffect(() => {
    // No auth check - admin pages open for testing
    // Future: add simple password if needed
  }, [pathname, router, isLoginPage, isAdminPage]);

  const AppFooter = () => (
    <footer className="p-4 text-center text-xs text-muted-foreground">
      <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
      <p>© {new Date().getFullYear()} Mool Gyan. All Rights Reserved.</p>
    </footer>
  );

  return (
    <SidebarProvider>
      <AppOnboarding />
      <div className="relative flex min-h-screen w-full bg-black">
        {isMobile ? (
          <div className="flex flex-col min-h-screen w-full">
            <Header />
            <main className="flex-1 p-4 pb-20 animate-fade-in-up">{children}</main>
            <AppFooter />
            <BottomNavBar />
          </div>
        ) : (
          <>
            <Sidebar>
              <SidebarRail />
              <SidebarContent>
                <SidebarNav />
              </SidebarContent>
              <SidebarFooter>
                {/* UploadProgressTracker completely removed - no upload feature now */}
              </SidebarFooter>
            </Sidebar>
            <div className="flex-1 flex flex-col">
              <Header />
              <SidebarInset className="bg-black">
                <main className="flex-1 p-4 md:p-6 lg:p-8 animate-fade-in-up max-w-7xl mx-auto w-full">
                  {children}
                </main>
                <AppFooter />
              </SidebarInset>
            </div>
          </>
        )}
      </div>
    </SidebarProvider>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isAppLoading || !isClient) {
    return <SplashScreen />;
  }

  return <ClientOnlyLayout>{children}</ClientOnlyLayout>;
}