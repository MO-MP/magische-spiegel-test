```javascript
const CACHE_NAME = "magische-spiegel-test-v9";

const BESTANDEN = [
  "./",
  "./index.html",
  "./spiegel.png",
  "./koninklijke.png",
  "./magier.png",
  "./ruiter-uit-de-mist.png"
];

/* Installeren en bestanden opslaan */
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(BESTANDEN))
  );

  self.skipWaiting();
});

/* Activeren en oude caches verwijderen */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cachesNamen => {
      return Promise.all(
        cachesNamen
          .filter(naam => naam !== CACHE_NAME)
          .map(naam => caches.delete(naam))
      );
    })
  );

  self.clients.claim();
});

/* Offline bestanden gebruiken */
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
```
