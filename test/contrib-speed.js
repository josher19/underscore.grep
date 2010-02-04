(function() {

 // var numbers = [];
 // for (var i=0; i<1000; i++) numbers.push(i);
 // var objects = _.map(numbers, function(n){ return {num : n}; });
 // var randomized = _.sortBy(numbers, function(){ return Math.random(); });


  var proplist = _.keys(_);
  var undef
  proplist.push(undef);
  proplist.push(null);
  proplist = proplist.concat(proplist);
  // proplist.push(proplist);

//    _.isA = function isA(o,c) {return o==null ? o===c : (o.constructor===c || ( typeof c === "function" && o instanceof c));}	  

//  _.grep = function(obj,re) {
//    return _.select(obj, function(s){ var s = (typeof s === "string")?s : String(s); return s.match(re)   });
//  };

// Add New Functions to _  
  isNewFunction = function (obj) { return typeof obj === 'function' }
  isA_s = function isA(o,c) {return o==null ? o===c : (o.constructor===c || ( _.isFunction(c) && o instanceof c));}	  


  isA_min = function isA(o,c) {return o==null ? o===c : (o.constructor===c || o instanceof c);}	  

  // select all elements that match a regex
  grep_s = function(obj,re) {
    return _.select(obj, function(s){ var s =_.isString(s)?s:new String(s); return s.match(re)   });
  };



  JSLitmus.test('isNewFunction()', function() {
    return _.select(proplist, function(prop) { return isNewFunction(_[prop]) }) 
  });

  JSLitmus.test('_.isFunction()', function() {
    return _.select(proplist, function(prop){ return _.isFunction(_[prop]) })  
  });
  
  JSLitmus.test('_.isA', function() {
    return _.select(proplist, function(prop) { return _.isA(_[prop], Function) }) 
  });

  JSLitmus.test('isA_s using _.isFunction', function() {
    return _.select(proplist, function(prop) { return isA_s(_[prop], Function) })
  });
  
  JSLitmus.test('isA_min does not check for functions (could throw Error)', function() {
    return _.select(proplist, function(prop) { return isA_min(_[prop], Function) })
  });
  
  JSLitmus.test('_.grep', function() {
    return  _.grep( proplist, /^is/ )
  });

  JSLitmus.test('_.grep for null', function() {
    return  _.grep( document.body, "null" ); 
  });
  
  JSLitmus.test('grep_s using _.isString', function() {
    return  grep_s( proplist, /^is/ )
  });

  JSLitmus.test('_.functions', function() {
    return  _.functions( _ );
  });

})();