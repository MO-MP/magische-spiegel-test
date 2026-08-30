```javascript
const CACHE_NAME = "magische-spiegel-v26";

const FILES_TO_CACHE = [

  "./",
  "./index.html",
  "./service-worker.js",

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
  "./ezel.png",
  "./oog.png"

];


self.addEventListener(
  "install",
  function(event) {

    event.waitUntil(

      caches.open(CACHE_NAME)
        .then(function(cache) {

          return cache.addAll(
            FILES_TO_CACHE
          );

        })

    );

    self.skipWaiting();

  }
);


self.addEventListener(
  "activate",
  function(event) {

    event.waitUntil(

      caches.keys()
        .then(function(keys) {

          return Promise.all(

            keys.map(function(key) {

              if (
                key !== CACHE_NAME
              ) {

                return caches.delete(
                  key
                );

              }

            })

          );

        })

    );

    self.clients.claim();

  }
);


self.addEventListener(
  "fetch",
  function(event) {

    event.respondWith(

      caches.match(
        event.request
      )
      .then(function(response) {

        if (response) {
          return response;
        }

        return fetch(
          event.request
        );

      })

    );

  }
);
```
