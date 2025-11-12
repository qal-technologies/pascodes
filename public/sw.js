// public/sw.js

const PRECACHE = "pascodes-precache-v1";
const RUNTIME = "pascodes-runtime-v1";
const COURSES_CACHE = "pascodes-courses-v1";

const PRECACHE_URLS = [
    "/",
    "/offline.html",
    "/styles/globals.css",
    "/images/logo.png",
    "/images/og-image.png"
];

// Install - pre-cache core files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(PRECACHE)
            .then((cache) => cache.addAll(PRECACHE_URLS))
            .then(() => self.skipWaiting())
    );
});

// Activate - cleanup old caches
self.addEventListener("activate", (event) => {
    const currentCaches = [PRECACHE, RUNTIME, COURSES_CACHE];
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((name) => {
                    if (!currentCaches.includes(name)) return caches.delete(name);
                })
            )
        ).then(() => self.clients.claim())
    );
});

// Fetch handler - serve from cache, fallback to network, offline fallback
self.addEventListener("fetch", (event) => {
    const request = event.request;
    const url = new URL(request.url);

    // Only handle GET
    if (request.method !== "GET") return;

    // Prefer cache for navigation requests (SPA shell)
    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Put a copy in the runtime cache
                    const copy = response.clone();
                    caches.open(RUNTIME).then((cache) => cache.put(request, copy));
                    return response;
                })
                .catch(() =>
                    caches.match(request).then((cached) => cached || caches.match("/offline.html"))
                )
        );
        return;
    }

    // Images and static assets: stale-while-revalidate
    if (request.destination === "image" || request.destination === "script" || request.destination === "style") {
        event.respondWith(
            caches.open(RUNTIME).then(async (cache) => {
                const cached = await cache.match(request);
                const network = fetch(request).then((res) => {
                    if (res && res.ok) cache.put(request, res.clone());
                    return res;
                }).catch(() => null);
                return cached || network;
            })
        );
        return;
    }

    // For course assets, prefer cache-first (if cached, serve immediately)
    if (url.pathname.startsWith("/courses/") || url.pathname.startsWith("/content/")) {
        event.respondWith(
            caches.open(COURSES_CACHE).then(async (cache) => {
                const cached = await cache.match(request);
                if (cached) return cached;
                try {
                    const networkRes = await fetch(request);
                    if (networkRes && networkRes.ok) cache.put(request, networkRes.clone());
                    return networkRes;
                } catch (err) {
                    return caches.match("/offline.html");
                }
            })
        );
        return;
    }

    // Default fallback: network first then cache
    event.respondWith(
        fetch(request)
            .then((response) => {
                // Put into runtime cache
                if (request.url.startsWith(self.location.origin)) {
                    const copy = response.clone();
                    caches.open(RUNTIME).then((cache) => cache.put(request, copy));
                }
                return response;
            })
            .catch(() => caches.match(request))
    );
});

// Listen for messages from client to cache paid resources
self.addEventListener("message", (event) => {
    const { action, urls } = event.data || {};
    if (action === "CACHE_PAID_RESOURCES" && Array.isArray(urls)) {
        caches.open(COURSES_CACHE).then(async (cache) => {
            for (const url of urls) {
                try {
                    const res = await fetch(url, { credentials: "include" }); // include credentials if needed
                    if (res.ok) await cache.put(url, res.clone());
                } catch (err) {
                    console.error("Failed to cache", url, err);
                }
            }
        });
    }

    if (action === "CLEAR_COURSES_CACHE") {
        caches.delete(COURSES_CACHE);
    }
});
