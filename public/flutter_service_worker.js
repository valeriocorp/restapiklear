'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "0a9b76d29a5f9dcd570c410fa5cd6450",
"index.html": "d7239accf0d63930403637591ac9c550",
"/": "d7239accf0d63930403637591ac9c550",
"main.dart.js": "e96a98b5a12270d8b1f6bbeaf9cccd2e",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "b1c4a00cb1bbd37eca0fed17e83cdde2",
"assets/AssetManifest.json": "0a78a63aeeb5eff5e7c63a9984f890d8",
"assets/NOTICES": "1d8d3522946c927ad146c6393c9e67a0",
"assets/FontManifest.json": "ed029e5b052589bc127a72a282608cad",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/assets/ArticulatCF-NormalOblique.otf": "c7e554839ff6d0e375e37772eb913fce",
"assets/assets/ArticulatCF-BoldOblique.otf": "cb7fdc40f6291088d6605bac252e604a",
"assets/assets/ArticulatCF-ExtraLight.otf": "c5f8c82b6e90d314b604640b63b7fc4a",
"assets/assets/ArticulatCF-ExtraBoldOblique.otf": "15f6d6916742979eda8939be9d0d4451",
"assets/assets/ArticulatCF-MediumOblique.otf": "54cbc5bf1e94bdae41bba87d9b9987e3",
"assets/assets/ArticulatCF-DemiBoldOblique.otf": "a9f9c01e569988ba47a92bd0b9886548",
"assets/assets/ArticulatCF-Normal.otf": "fd0fb483d166a1e1c93a1309ada0108e",
"assets/assets/ArticulatCF-ThinOblique.otf": "4f6105b15fc79982be11422097e9fd80",
"assets/assets/ArticulatCF-Thin.otf": "039ea7299688bd8c880d7a7331ddad0c",
"assets/assets/ArticulatCF-Regular.otf": "ad2498917620d3232f3454ba80113cce",
"assets/assets/ArticulatCF-ExtraLightOblique.otf": "7fc85d218101966aab120e8913122f16",
"assets/assets/ArticulatCF-LightOblique.otf": "5f4b1914f56c5d1dc11616eddb6569fd",
"assets/assets/ArticulatCF-Heavy.otf": "9c4e92b649ea7a1db28eb10502ae6102",
"assets/assets/ArticulatCF-ExtraBold.otf": "fed9249f7cdc198ceb8c062e133fa192",
"assets/assets/ArticulatCF-Bold.otf": "91609e34f281d9c9b7a091015264c26e",
"assets/assets/ArticulatCF-Medium.otf": "592ed77568041b23dc7647b8522b7443",
"assets/assets/ArticulatCF-DemiBold.otf": "53fe079e98557f9c513bd00111557a84",
"assets/assets/ArticulatCF-RegularOblique.otf": "49a5476d6a63a489d7ce641daab2ba35",
"assets/assets/ArticulatCF-HeavyOblique.otf": "a1591ba82006ecdf0e1e98536ff75878",
"assets/assets/ArticulatCF-Light.otf": "39fdf8b4a2989ce8bcd906300ad124c8"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
