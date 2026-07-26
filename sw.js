/* Service Worker für die Trainings-App.
   Strategie: erst Netzwerk versuchen (damit Updates ankommen),
   bei Fehlschlag (offline) aus dem Cache bedienen. */
const CACHE = 'training-app-v1';
const ASSETS = ['./', './index.html', './icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if(e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return resp;
      })
      .catch(() =>
        caches.match(e.request, {ignoreSearch: true})
          .then((r) => r || caches.match('./index.html'))
      )
  );
});
