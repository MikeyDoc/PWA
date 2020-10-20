const cacheName = 'basic-pwa-v2-1';
const filesToCache  = [
    '/index.html',
    '/main.js',
    '/styles.css'
];


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName)
        .then((cache) =>{
            return  cache.addAll(filesToCache);

        }) 
    );    
});

self.addEventListener('activate', (event)=> {
 console.log('SW Activated');
 let cacheAllowlist = [cacheName];
 event.waitUntil(
     caches.keys()
        .then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName)=> {
                    if (cacheAllowlist.indexOf(cacheName) === -1){
                        return caches.delete(cacheName);
                    }
                })
            )
        })
 )

})

// Static Use cache first
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
         .then((response) => {
             return response || fetch(event.request);
         })
    ) 
})






//use network trust
/* self.addEventListener('fetch', (event) =>{
        event.respondWith(
            fetch(event.request).catch(()=>{
                return caches.match(event.request);
             } )
        )
} )


//Dynamic Cacheing of assets
self.addEventListener('fetch', (event) =>{
    event.respondWith(
            caches.open(cacheName)
             .then((cache)=>{
                 return cache.match(event.request)
                    .then((response)=>{
                        return response || fetch(event.request)
                            .then((response)=>{
                            cache.put(event.request,response.clone());
                            return response;
                            })
                   })
                   
             })
    )
} ) *///#endregion


/*
self.addEventListener('fetch', (event) => {
 event.respondWith(
 caches.open(cacheName)
 .then((cache) => {
 console.log(event.request);
 return cache.match(event.request)
 .then((response)=> {
 return response || fetch(event.request)
 .then((response)=> {
 cache.put(event.request, response.clone());
 return response;
 });
 });
 })
 );
 });
*/