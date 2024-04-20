// https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Caching
const cacheName = 'Junhao.page/ord';
const precachedResources = ['/projects/ord'];

async function precache() {
    const cache = await caches.open(cacheName);
    return cache.addAll(precachedResources);
}

// On Service Worker install, preCache resources from precachedResources Array
self.addEventListener('install', (event) => {
    event.waitUntil(precache());
});

async function networkFirst(request) {
    const cache = await caches.open(cacheName);
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        const cachedResponse = await cache.match(request);
        return cachedResponse || Response.error();
    }
}

// When there is a fetch request, try to fetch Page if not load from Cache.
self.addEventListener('fetch', (event) => {
    event.respondWith(networkFirst(event.request));
});

// Purge Cache when there is new Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(caches.delete(cacheName));
});
