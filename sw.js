// sw.js - This file needs to be in the root of the directory to work,
//         so do not move it next to the other scripts

const CACHE_NAME = 'lab-8-starter';
const RECIPE_URLS = [
    'https://adarsh249.github.io/Lab8-Starter/recipes/1_50-thanksgiving-side-dishes.json',
    'https://adarsh249.github.io/Lab8-Starter/recipes/2_roasting-turkey-breast-with-stuffing.json',
    'https://adarsh249.github.io/Lab8-Starter/recipes/3_moms-cornbread-stuffing.json',
    'https://adarsh249.github.io/Lab8-Starter/recipes/4_50-indulgent-thanksgiving-side-dishes-for-any-holiday-gathering.json',
    'https://adarsh249.github.io/Lab8-Starter/recipes/5_healthy-thanksgiving-recipe-crockpot-turkey-breast.json',
    'https://adarsh249.github.io/Lab8-Starter/recipes/6_one-pot-thanksgiving-dinner.json',
];

// Installs the service worker. Feed it some initial URLs to cache
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(RECIPE_URLS);
    })
  );
});

// Activates the service worker
self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

// Intercept fetch requests and cache them
self.addEventListener('fetch', function (event) {
   event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        return response || fetch(event.request).then(function (networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});
