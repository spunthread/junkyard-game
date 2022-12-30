("use strict");

const CACHE_NAME = "cache-v0";

const FILES_TO_CACHE = [
  "/junkyard-game",
  "/junkyard-game/main.c57bf3c4.js",
  "/junkyard-game/main.a0a80036.css",
  "/junkyard-game/favicon.ico",
  "/junkyard-game/index.html",
  "/junkyard-game/logo192.png",
  "/junkyard-game/logo512.png",
  "/junkyard-game/manifest.json",
  "/junkyard-game/res/Dollar0.png",
  "/junkyard-game/res/Star0.png",
  "/junkyard-game/res/Energy0.png",
  "/junkyard-game/res/Vehicle1-1.png",
  "/junkyard-game/res/Vehicle1-2.png",
  "/junkyard-game/res/Vehicle2-1.png",
  "/junkyard-game/res/Vehicle2-2.png",
  "/junkyard-game/res/Vehicle3-1.png",
  "/junkyard-game/res/Vehicle3-2.png",
  "/junkyard-game/res/Vehicle4-1.png",
  "/junkyard-game/res/Vehicle4-2.png",
  "/junkyard-game/res/Vehicle5-1.png",
  "/junkyard-game/res/Vehicle5-2.png",
  "/junkyard-game/res/Vehicle6-1.png",
  "/junkyard-game/res/Vehicle6-2.png",
  "/junkyard-game/res/Vehicle7-1.png",
  "/junkyard-game/res/Vehicle7-2.png",
  "/junkyard-game/res/Vehicle8-1.png",
  "/junkyard-game/res/Vehicle8-2.png",
  "/junkyard-game/res/Vehicle9-1.png",
  "/junkyard-game/res/Vehicle9-2.png",
  "/junkyard-game/res/Vehicle10-1.png",
  "/junkyard-game/res/Vehicle10-2.png",
  "/junkyard-game/res/Battery.png",
  "/junkyard-game/res/Fluids.png",
  "/junkyard-game/res/Electronics.png",
  "/junkyard-game/res/Rims.png",
  "/junkyard-game/res/Brakes.png",
  "/junkyard-game/res/Windows.png",
  "/junkyard-game/res/Engine.png",
  "/junkyard-game/res/Transmission.png",
  "/junkyard-game/res/Drivetrain.png",
  "/junkyard-game/res/Scrap.png"
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

  evt.respondWith(caches.match(evt.request).then((res) => res ?? fetch(evt.request)));
});
