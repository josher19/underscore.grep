jQuery(document).ready(function() {

  module("is");

  test("contrib: isArray(_([1,2,3]))", function() {
     var second = function second(ra) { if ( _.isArray(ra) ) return ra[1]; else return "Not An Array"; }
     var ra = [1,2,3];
     same(second(ra), 2, "second element is 2");
     var wrapped_ra = _(ra);
     //same(second(wrapped_ra), 2, "second wrapped element is 2 ?");
     //same(second(wrapped_ra), "Not An Array", "second wrapped element is Not An Array ?");
     ok( wrapped_ra.isArray(), " _([1,2,3]).isArray() is true");
     ok( ! _.is(wrapped_ra, Array), " _.is(_([1,2,3]), Array) is false");
     ok( wrapped_ra.is(Array), " _([1,2,3]).is(Array) is true");
     ok( _.is(ra, Array), " is([1,2,3], Array) is true");
  });

  // Hack for IE 7 to find .constructor.name
function getFunc(func) { 
   var m=String(func).match(/function ([^(]*)/); 
   return m && m.length > 1 && m[1] || func /*.toString() */
}
 
// get name of a function
function getName(cons) { return cons.name || getFunc(cons) ; }

  // pretty print
  function pp(b) {
    var t = typeof b;
	var delim = [""];
	if (b == null) return b;
	if (t === "function") return getName(b);
	if (t === "string") return '&quot;' + b + '&quot;'
	if (b.constructor == Array) return '[' + _.map(b, pp) + ']';
	if (b.constructor == Object) return '{' + _.keys(b).join(" ") + '}';
	return b;
  }
  
  // _.isA(a,b) === expect 
  function expectClass(a,b,expect, msg) {
	return equals(expect,  _.is(a,b), (msg||"") + pp(a) + " isA " + pp(b));
  }
 
   test("contrib: is", function() {

   var unset, undef, ra = [];
   
   
   // CoffeeScript examples
var Animal, Horse, Snake, __a, __b, sam, tom;
Animal = function Animal() {
};
Animal.prototype.move = function move(meters) {
  return (this.name + " moved " + meters + "m.");
};
Snake = function Snake(name) {
  var __a;
  __a = this.name = name;
  return Snake === this.constructor ? this : __a;
};
__a = function(){};
__a.prototype = Animal.prototype;
Snake.__superClass__ = Animal.prototype;
Snake.prototype = new __a();
Snake.prototype.constructor = Snake;
Snake.prototype.move = function move() {
  return ("Slithering...") +
  Snake.__superClass__.move.call(this, 5);
};
Horse = function Horse(name) {
  var __b;
  __b = this.name = name;
  return Horse === this.constructor ? this : __b;
};
__b = function(){};
__b.prototype = Animal.prototype;
Horse.__superClass__ = Animal.prototype;
Horse.prototype = new __b();
Horse.prototype.constructor = Horse;
Horse.prototype.move = function move() {
  return ("Galloping...");
  return Horse.__superClass__.move.call(this, 45);
};
sam = new Snake("Sammy the Python");
tom = new Horse("Tommy the Palomino");
//sam.move();
//tom.move();
 
//Boa extends Snake;
 
var Boa = function Boa(name) {
  var __a;
  __a = this.name = name;
  return Boa === this.constructor ? this : __a;
};
__c = function(){};
__c.prototype = Snake.prototype;
Boa.__superClass__ = Snake.prototype;
Boa.prototype = new __c();
Boa.prototype.constructor = Boa;
Boa.prototype.move = function move() {
  return ("Sneaking...") +
  Boa.__superClass__.move.call(this, 5);
};
Animal.prototype.toString = function() { return this.name || this.constructor.name || "ANIMAL"; }
 
 
biggy = new Boa("Feather the Boa");
 
// anonymous functions could cause problems
var Anon = function() {};
var Anon2 = function(n) {this.name=n||"Anonymous"};
var Anon3 = function(n) {this.name=n||"Anonymous"};
var Anon4 = function Anon4(n) {this.name=n||"Anonymous"};
var nobody = new Anon();
var who = new Anon2();
 
testTypes = [true, false, 0, -123.4, "123", 'str', [], {},null,undefined, sam, tom, biggy, Anon, nobody, Anon2, who];
expectTypes = [Boolean, Boolean, Number, Number, String, String, Array, Object,null,undefined, Snake, Horse,  Boa, Function, Anon, Function, Anon2];

 
var tmap = testTypes;
if (!testTypes.map && self._) tmap = _(testTypes); // need underscore for map for IE
tmap.map(function(obj, i) { return expectClass(obj, expectTypes[i], true); });

equals(testTypes.length, expectTypes.length, "Equal Lengths" );
  
   
   "\nShould be false x9: "
 
// false
expectClass(unset, null, false)
expectClass(unset, false, false)
//expectClass(unset, 0, false)
expectClass("123", Number, false)
expectClass(123, String, false)
expectClass(["1","2","3"], String, false)
//expectClass(null, "undefined", false)
expectClass({length:4}, Array, false)
// expectClass(arguments, Array, false)
 
"\nShould be true x28: "
 

// javascript primitives and simple builtin classes
expectClass(true, Boolean, true,  "boolean ")
expectClass(false, Boolean, true,  "boolean ")
expectClass(0, Number, true, "number ")
expectClass(123, Number, true, "number ")
expectClass("123", String, true, "string ")
expectClass("", String, true, "string ")
expectClass([1,2,3], Array, true), 
expectClass({}, Object, true), 
expectClass(Math.PI, Number, true)
 
// typeof for primitives
//expectClass(true, "boolean", true)
//expectClass(false, "boolean", true)
//expectClass(0, "number", true)
//expectClass(123, "number", true)
//expectClass("123", "string", true)
//expectClass("", "string", true)
//expectClass({}, "object", true)
//expectClass([], "object", true)
 
 
// Null and undefined
//expectClass(null, "null", true)
expectClass(null, null, true)
//expectClass(undef, "undefined", true)
//expectClass(unset, "undefined", true)
expectClass(unset, undefined, true)
 
// Object almost always true (because of inheritance / instanceof)
expectClass(new Boolean(false), Object, true, "Boolean ")
expectClass(new Number(123.4), Object, true, "Number ")
expectClass(new String("123"), Object, true, "String ")
expectClass([1,2,3], Object, true)
//expectClass([1,2,3], "object", true)
//[].constructor !== Object
 
var msg = "Cast to primitive type: "
expectClass(Boolean(false), Object, false, msg)
expectClass(Boolean(false), Boolean, true, msg)
expectClass(Number(123.4), Object, false, msg)
expectClass(Number(123.4), Number, true, msg)
expectClass(String("123"), Object, false, msg)
expectClass(String("123"), String, true, msg)
 
 var msg = 'Primitives are not Objects: ' 
// Except for primitives:
expectClass(true, Object,  false, msg)
expectClass(false, Object, false, msg)
expectClass(123.4, Object, false, msg)
expectClass("123", Object, false, msg)
expectClass(new Number(123.4).toString(), Object, false, msg)
expectClass(new String("123").toString(), Object, false, msg)
// expectClass({}, "Objective", false)

expectClass(nobody, Anon2, false)
expectClass(who, Anon, false)
expectClass(nobody, "Anon", false) // can't match anonymous functions
expectClass(who, Anon4, false) // different constructor.name, so do not match
expectClass(who, Anon3, true) // Same if the constructor is the same
 
"\nAnonymous funcs can't be called by name x4:"
expectClass(Anon, Function, true)
expectClass(Anon, "function", false)
expectClass(nobody, Anon, true)
expectClass(who, Anon2, true)


"\nCheck if CoffeeScript Examples loaded: "
 
// True if CoffeeScript Examples are loaded
typeof sam != "undefined" && expectClass(sam, Snake, true) 
typeof sam != "undefined" && expectClass(sam, Animal, true)
typeof tom != "undefined" && expectClass(tom, Horse, true)
typeof tom != "undefined" && expectClass(tom, Animal, true)
typeof biggy != "undefined" && expectClass(biggy, Snake, true)
 
typeof biggy != "undefined" && expectClass(biggy, Animal, true), // biggy is an Animal Class
typeof biggy != "undefined" && expectClass(biggy, Boa, true), 
typeof biggy != "undefined" && expectClass(biggy, Snake, true), 
typeof biggy != "undefined" && expectClass(biggy, Object, true), 
//typeof biggy != "undefined" && expectClass(biggy, "Boa", true), 
typeof Boa != "undefined" && expectClass(Boa, Function, true), // Function
 
"\nFalse x5 if CoffeeScript Examples are loaded: "
 
typeof Boa != "undefined" && expectClass(Boa, Boa, false), // Function
typeof biggy != "undefined" && expectClass(biggy, "object", false), 
typeof biggy != "undefined" && expectClass(biggy, Horse, false), // biggy not a Horse
typeof tom != "undefined" && expectClass(tom, Snake, false), // tom not a Snake
//typeof biggy != "undefined" && expectClass(biggy, "Animal", false), // biggy not an "Animal"
expectClass(biggy, null, false)
expectClass(biggy, undef, false)
 
"\ngetTypes:"
/*
//testTypes.map && testTypes.map(getType)
//testTypes.map && testTypes.map( function(obj) { 
//   return isType(obj, getType(obj));
//})
 
// '\nComparing str="hello";'
// '\nstr instanceof String:'
// (str="hello", str instanceof String), 
// '\nisType(str, String):'
// isType(str, String)
 
//"hmmm"
//Boa.name
//biggy.constructor.name
//[].constructor.name
*/

 
"\nDONE!!" 


  });

  
  
});
