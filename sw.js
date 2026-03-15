const CACHE_NAME = 'tradingland-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://assets.coincap.io/assets/icons/btc@2x.png',
  'https://assets.coincap.io/assets/icons/eth@2x.png'
];

// ติดตั้ง Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// เรียกใช้งานเมื่อมี network request
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // มีใน cache -> ใช้ของใน cache
        if (response) {
          return response;
        }
        // ไม่มี -> ไปขอจาก network
        return fetch(event.request);
      })
  );
});