const CACHE_NAME = 'queens-game-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png'
];

// Install event - cache static assets (only if offline support is enabled)
self.addEventListener('install', (event) => {
  // Check if offline support is enabled
  event.waitUntil(
    self.clients.matchAll().then(clients => {
      // Check localStorage in any open client
      let offlineEnabled = false;
      if (clients.length > 0) {
        // We can't directly access localStorage from SW, so we'll cache by default
        // and let the main thread manage cache clearing
        offlineEnabled = true;
      }
      
      if (offlineEnabled) {
        return caches.open(CACHE_NAME)
          .then(cache => {
            console.log('Opened cache for offline support');
            return cache.addAll(urlsToCache);
          });
      } else {
        console.log('Offline support disabled - skipping cache');
        return Promise.resolve();
      }
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

// Handle push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Don\'t lose your Queens Game win streak!',
    icon: '/logo192.png',
    badge: '/favicon.ico',
    tag: 'queens-game-streak',
    requireInteraction: false,
    actions: [
      {
        action: 'play',
        title: 'Play Now'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Queens Game Reminder', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'play') {
    // Open the game
    event.waitUntil(
      clients.openWindow('/')
    );
  }
  // For 'dismiss' action or default click, just close the notification
});
