const CACHE_NAME = "magische-spiegel";

const BESTANDEN = [
"./",
"./index.html"
];

self.addEventListener("install", event => {
self.skipWaiting();

event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => cache.addAll(BESTANDEN))
);
});

self.addEventListener("activate", event => {
event.waitUntil(
self.clients.claim()
);
});

self.addEventListener("fetch", event => {
event.respondWith(
fetch(event.request)
.then(response => {

```
    if (response.ok) {
      const kopie = response.clone();

      caches.open(CACHE_NAME)
        .then(cache => {
          cache.put(event.request, kopie);
        });
    }

    return response;
  })
  .catch(() => {
    return caches.match(event.request);
  })
```

);
});
