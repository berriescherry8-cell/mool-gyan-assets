import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    "name": "Mool Gyan",
    "short_name": "Mool Gyan",
    "description": "Experience the bliss of self-realization with Mool Gyan. Explore Satsang videos, stay updated with news, order spiritual books, and connect with the community.",
    "start_url": "/",
    "scope": "/",
    "display": "standalone",
    "background_color": "#000000",
    "theme_color": "#000000",
    "orientation": "portrait-primary",
    "icons": [
      {
        "src": "https://firebasestorage.googleapis.com/v0/b/studio-9813085306-ab851.firebasestorage.app/o/app%20logo%20and%20screenshots%2FWhatsApp_Image_2025-12-30_at_11.37.03_PM-removebg-preview.png?alt=media&token=61622b81-ce46-4fc9-a82e-10f35cf44ff4",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "any"
      },
      {
        "src": "https://firebasestorage.googleapis.com/v0/b/studio-9813085306-ab851.firebasestorage.app/o/app%20logo%20and%20screenshots%2FWhatsApp_Image_2025-12-30_at_11.37.03_PM-removebg-preview.png?alt=media&token=61622b81-ce46-4fc9-a82e-10f35cf44ff4",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "maskable"
      }
    ]
  };

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/manifest+json',
    },
  });
}

export const dynamic = 'force-static';
