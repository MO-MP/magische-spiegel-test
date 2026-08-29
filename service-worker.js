```javascript
const CACHE_NAME = "magische-spiegel-test-v10";

const BESTANDEN = [
  "./",
  "./index.html",

  "./spiegel.png",

  "./koninklijke.png",
  "./magier.png",
  "./ruiter-uit-de-mist.png"
];


/*
 * INSTALLATIE
 *
 * Alle bestanden worden lokaal opgeslagen
 * zodat de spiegel ook offline kan werken.
 */

self.addEventListener("install", function(event) {

  event.waitUntil(

    caches
      .open(CACHE_NAME)
      .then(function(cache) {

        return cache.addAll(BESTANDEN);

      })

  );

  self.skipWaiting();

});


/*
 * ACTIVEREN
 *
 * Oude versies van de cache worden verwijderd.
 */

self.addEventListener("activate", function(event) {

  event.waitUntil(

    caches.keys().then(function(cachesNamen) {

      return Promise.all(

        cachesNamen
          .filter(function(naam) {

            return naam !== CACHE_NAME;

          })

          .map(function(naam) {

            return caches.delete(naam);

          })

      );

    })

  );

  self.clients.claim();

});


/*
 * BESTANDEN LADEN
 *
 * Eerst proberen we de lokale cache.
 * Als het bestand daar niet staat,
 * wordt het normaal geladen.
 */

self.addEventListener("fetch", function(event) {

  event.respondWith(

    caches.match(event.request)
      .then(function(response) {

        return response || fetch(event.request);

      })

  );

});
```
