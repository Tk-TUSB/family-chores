const CACHE = 'family-chores-v1';
const ASSETS = [
  '/family-chores/',
  '/family-chores/index.html',
  '/family-chores/manifest.json',
  '/family-chores/icons/icon-192.png',
  '/family-chores/icons/icon-512.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  // Supabase API はキャッシュしない
  if (e.request.url.includes('supabase.co')) return;

  e.respondWith(
    fetch(e.request)
      .then(function(res) {
        var clone = res.clone();
        caches.open(CACHE).then(function(cache) {
          cache.put(e.request, clone);
        });
        return res;
      })
      .catch(function() {
        return caches.match(e.request);
      })
  );
});

// プッシュ通知受信
self.addEventListener('push', function(e) {
  var data = e.data ? e.data.json() : {};
  e.waitUntil(
    self.registration.showNotification(data.title || '家事のお知らせ', {
      body: data.body || '',
      icon: '/family-chores/icons/icon-192.png',
      badge: '/family-chores/icons/icon-192.png',
      tag: data.tag || 'chore',
      data: { url: '/family-chores/' }
    })
  );
});

// 通知タップでアプリを開く
self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(cls) {
      if (cls.length > 0) return cls[0].focus();
      return clients.openWindow('/family-chores/');
    })
  );
});
