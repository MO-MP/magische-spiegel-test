const CACHE_NAME = "magische-spiegel-test-v17";

const BESTANDEN = [
"./",
"./index.html",
"./spiegel.png",
"./koninklijke.png",
"./magier.png",
"./ruiter-uit-de-mist.png"
];

/* Installeren */

self.addEventListener("install", function(event) {

event.waitUntil(

```
caches.open(CACHE_NAME)
  .then(function(cache) {

    return cache.addAll(BESTANDEN);

  })
```

);

self.skipWaiting();

});

/* Activeren */

self.addEventListener("activate", function(event) {

event.waitUntil(

```
caches.keys().then(function(cacheNames) {

  return Promise.all(

    cacheNames
      .filter(function(cacheName) {

        return cacheName !== CACHE_NAME;

      })
      .map(function(cacheName) {

        return caches.delete(cacheName);

      })

  );

})
```

);

self.clients.claim();

});

/* Bestanden ophalen */

self.addEventListener("fetch", function(event) {

event.respondWith(

```
caches.match(event.request)
  .then(function(response) {

    if (response) {

      return response;

    }

    return fetch(event.request);

  })
```

);

});
