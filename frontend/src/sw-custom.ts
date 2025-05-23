/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

self.addEventListener("push", (event) => {
  const pushEvent = event as PushEvent;
  const data = pushEvent.data?.json() ?? {};

  pushEvent.waitUntil(
    self.registration.showNotification(data.title || "Nowe powiadomienie", {
      body: data.body || "Kliknij, by zobaczyć więcej",
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
    })
  );
});
