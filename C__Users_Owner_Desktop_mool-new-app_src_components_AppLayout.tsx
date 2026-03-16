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
import UploadProgressTracker from './UploadProgressTracker';
import SplashScreen from './SplashScreen';
import { useIsMobile } from '@/hooks/use-mobile';
import BottomNavBar from './BottomNavBar';
import { useUser } from '@/firebase';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import NotificationPermissionHandler from './NotificationPermissionHandler';

const ADMIN_EMAIL = 'sharmadevendra715@gmail.com';

function ClientOnlyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const isMobile = useIsMobile();
  const isLoginPage = pathname === '/login';
  const isAdminPage = pathname.startsWith('/admin');

  useEffect(() => {
    if (isUserLoading) return;

    const isAdmin = user?.email === ADMIN_EMAIL;

    if (isAdminPage && !isAdmin) {
      router.push('/login');
    }
    if (isLoginPage && isAdmin) {
      router.push('/admin');
    }
  }, [pathname, user, isUserLoading, router, isLoginPage, isAdminPage]);

  if (isUserLoading && (isLoginPage || isAdminPage)) {
     return (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const AppFooter = () => (
    <footer className="p-4 text-center text-xs text-muted-foreground">
      <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
      <p>&copy; {new Date().getFullYear()} Mool Gyan. All Rights Reserved.</p>
    </footer>
  );

  return (
    <SidebarProvider>
      <NotificationPermissionHandler />
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
                <UploadProgressTracker />
              </SidebarFooter>
            </Sidebar>
            <div className="flex-1 flex flex-col">
              <Header />
              <SidebarInset>
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