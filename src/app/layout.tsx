import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { LocaleProvider } from '@/lib/i18n';
import AppLayout from '@/components/AppLayout';
import SplashScreen from '@/components/SplashScreen'; // Yeh sahi path se (components folder mein)
import { UploadProvider } from '@/context/UploadProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

// Permanent GitHub RAW logo
const BRAND_LOGO = 'https://raw.githubusercontent.com/berriescherry8-cell/mool-gyan-assets/main/logos/icon-512.png';

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
  other: {
    'google': 'notranslate',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="notranslate">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="google" content="notranslate" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-black font-sans antialiased dark',
          inter.variable
        )}
      >
        {/* Splash Screen pehle dikhega */}
        <SplashScreen />

        <LocaleProvider>
          <UploadProvider>
            <AppLayout>
              {children}
            </AppLayout>
          </UploadProvider>
        </LocaleProvider>
        <Toaster />
      </body>
    </html>
  );
}