const CACHE_NAME = 'queens-game-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Ignore non-GET requests and non-HTTP(S) requests
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found
        if (response) {
          return response;
        }

        // Make network request if not in cache
        return fetch(event.request.clone()).then(response => {
          // Check if we should cache this response
          if (!response || response.status !== 200 || !response.url.startsWith('http')) {
            return response;
          }

          // Check if URL is in our list to cache
          const url = new URL(response.url);
          if (urlsToCache.includes(url.pathname)) {
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, response.clone());
              })
              .catch(() => {
                // Silently fail - caching isn't critical
              });
          }

          return response;
        });
      })
      .catch(() => {
        // Network error, could return offline page here
        return new Response('Network error', { status: 408 });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
