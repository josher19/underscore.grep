jQuery(document).ready(function() {

  module("grep and toRegExp");

  test("contrib: grep", function() {
    var num = [1,2,3,4,9,19,21,100];
    var str = ['1','2','3','4','9','19','21','100','hello','world'];
	equals( _.grep(num, "1").join(","), "1,19,21,100", 'numbers with 1');
	equals( _.grep(num, /^1/).join(","), "1,19,100", 'numbers starting with 1');
	equals( _.grep(str, "1").join(","), "1,19,21,100", 'Strings with "1"');
	equals( _.grep(str, /^1/).join(","), "1,19,100", 'Strings starting with "1"');
	equals( _.grep(str, "^1").join(","), "", 'Strings with "^1"');
	equals( _.grep(str, "ELL").join(","), "", 'Strings with "ELL"');
	equals( _.grep(str, /ELLO$/i).join(","), "hello", 'Strings ending with "ELLO"');
	equals( _.grep(str, /(0|o)/).join(","), "100,hello,world", 'Strings with "o" or Zero ("0")');
  });

  test("Prototype style grep", function() {
    ok(true, "From http://prototypejs.org/api/enumerable/grep");
    // Get all strings with a repeated letter somewhere
    // ['hello', 'world', 'this', 'is', 'cool'].grep(/(.)\1/)
    // // -> ['hello', 'cool']
    //
    // // Get all numbers ending with 0 or 5
    // $R(1,30).grep(/[05]$/)
    // // -> [5, 10, 15, 20, 25, 30]
    //
    // // Those, minus 1
    // $R(1,30).grep(/[05]$/, function(n) { return n - 1; })
    // // -> [4, 9, 14, 19, 24, 29]
    //
    // // Get all an element's children filtered by CSS selector
    // // (the Selector instance has a "match" method)
    // $('foo').childElements().grep(new Selector("li.active"));
    //
    ok(_.isEqual(
    	_.grep(['hello', 'world', 'this', 'is', 'cool'], /(.)\1/),
    	['hello', 'cool']),
       'Get all strings with a repeated letter somewhere');
    ok(_.isEqual( 
    	_.grep(_.range(1,31), /[05]$/),
    	[5, 10, 15, 20, 25, 30]),
    	"Get all numbers ending with 0 or 5");
    ok(_.isEqual( 
    	_.grep(_.range(1,31), /[05]$/, function(n) { return n - 1; }),
    	[4, 9, 14, 19, 24, 29]),
    	"Those, minus 1");
  });

  test("Prototype: troublesome characters", function() {
    var msg = "troublesome character "
    same(['?a', 'c?'], _.grep(['?a','b','c?'], '?'), msg + "?" );
    same(['*a', 'c*'], _.grep(['*a','b','c*'], '*'), msg + "*");
    same(['+a', 'c+'], _.grep(['+a','b','c+'],'+'), msg + "+");
    same(['{1}a', 'c{1}'], _.grep(['{1}a','b','c{1}'], '{1}'), msg + "{1}");
    same(['(a', 'c('], _.grep( ['(a','b','c('], '('), msg + "(");
    same(['|a', 'c|'], _.grep(['|a','b','c|'], '|'), msg + "|");
  });


  test("contrib: toRegExp", function() {
    var r="{.(|}:)$=^!\\\/[*+?]";
    ok(! _.isEqual(_.toRegExp(r, "g"),new RegExp(r, "g" )), "Convert all special chars");
    ok(_.isEqual(_.toRegExp("{.(", "i"),new RegExp("\\{\\.\\(", "i" )), "{.(");
    ok(_.isEqual(_.toRegExp("|}:)", "i"),/\|\}\:\)/i ), "|}:)");
    ok(_.isEqual(_.toRegExp("$?=^!", "g"),new RegExp("\\$\\?\\=\\^\\!", "g" )), "$?=^!");
    r="[*]/\\+";
    ok(_.isEqual(_.toRegExp(r, "ig"),/\[\*\]\/\\\+/ig), r);
  });
  
  
});
