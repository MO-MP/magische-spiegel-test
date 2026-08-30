```javascript
const CACHE_NAME = "magische-spiegel-v41";

const BESTANDEN = [
  "./",
  "./index.html",
  "./spiegel.png",

  "./koninklijke.png",
  "./schurk.png",
  "./het-noodlot.png",
  "./uitverkorene.png",
  "./magier.png",
  "./betoverde.png",
  "./ruiter-uit-de-mist.png",
  "./vrolijke-ruiter.png",

  "./geheim.png",
  "./prins-heks.png",
  "./ezel.png",
  "./oog.png"
];


// ==========================================
// INSTALL
// ==========================================

self.addEventListener("install", function(event) {

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(function(cache) {

        return cache.addAll(BESTANDEN);

      })

  );

  self.skipWaiting();

});


// ==========================================
// ACTIVATE
// ==========================================

self.addEventListener("activate", function(event) {

  event.waitUntil(

    caches.keys()
      .then(function(keys) {

        return Promise.all(

          keys
            .filter(function(key) {

              return key !== CACHE_NAME;

            })
            .map(function(key) {

              return caches.delete(key);

            })

        );

      })

  );

  self.clients.claim();

});


// ==========================================
// FETCH
// ==========================================

self.addEventListener("fetch", function(event) {

  event.respondWith(

    caches.match(event.request)
      .then(function(response) {

        if (response) {

          return response;

        }

        return fetch(event.request)
          .then(function(networkResponse) {

            return caches.open(CACHE_NAME)
              .then(function(cache) {

                cache.put(
                  event.request,
                  networkResponse.clone()
                );

                return networkResponse;

              });

          });

      })

  );

});
```
