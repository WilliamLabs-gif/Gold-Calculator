// 1. Update the version number here so devices know there is a new update
const CACHE_NAME = "gold-calculator-v2";

self.addEventListener("install", (event) => { 
    event.waitUntil( 
        caches.open(CACHE_NAME).then((cache) => { 
            return cache.addAll([ 
                "./", 
                "./index.html", 
                "./manifest.json" 
            ]); 
        }) 
    ); 
}); 

// 2. Add this activate event to automatically delete the old v1 cache
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", (event) => { 
    event.respondWith( 
        caches.match(event.request).then((response) => { 
            // 3. Fallback to network if not in cache
            return response || fetch(event.request); 
        }) 
    ); 
}); 
