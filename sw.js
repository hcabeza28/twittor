importScripts('js/sw-utils.js');

const STATIC_CACHE = 'staticv1';
const DYNAMIC_CACHE = 'dynamicv1';
const INMUTABLE_CACHE = 'inmutablev1';

const APP_SHELL = [//lo que se mete en el appshell es el corazón de la aplicación, lo que se debe cargar instantaneamente.
    
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/spiderman.jpg',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/wolverine.jpg',
    'js/app.js',
    'js/sw-utils.js'

];

const APP_SHELL_INMUTABLE = [//Aquí va lo que no se va a modificar, css, js y google fonts, por ejemplo
      'https://fonts.googleapis.com/css?family=Quicksand:300,400',
      'https://fonts.googleapis.com/css?family=Lato:400,300',
      'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
      'css/animate.css',
      'js/libs/jquery.js'

];

self.addEventListener('install', event=>{

        const cacheStatic = caches.open(STATIC_CACHE).then(cache=>
            cache.addAll(APP_SHELL));

        const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache=>
                cache.addAll(APP_SHELL_INMUTABLE));

    event.waitUntil(Promise.all([cacheStatic,cacheInmutable ]));
});

self.addEventListener('activate', event => {

    const respuesta = caches.keys().then( keys => {

        keys.forEach( key => {

            if (  key !== STATIC_CACHE && key.includes('static') ) {
                return caches.delete(key);
            }

        });

    });

    event.waitUntil( respuesta );


});

self.addEventListener('fetch', event=>{
    const respuesta = caches.match(event.request ).then(res=>{
        if(res){
            return res;
        }else{

            return fetch(event.request).then(newRes=>{

           return actualizaCacheDinamico(DYNAMIC_CACHE, event.request, newRes);
           
            });

        }
       
    });


    
});

