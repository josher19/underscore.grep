(function() {

   // needs to be merged into Underscore.js
    _.isA = function isA(o,c) {return o==null ? o===c : (o.constructor===c || ( typeof c === "function" && o instanceof c));}	  

  _.grep = function(obj,re) {
    return _.select(obj, function(s){ var s = (typeof s === "string")?s : String(s); return s.match(re)   });
  };


})();