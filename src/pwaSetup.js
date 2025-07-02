// Register service worker for PWA support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    // Check if offline support is enabled in settings (disabled by default, but enabled in development)
    const offlineSupportEnabled = (() => {
      const preference = localStorage.getItem("pwaOfflineSupportEnabled");
      // Enable in development mode by default, respect user preference otherwise
      const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      return preference === null ? isDevelopment : preference === 'true';
    })();

    // Always register service worker for notifications, but handle caching based on offline preference
    try {
      // Register service worker (needed for notifications)
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      
      // If offline support is disabled, clear caches but keep service worker for notifications
      if (!offlineSupportEnabled) {
        try {
          const cacheNames = await caches.keys();
          await Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
          );
          console.log('PWA offline support disabled - caches cleared but service worker kept for notifications');
        } catch (err) {
          console.log('Error clearing caches: ', err);
        }
      }
    } catch (err) {
      console.log('ServiceWorker registration failed: ', err);
    }
  });
}
