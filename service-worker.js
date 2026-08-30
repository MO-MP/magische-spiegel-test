```javascript
const CACHE_NAME = "magische-spiegel-v44";

const BESTANDEN = [
  "./",
  "./index.html",
  "./spiegel.png",
  "./ezel.png",
  "./geheim.png",
  "./oog.png",
  "./koninklijke.png",
  "./schurk.png",
  "./het-noodlot.png",
  "./uitverkorene.png",
  "./magier.png",
  "./betoverde.png",
  "./ruiter-uit-de-mist.png",
  "./vrolijke-ruiter.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(BESTANDEN))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        return cachedResponse || fetch(event.request);
      })
  );
});
```
