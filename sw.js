// Simple service worker for offline caching (development-friendly)
// Bump cache name when the worker behavior changes so clients update cleanly
const CACHE_NAME = 'bmax-static-v2';
const PRECACHE_URLS = [
  './',
  './index.html',
  './about.html',
  './contact.html',
  './portfolio.html',
  './services.html',
  './book.html',
  './styles.css',
  './script.js'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Never interfere with non-GET requests (form POSTs, API mutations, etc.)
  if (event.request.method !== 'GET') return;

  // For navigation requests (page loads), prefer network first so POSTs/navigations go to server
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          return networkResponse;
        })
        .catch(() => caches.match('./'))
    );
    return;
  }

  // For other GET requests (assets): cache-first, then network, with a fallback to root
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).catch(() => caches.match('./'));
    })
  );
});
