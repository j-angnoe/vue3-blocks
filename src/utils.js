export function createDeferred() {
    const deferred = {};
    deferred.promise = new Promise((resolve, reject) => {
       deferred.resolve = resolve;
       deferred.reject = reject;
    });
    return deferred;
 }
 
 export function fetchXhr(url, options) { 
    options = options || {};
    options.headers = options.headers || {};
    options.headers['X-Requested-With'] = 'XMLHttpRequest';

    return fetch(url, options);
 }

 export function tryEvaluateProperty(node, propertyName, defaultValue = null) { 
   if (node.hasAttribute(propertyName)) { 
      let propValue = node.getAttribute(propertyName).trim();
      if (propValue.startsWith('{') || propValue.startsWith('[')) {
         try {  
            return eval('(' + propValue + ')')
         } catch (e) { 
            throw new Error('Error parsing property ' + propertyName + ' of ' + node.outerHTML.split(/\n/,2)[0] + ': ' + e)
         }
      } else if (propValue > '') {
         return propValue.trim().split(/\s*,\s*/);
      }
   }    
   return defaultValue
 }