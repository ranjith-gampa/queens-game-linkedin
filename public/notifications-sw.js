// Notifications-only service worker
// This handles ONLY notifications, no caching

self.addEventListener('install', (event) => {
  console.log('Notifications service worker installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Notifications service worker activated');
  event.waitUntil(self.clients.claim());
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked');
  
  event.notification.close();
  
  // Open the app
  event.waitUntil(
    self.clients.matchAll().then((clients) => {
      // If app is already open, focus it
      if (clients.length > 0) {
        return clients[0].focus();
      }
      // Otherwise open new window
      return self.clients.openWindow('/');
    })
  );
});

// Handle background notification events
self.addEventListener('push', (event) => {
  console.log('Push message received');
  
  const options = {
    body: 'Don\'t forget to play today\'s Queens Game!',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: 'queens-game-streak',
    requireInteraction: false,
  };
  
  event.waitUntil(
    self.registration.showNotification('Queens Game Reminder', options)
  );
});
