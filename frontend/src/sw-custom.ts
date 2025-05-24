/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

self.addEventListener("push", (e) => {
  const event = e as PushEvent;
  let data: { title?: string; body?: string } = {};

  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data = { body: event.data.text() };
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title || "Nowe powiadomienie", {
      body: data.body || "Kliknij, by zobaczyć więcej",
      // icon: "/icons/icon-192.png",
      // badge: "/icons/icon-192.png",
    })
  );
});
