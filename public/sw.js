const CACHE_NAME = 'video-cache-v1';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

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
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Only cache video files from the S3 bucket
  if (url.hostname.includes('br-max.s3.ap-south-1.amazonaws.com') &&
      event.request.url.endsWith('.mp4')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(event.request);

        if (cachedResponse) {
          // Check if cache is still valid (within 24 hours)
          const cachedTime = await getCacheTime(event.request.url);
          const now = Date.now();

          if (cachedTime && (now - cachedTime) < CACHE_DURATION) {
            return cachedResponse;
          }
        }

        // Fetch from network and cache
        return fetch(event.request).then((response) => {
          if (response.status === 200) {
            // Clone the response before caching
            const responseToCache = response.clone();
            cache.put(event.request, responseToCache);
            // Store timestamp
            setCacheTime(event.request.url, Date.now());
          }
          return response;
        }).catch(() => {
          // If network fails, return cached version even if expired
          return cachedResponse || new Response('Video not available', { status: 404 });
        });
      })
    );
  }
});

// Helper functions to manage cache timestamps
async function getCacheTime(url) {
  const cache = await caches.open(CACHE_NAME + '-metadata');
  const response = await cache.match(url);
  if (response) {
    const data = await response.json();
    return data.timestamp;
  }
  return null;
}

async function setCacheTime(url, timestamp) {
  const cache = await caches.open(CACHE_NAME + '-metadata');
  const response = new Response(JSON.stringify({ timestamp }));
  await cache.put(url, response);
}
