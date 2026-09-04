```javascript
const CACHE_NAME = "magische-spiegel-v52";

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


/* ==========================================
   INSTALLEREN EN ALLES OPSLAAN
   ========================================== */

self.addEventListener("install", event => {

  event.waitUntil(

    caches
      .open(CACHE_NAME)
      .then(cache => {

        return cache.addAll(BESTANDEN);

      })
      .then(() => self.skipWaiting())

  );

});


/* ==========================================
   OUDE CACHE VERWIJDEREN
   ========================================== */

self.addEventListener("activate", event => {

  event.waitUntil(

    caches
      .keys()
      .then(keys => {

        return Promise.all(

          keys
            .filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))

        );

      })
      .then(() => self.clients.claim())

  );

});


/* ==========================================
   OFFLINE ONDERSTEUNING
   ========================================== */

self.addEventListener("fetch", event => {

  /*
   * Voor pagina-navigatie:
   * altijd index.html gebruiken als fallback.
   */

  if (event.request.mode === "navigate") {

    event.respondWith(

      caches.match("./index.html")
        .then(response => {

          return response || fetch(event.request);

        })
        .catch(() => caches.match("./index.html"))

    );

    return;

  }


  /*
   * Voor afbeeldingen en andere bestanden:
   * eerst cache, daarna internet.
   */

  event.respondWith(

    caches.match(event.request)
      .then(cachedResponse => {

        if (cachedResponse) {

          return cachedResponse;

        }

        return fetch(event.request);

      })

  );

});
```
