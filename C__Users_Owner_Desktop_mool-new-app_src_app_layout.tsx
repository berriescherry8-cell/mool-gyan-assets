import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { LocaleProvider } from '@/lib/i18n';
import AppLayout from '@/components/AppLayout';
import { FirebaseClientProvider } from '@/firebase';
import { UploadProvider } from '@/context/UploadProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const BRAND_LOGO = 'https://firebasestorage.googleapis.com/v0/b/studio-9813085306-ab851.firebasestorage.app/o/app%20logo%20and%20screenshots%2FWhatsApp_Image_2025-12-30_at_11.37.03_PM-removebg-preview.png?alt=media&token=61622b81-ce46-4fc9-a82e-10f35cf44ff4';

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
    icon: BRAND_LOGO,
    apple: BRAND_LOGO,
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

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
          'min-h-screen bg-black font-sans antialiased dark',
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