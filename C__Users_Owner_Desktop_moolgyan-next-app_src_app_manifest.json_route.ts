
import { NextResponse } from 'next/server';

// This is your web app manifest. It provides information about your application
// to the browser and tools like PWA Builder.
const manifest = {
  "name": "Mool Gyan",
  "short_name": "Mool Gyan",
  "description": "Experience the bliss of self-realization with Mool Gyan. Explore Satsang videos, stay updated with news, order spiritual books, and connect with the community.",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "background_color": "#FFFFFF",
  "theme_color": "#0a0a0a",
  "icons": [
    {
      "src": "https://firebasestorage.googleapis.com/v0/b/studio-9813085306-ab851.firebasestorage.app/o/app%20logo%20and%20screenshots%2FWhatsApp%20Image%202025-..._imresizer.png?alt=media&token=c2759963-c2c4-45e0-9463-2a6e1a575fb6",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "https://firebasestorage.googleapis.com/v0/b/studio-9813085306-ab851.firebasestorage.app/o/app%20logo%20and%20screenshots%2FWhatsApp%20Image%202025-..._imresizer.png?alt=media&token=c2759963-c2c4-45e0-9463-2a6e1a575fb6",
      "sizes": "256x256",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "https://firebasestorage.googleapis.com/v0/b/studio-9813085306-ab851.firebasestorage.app/o/app%20logo%20and%20screenshots%2FWhatsApp%20Image%202025-..._imresizer.png?alt=media&token=c2759963-c2c4-45e0-9463-2a6e1a575fb6",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "https://firebasestorage.googleapis.com/v0/b/studio-9813085306-ab851.firebasestorage.app/o/app%20logo%20and%20screenshots%2FWhatsApp%20Image%202025-..._imresizer.png?alt=media&token=c2759963-c2c4-45e0-9463-2a6e1a575fb6",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
};

export async function GET() {
  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/manifest+json',
    },
  });
}

// This tells Next.js to treat this route as static.
export const dynamic = 'force-static';
