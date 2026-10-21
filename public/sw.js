const CACHE = "idcardtools-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Cache PDF.js worker (Next.js hashed URL)
  if (url.pathname.includes("pdf.worker") || url.pathname.includes("pdfjs")) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((res) => {
          if (!res.ok) return res;
          const headers = new Headers(res.headers);
          headers.set("Content-Type", "text/javascript");
          const fixed = new Response(res.body, {
            status: res.status,
            statusText: res.statusText,
            headers,
          });
          const clone = fixed.clone();
          caches.open(CACHE).then((c) => c.put(event.request, clone));
          return fixed;
        });
      })
    );
  }
});