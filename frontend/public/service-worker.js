self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("v1").then((cache) => cache.addAll(["/", "/index.html"]))
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});

self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  event.waitUntil(
    self.registration.showNotification(data.title || "Finanse", {
      body: data.body || "Powiadomienie",
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
    })
  );
});
