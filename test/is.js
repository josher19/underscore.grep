$(document).ready(function() {

  module("Object ._is function");

  test("contrib: functions", function() {
    var expected = ["all", "any", "bind", "bindAll", "breakLoop", "clone", "compact",
    "compose","defer", "delay", "detect", "each", "every", "extend", "filter", "first",
    "flatten", "foldl", "foldr", "forEach", "functions", "grep", "head", "identity", "include",
    "indexOf", "inject", "intersect", "invoke", "is", "isArguments", "isArray", "isDate", "isElement", "isEmpty", "isEqual",
    "isFunction", "isNaN", "isNull", "isNumber", "isRegExp", "isString", "isUndefined", "keys", "last", "lastIndexOf", "map", "max",
    "methods", "min", "noConflict", "pluck", "range", "reduce", "reduceRight", "reject", "rest", "select",
    "size", "some", "sortBy", "sortedIndex", "tail", "tap", "template", "toArray", "uniq",
    "uniqueId", "values", "without", "wrap", "zip"];
    var proplist = _.keys(_);
    var methodList = _.select(proplist, function(prop) { return _.is(_[prop], Function) }) 
    ok(_(expected).isEqual(methodList.sort()), 'provides a (sorted) list of functions');
    ok(_(expected).isEqual(_.methods(_)), 'provides a sorted list of functions');
    var obj = {a : 'dash', b : _.map, c : (/yo/), d : _.reduce};
    ok(_.isEqual(['b', 'd'], _.functions(obj)), 'can grab the function names of any passed-in object');
    // var allValues = function(ob) { return _.map(_.keys(ob), function(k) { return ob[k]; }); } // including Functions
    var results = _.select(_.keys(obj), function(k) { return _.is(obj[k], Function) && k }); 
    ok(_.isEqual(['b', 'd'], results.sort()),
		'find when key is Function of any passed-in object: ' + results);

  });

  test("contrib: is Element", function() {
    if (typeof Element != "undefined") {
        ok(!_.is('div', Element), 'strings are not dom elements');
	ok(_.is($('html')[0], Element), 'the html tag is an Element');
    } else {
	ok(false, 'Element is not defined!');
    }
  });

  test("not contrib: isArguments", function() {
    var args = (function(){ return arguments; })(1, 2, 3);
    ok(!_.isArguments('string'), 'a string is not an arguments object');
    ok(!_.isArguments(_.isArguments), 'a function is not an arguments object');
    ok(_.isArguments(args), 'but the arguments object is an arguments object');
    // ok(_.is(args, Arguments), 'but the arguments object is an arguments object');
    ok(!_.isArguments(_.toArray(args)), 'but not when it\'s converted into an array');
    ok(!_.isArguments([1,2,3]), 'and not vanilla arrays.');
    ok(!_.isArguments(_([1,2,3])), 'and not vanilla arrays.');
    ok(!_.isArguments(_), 'Underscore is not an Argument');
  });

  test("contrib: is Array", function() {
    ok(!_.is(arguments, Array), 'the arguments object is not an array');
    ok(_.is([1, 2, 3], Array), 'but arrays are');
  });

  test("contrib: is String", function() {
    ok(!_.is(document.body, String), 'the document body is not a string');
    ok(_.is([1, 2, 3].join(', '), String), 'but strings are');
  });

  test("contrib: is Number", function() {
    ok(!_.is('string', Number), 'a string is not a number');
    ok(!_.is(arguments, Number), 'the arguments object is not a number');
    ok(!_.is(undefined, Number), 'undefined is not a number');
    ok(_.is(3 * 4 - 7 / 10, Number), 'but numbers are');
    ok(_.is(NaN, Number), 'NaN is a number', Number);
    ok(_.is(Infinity, Number), 'Infinity is a number');
  });

  test("contrib: is Function", function() {
    ok(!_.is([1, 2, 3], Function), 'arrays are not functions');
    ok(!_.is('moe', Function), 'strings are not functions');
    ok(_.is(_.is, Function), 'but functions are');
  });

  test("contrib: is Date", function() {
    ok(!_.is(100, Date), 'numbers are not dates');
    ok(!_.is({}, Date), 'objects are not dates');
    ok(_.is(new Date(), Date), 'but dates are');
  });

  test("contrib: is RegExp", function() {
    ok(!_.is(_.identity, RegExp), 'functions are not RegExps');
    ok(_.is(/identity/, RegExp), 'but RegExps are');
    ok(_.is(RegExp("identity"), RegExp), 'and RegExp(x) are');
    ok(_.is(new RegExp("identity"), RegExp), 'and new RegExp(x) are');
  });

  test("contrib: is NaN", function() {
    ok(!_.isNaN(undefined, NaN), 'undefined is not NaN');
    ok(!_.isNaN(null, NaN), 'null is not NaN');
    ok(!_.isNaN(0, NaN), '0 is not NaN');
    ok(_.isNaN(NaN, NaN), 'but NaN is');
  });

  test("contrib: is Null", function() {
    ok(!_.is(undefined, null), 'undefined is not null');
    ok(!_.is(NaN, null), 'NaN is not null');
    ok(_.is(null, null), 'but null is');
  });

  test("contrib: is Undefined", function() {
    ok(!_.is(1, undefined), 'numbers are defined');
    ok(!_.is(null, undefined), 'null is defined');
    ok(!_.is(false, undefined), 'false is defined');
    // ok(_.isUndefined(), 'nothing is undefined');
    var nothing = (function(noarg) { return noarg; })();
    ok(_.is(nothing, undefined), 'nothing is undefined');
    var blank;
    ok(_.is(blank, undefined), 'blank is undefined');
    ok(_.is(undefined, undefined), 'undefined is undefined');
  });


  // Setup remote variables for iFrame tests.
  var iframe = document.createElement('iframe');
  jQuery(iframe).appendTo(document.body);
  var iDoc = iframe.contentDocument || iframe.contentWindow.document;
  iDoc.write(
    "<script>\
      parent.iElement   = document.createElement('div');\
      parent.iArguments = (function(){ return arguments; })(1, 2, 3);\
      parent.iArray     = [1, 2, 3];\
      parent.iString    = 'hello';\
      parent.iNumber    = 100;\
      parent.iFunction  = (function(){});\
      parent.iDate      = new Date();\
      parent.iRegExp    = /hi/;\
      parent.iNaN       = NaN;\
      parent.iNull      = null;\
      parent.iUndefined = undefined;\
    </script>"
  );
  iDoc.close();

  test("iFrame isType tests", function() {
    ok(_.isElement(iElement), 'even from another frame');
    ok(_.isArguments(iArguments), 'event from another frame');
    ok(_.isArray(iArray), 'even from another frame');
    ok(_.isString(iString), 'even from another frame');
    ok(_.isNumber(iNumber), 'even from another frame');
    ok(_.isFunction(iFunction), 'even from another frame');
    ok(_.isDate(iDate), 'even from another frame');
    ok(_.isRegExp(iRegExp), 'even from another frame');
    ok(_.isNaN(iNaN), 'even from another frame');
    ok(_.isNull(iNull), 'even from another frame');
    ok(_.isUndefined(iUndefined), 'even from another frame');      
  });


  test("contrib: iFrame is tests", function() {
    //ok(_.isArguments(iArguments), 'event from another frame');
    ok(_.is(iArray, Array), 'even from another frame');
    ok(_.is(iString, String), 'even from another frame');
    ok(_.is(iNumber, Number), 'even from another frame');
    ok(_.is(iFunction, Function), 'even from another frame');
    ok(_.is(iDate, Date), 'even from another frame');
    ok(_.is(iRegExp, RegExp), 'even from another frame');
    ok(_.is(iNaN, NaN), 'even from another frame');
    ok(_.is(iNull, Null), 'even from another frame');
    ok(_.is(iUndefined, undefined), 'even from another frame');      
    ok(_.is(iElement, Element), 'even from another frame');
  });

});
