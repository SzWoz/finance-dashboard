self.addEventListener("push", (event) => {
  // ① Bezpieczna, domyślna struktura
  let payload = {};
  console.log({ event, data: event.data, text: event.data?.text() });

  if (event.data) {
    try {
      // ② Jeśli payload to JSON →
      payload = event.data.json();
    } catch {
      // ③ Gdy to zwykły tekst →
      payload = { body: event.data.text() };
    }
  }

  // ④ Podgląd w konsoli SW – zobaczysz, czy tu trafiasz
  console.log("[SW] Push received", payload);

  const title = payload.title ?? "Nowe powiadomienie";
  const options = {
    body: payload.body ?? "Kliknij, by zobaczyć więcej",
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
