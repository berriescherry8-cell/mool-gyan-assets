// Service Worker for offline functionality
const CACHE_NAME = 'mool-gyan-v1';
const urlsToCache = [
  '/',
  '/offline',
  '/_next/static/css/app/layout.css',
  '/_next/static/css/app/page.css',
  '/_next/static/chunks/app/layout.js',
  '/_next/static/chunks/app/page.js',
  '/_next/static/chunks/webpack.js',
  '/_next/static/chunks/main.js',
  '/_next/static/chunks/pages/_app.js',
  '/_next/static/chunks/pages/_error.js',
  '/_next/static/media/splash.png',
  '/_next/static/media/logo.png'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request).catch(() => {
          // If it's HTML, serve offline page
          if (event.request.destination === 'document') {
            return caches.match('/offline');
          }
          return new Response('Offline', { status: 503 });
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Push notification event listener
self.addEventListener('push', (event) => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: data.icon || '/icon-192x192.png',
    badge: '/badge-72x72.png',
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click event listener
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});