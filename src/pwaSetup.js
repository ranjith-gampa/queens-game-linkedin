// Register service worker for PWA support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    // Check if offline support is enabled in settings (disabled by default)
    const offlineSupportEnabled = (() => {
      const preference = localStorage.getItem("pwaOfflineSupportEnabled");
      return preference === null ? false : preference === 'true';
    })();

    if (!offlineSupportEnabled) {
      // If disabled, unregister any existing service workers and clear caches
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.unregister();
        }

        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
        console.log('PWA offline support disabled - service workers unregistered and caches cleared');
      } catch (err) {
        console.log('Error cleaning up PWA resources: ', err);
      }
      return;
    }

    try {
      // Register new service worker
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    } catch (err) {
      console.log('ServiceWorker registration failed: ', err);
    }
  });
}
