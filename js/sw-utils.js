
//Guardará en el caché dinámico
function actualizaCacheDinamico(dynamicCache, req, res){


    if(res.ok){
        return caches.open(dynamicCache).then(cache=>{
            cache.put(rep, res.clone());
            return res.clone();

        });
    }else{
        
        return res;

    }

}