(function() {

   // needs to be merged into Underscore.js
    _.is = function isA(o,c) {return o==null ? o===c : (o.constructor===c || ( typeof c === "function" && o instanceof c));}	  

  _.grep = function grep(obj, re, iterator, context) {
    var found = _.select(obj, function (s) {var s = typeof s === "string" ? s : String(s);return s.match(re);}, context);
    if (iterator) {
        return _.map(found, iterator, context);
    }
    return found;
}

})();
