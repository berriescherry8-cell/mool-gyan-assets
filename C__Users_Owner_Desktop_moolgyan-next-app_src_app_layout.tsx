
import type {Metadata, Viewport} from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import {cn} from '@/lib/utils';
import {Toaster} from '@/components/ui/toaster';
import { LocaleProvider } from '@/lib/i18n';
import AppLayout from '@/components/AppLayout';
import { FirebaseClientProvider } from '@/firebase';
import { UploadProvider } from '@/context/UploadProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Mool Gyan',
  description: 'Experience the bliss of self-realization with Mool Gyan. Explore Satsang videos, stay updated with news, order spiritual books, and connect with the community.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Mool Gyan',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: 'https://firebasestorage.googleapis.com/v0/b/studio-9813085306-ab851.firebasestorage.app/o/app%20logo%20and%20screenshots%2FWhatsApp%20Image%202025-..._imresizer.png?alt=media&token=c2759963-c2c4-45e0-9463-2a6e1a575fb6',
    apple: 'https://firebasestorage.googleapis.com/v0/b/studio-9813085306-ab851.firebasestorage.app/o/app%20logo%20and%20screenshots%2FWhatsApp%20Image%202025-..._imresizer.png?alt=media&token=c2759963-c2c4-45e0-9463-2a6e1a575fb6',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased dark',
          inter.variable
        )}
      >
        <FirebaseClientProvider>
          <UploadProvider>
            <LocaleProvider>
                <AppLayout>
                    {children}
                </AppLayout>
            </LocaleProvider>
          </UploadProvider>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
