(function () {
   debug('Loading fixup_datastore...');
   var realStore = system.datastore
   , localCache = {}
   , each = function(ary, block) {
       var i;
       for (i in ary) {
         block.call(ary[i]);
       }
     }
   , realGet = function (type, id) {
       if (!localCache[type]) {
         localCache[type] = {};
       }
       return localCache[type][id] = realStore.get(type, id);
     }
   , get =
     function (type, id) {
       return localCache[type]
         ? localCache[type][id]
         : realGet(type, id);
     }
   , write =
     function (type, obj, trans) {
       if (!localCache[type]) {
         localCache[type] = {};
       }
       localCache[type][obj.id] = obj;
       return realStore.write(type, obj, trans);
     }
   , remove =
     function (type, id) {
       if (localCache[type] && localCache[type][id]) {
         localCache[type][id] = null;
       }
       return realStore.remove(type, id);
     }
   , search =
     function (type, query) {
       var rawResults = realStore.search(type, query)
       , subCache = localCache[type] || (localCache[type] = {})
       , managedResults = []
       , key
       ;

       function matchesQuery(obj) {
         var key
         ;
         for (key in query) {
           debug("comparing query." + key + "<" + query[key] + "> with obj." + key + "<" + obj[key] + ">");
           if (obj[key] !== query[key]) {
             return false;
           }
         }
         debug('' + obj + " matches " + query);
         return true;
       }

       for (key in subCache) {
         debug("checking " + key);
         if(matchesQuery(subCache[key])) {
           managedResults.push(subCache[key]);
         }
       }

       each( rawResults
           , function () {
               if (!subCache[this.id]) {
                 subCache[this.id] = this;
                 managedResults.push(this);
               }
             });
       return managedResults;
     }
   ;

   system.datastore = {
     get: get, search: search, remove: remove, write: write,
     flushCache: function () {
       localCache = {};
     }
   };
   debug("... loaded.");
 })();
