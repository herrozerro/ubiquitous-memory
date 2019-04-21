console.log("This is service worker talking");
var cacheName = 'blazor-pwa-sample';
var filesToCache = [
    '/ubiquitous-memory/',
    //Html and css files
    '/ubiquitous-memory/index.html',
    '/ubiquitous-memory/css/site.css',
    '/ubiquitous-memory/css/bootstrap/bootstrap.min.css',
    '/ubiquitous-memory/css/open-iconic/font/css/open-iconic-bootstrap.min.css',
    '/ubiquitous-memory/open-iconic',
    '/ubiquitous-memory/css/open-iconic/font/fonts/open-iconic.woff',
    //'/css/loading.css',
    '/ubiquitous-memory/sample-data/weather.json',
    //Blazor framework
    '/ubiquitous-memory/_framework/blazor.webassembly.js',
    '/ubiquitous-memory/_framework/blazor.boot.json',
    '/ubiquitous-memory/_framework/blazor.server.js',
    //Our additional files
    '/ubiquitous-memory/manifest.json',
    '/ubiquitous-memory/serviceworker.js',
    '/ubiquitous-memory/icons/icon-192x192.png',
    '/ubiquitous-memory/icons/icon-512x512.png',
    //Content
    //'/ubiquitous-memory/_content',
    //'/ubiquitous-memory/_content/Blazored.LocalStorage',
    '/ubiquitous-memory/_content/Blazored.LocalStorage/blazored.LocalStorage.js',
    '/ubiquitous-memory/_content/Blazored.LocalStorage/blazored.LocalStorage.js.map',
    '/ubiquitous-memory/_content/Blazored.LocalStorage/blazored.LocalStorage.ts',
    //The web assembly/.net dll's
    '/ubiquitous-memory/_framework/wasm/mono.js',
    '/ubiquitous-memory/_framework/wasm/mono.wasm',
    '/ubiquitous-memory/_framework/_bin/Microsoft.AspNetCore.Components.Browser.dll',
    '/ubiquitous-memory/_framework/_bin/Microsoft.AspNetCore.Components.dll',
    '/ubiquitous-memory/_framework/_bin/Microsoft.AspNetCore.Blazor.dll',
    '/ubiquitous-memory/_framework/_bin/Microsoft.Extensions.DependencyInjection.Abstractions.dll',
    '/ubiquitous-memory/_framework/_bin/Microsoft.Extensions.DependencyInjection.dll',
    '/ubiquitous-memory/_framework/_bin/Microsoft.JSInterop.dll',
    '/ubiquitous-memory/_framework/_bin/Mono.Security.dll',
    '/ubiquitous-memory/_framework/_bin/Mono.WebAssembly.Interop.dll',
    '/ubiquitous-memory/_framework/_bin/mscorlib.dll',
    '/ubiquitous-memory/_framework/_bin/System.ComponentModel.Annotations.dll',
    '/ubiquitous-memory/_framework/_bin/System.Core.dll',
    '/ubiquitous-memory/_framework/_bin/System.dll',
    '/ubiquitous-memory/_framework/_bin/System.Net.Http.dll',
    '/ubiquitous-memory/_framework/_bin/Blazored.LocalStorage.dll',
    //Pages
    //'/ubiquitous-memory/counter',
    //'/ubiquitous-memory/todo',
    //'/ubiquitous-memory/fetchdata',
    //The compiled project .dll's
    '/ubiquitous-memory/_framework/_bin/BlazorDemo.dll',
    '/ubiquitous-memory/_framework/_bin/BlazorDemo.pdb'
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(response => {
            return response || fetch(event.request);
        })
    );
});