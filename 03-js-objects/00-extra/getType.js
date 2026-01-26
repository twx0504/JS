function getType(value) {
  // [object Object]
  var res = Object.prototype.toString.call(value);
  //   var start = res.indexOf(" ") + 1;
  return res.slice(8, res.length - 1).toLowerCase();
}

console.log(getType(1));

function Person() {
  this[Symbol.toStringTag] = "Person"; // define the return value of Object.prototype.toString.call() [object Person]
}

var p1 = new Person();
console.log(getType(p1));

console.log(p1.__proto__.constructor === Person); // true
// Since p1 can search for constructor from its prototype chain, we can write it as follow:
console.log(p1.constructor === Person); // true

// When constructor has been changed by someone:
Person.prototype.constructor = "I changed";
console.log(p1.constructor === Person); // false
console.log(p1.constructor === Person); // false
/* It is not safe. */



// Another case: When change the prototype of the constructor function before instantiating an object.
function F() {}
F.prototype = {};
var f1 = new F();
console.log(f1.constructor); // [Function: Object] refers to the Object constructor, not F()!
