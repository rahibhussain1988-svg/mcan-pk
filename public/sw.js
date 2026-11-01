// Imam Institute Smart ERP & Clinical Triage PWA Service Worker
const CACHE_NAME = 'imam-erp-v1';
const STATIC_ASSETS = [
  '/',
  '/manifest.webmanifest',
  '/icons/icon.svg',
  '/offline.html',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Pre-cache non-blocking error:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Network first with cache fallback for API/data, cache first for static assets
  if (url.pathname.startsWith('/_next/static') || url.pathname.startsWith('/icons')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        });
      })
    );
  } else {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cached = await caches.match(event.request);
          if (cached) return cached;
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/offline.html') || new Response(
              `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Offline | Imam Institute Smart ERP</title>
                <style>
                  body { font-family: sans-serif; background: #062B54; color: white; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; padding: 20px; }
                  .card { background: rgba(255,255,255,0.1); padding: 30px; border-radius: 16px; max-width: 400px; }
                  h1 { color: #F8FAFC; margin-bottom: 8px; font-size: 22px; }
                  p { color: #94A3B8; font-size: 14px; line-height: 1.5; }
                  button { background: #0062B1; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; margin-top: 15px; cursor: pointer; }
                </style>
              </head>
              <body>
                <div class="card">
                  <h1>Imam Institute ERP - Offline</h1>
                  <p>You are currently disconnected from the campus network. Offline cached data is safely preserved on your device.</p>
                  <button onclick="window.location.reload()">Retry Connection</button>
                </div>
              </body>
              </html>`,
              { headers: { 'Content-Type': 'text/html' } }
            );
          }
          return new Response('Offline snapshot unavailable', { status: 503 });
        })
    );
  }
});
