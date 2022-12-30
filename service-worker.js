("use strict");

const CACHE_NAME = "cache-v0";

const FILES_TO_CACHE = [
  "/",
  "/main.a0a80036.css",
  "/main.8293c59c.js",
  "/favicon.png",
  "/index.html",
  "/logo192.png",
  "/logo512.png",
  "/manifest.json"
];

self.addEventListener("install", (evt) => {
  console.log("[ServiceWorker] Install");

  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Pre-caching offline pages");
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
  console.log("[ServiceWorker] Activate");
  // Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
  console.log("[ServiceWorker] Fetch", evt.request);

  if (evt.request.method !== "GET") return;

  evt.respondWith(
    (async function () {
      const res = await caches.match(evt.request);
      return res || fetch(evt.request);
    })()
  );
});
