(function() {

 var numbers = [];
 for (var i=0; i<1000; i++) numbers.push(i);
 var objects = _.map(numbers, function(n){ return {num : n}; });
 // var randomized = _.sortBy(numbers, function(){ return Math.random(); });


  var proplist = _.keys(_);
  var undef
  proplist.push(undef);
  proplist.push(null);
  proplist = proplist.concat(proplist);
  // proplist.push(proplist);

// Add New Functions to _  
//    _.isA = function isA(o,c) {return o==null ? o===c : (o.constructor===c || ( typeof c === "function" && o instanceof c));}	  

//  _.grep = function(obj,re) {
//    return _.select(obj, function(s){ var s = (typeof s === "string")?s : String(s); return s.match(re)   });
//  };

// Comparison Functions


    // not recommended, for comparison only
    function isType(obj, constructor) {
	if (null == obj) return obj === constructor;
        var isType = _["is" + constructor];
        return isType ? isType(obj) : ( obj.constructor === constructor || 
                      obj instanceof constructor );
    }


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
  JSLitmus.test('isType(function, Function)', function() {
    return _.select(proplist, function(prop) { return isType(_[prop], Function) }) 
  });
  JSLitmus.test('isType(function, Number)', function() {
    return _.select(proplist, function(prop) { return isType(prop, Number) }) 
  });
  JSLitmus.test('isType(number, Number)', function() {
    return _.select(numbers, function(number) { return isType(number, Number) }) 
  });
  JSLitmus.test('isType(objects, Number)', function() {
    return _.select(objects, function(object) { return isType(object, Number) }) 
  });
  JSLitmus.test('isType(objects, Object)', function() {
    return _.select(objects, function(object) { return isType(object, Object) }) 
  });



  JSLitmus.test('_.isA(function, Function)', function() {
    return _.select(proplist, function(prop) { return _.isA(_[prop], Function) }) 
  });
  JSLitmus.test('_.isA(function, Number)', function() {
    return _.select(proplist, function(prop) { return _.isA(prop, Number) }) 
  });
  JSLitmus.test('_.isA(number, Number)', function() {
    return _.select(numbers, function(number) { return _.isA(number, Number) }) 
  });
  JSLitmus.test('_.isA(objects, Number)', function() {
    return _.select(objects, function(object) { return _.isA(object, Number) }) 
  });
  JSLitmus.test('_.isA(objects, Object)', function() {
    return _.select(objects, function(object) { return _.isA(object, Object) }) 
  });
  
  JSLitmus.test('_.grep', function() {
    return  _.grep( proplist, /^is/ )
  });
  
  JSLitmus.test('isA_min does not check for functions (could throw Error)', function() {
    return _.select(proplist, function(prop) { return isA_min(_[prop], Function) })
  });

  
  JSLitmus.test('_.grep', function() {
    return  _.grep( proplist, /^is/ )
  });

  JSLitmus.test('_.grep for null', function() {
    return  _.grep( document.body.childNodes, "null" ); 
  });
  
  JSLitmus.test('grep_s using _.isString', function() {
    return  grep_s( proplist, /^is/ )
  });

  JSLitmus.test('_.functions', function() {
    return  _.functions( _ );
  });

})();
