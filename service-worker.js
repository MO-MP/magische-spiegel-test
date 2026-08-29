```javascript
const CACHE_NAME = "magische-spiegel-test-v14";

const BESTANDEN = [
  "./",
  "./index.html",

  "./spiegel.png",

  "./koninklijke.png",
  "./magier.png",
  "./ruiter-uit-de-mist.png",

  "./ezel.png"
];


/*
 * INSTALLEREN
 */

self.addEventListener(
  "install",
  function(event) {

    event.waitUntil(

      caches
        .open(CACHE_NAME)
        .then(function(cache) {

          return cache.addAll(
            BESTANDEN
          );

        })

    );

    self.skipWaiting();

  }
);


/*
 * ACTIVEREN
 */

self.addEventListener(
  "activate",
  function(event) {

    event.waitUntil(

      caches.keys()
        .then(function(cachesNamen) {

          return Promise.all(

            cachesNamen
              .filter(function(naam) {

                return naam !== CACHE_NAME;

              })

              .map(function(naam) {

                return caches.delete(
                  naam
                );

              })

          );

        })

    );

    self.clients.claim();

  }
);


/*
 * BESTANDEN LADEN
 */

self.addEventListener(
  "fetch",
  function(event) {

    event.respondWith(

      caches.match(
        event.request
      )
      .then(function(response) {

        return (
          response ||
          fetch(event.request)
        );

      })

    );

  }
);
```
