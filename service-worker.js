("use strict");

const CACHE_NAME = "cache-v1";

const FILES_TO_CACHE = [
  "/junkyard-game/",
  "/junkyard-game/logo.svg",
  "/junkyard-game/manifest.json",
  "/junkyard-game/i-am-a-deceptive-cheater.html",
  "/junkyard-game/assets/index-26489b2f.js",
  "/junkyard-game/assets/index-15d96c0e.css",
  "/junkyard-game/assets/stats/0.png",
  "/junkyard-game/assets/stats/1.png",
  "/junkyard-game/assets/stats/2.png",
  "/junkyard-game/assets/parts/0.png",
  "/junkyard-game/assets/parts/1.png",
  "/junkyard-game/assets/parts/2.png",
  "/junkyard-game/assets/parts/3.png",
  "/junkyard-game/assets/parts/4.png",
  "/junkyard-game/assets/parts/5.png",
  "/junkyard-game/assets/parts/6.png",
  "/junkyard-game/assets/parts/7.png",
  "/junkyard-game/assets/parts/8.png",
  "/junkyard-game/assets/parts/9.png",
  "/junkyard-game/assets/vehicles/1-0.png",
  "/junkyard-game/assets/vehicles/1-1.png",
  "/junkyard-game/assets/vehicles/2-0.png",
  "/junkyard-game/assets/vehicles/2-1.png",
  "/junkyard-game/assets/vehicles/3-0.png",
  "/junkyard-game/assets/vehicles/3-1.png",
  "/junkyard-game/assets/vehicles/4-0.png",
  "/junkyard-game/assets/vehicles/4-1.png",
  "/junkyard-game/assets/vehicles/5-0.png",
  "/junkyard-game/assets/vehicles/5-1.png",
  "/junkyard-game/assets/vehicles/6-0.png",
  "/junkyard-game/assets/vehicles/6-1.png",
  "/junkyard-game/assets/vehicles/7-0.png",
  "/junkyard-game/assets/vehicles/7-1.png",
  "/junkyard-game/assets/vehicles/8-0.png",
  "/junkyard-game/assets/vehicles/8-1.png",
  "/junkyard-game/assets/vehicles/9-0.png",
  "/junkyard-game/assets/vehicles/9-1.png",
  "/junkyard-game/assets/vehicles/10-0.png",
  "/junkyard-game/assets/vehicles/10-1.png"
];

self.addEventListener("install", (evt) => {
  evt.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE)));
  self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches
      .keys()
      .then((keyList) =>
        Promise.all(keyList.map((key) => (key !== CACHE_NAME ? caches.delete(key) : undefined)))
      )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
  if (evt.request.method === "GET")
    evt.respondWith(caches.match(evt.request).then((res) => res ?? fetch(evt.request)));
});
