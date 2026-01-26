/**
 * Function.prototype.call(thisArgs, ...args)
 * Function.prototype.call(thisArgs, argsArr)
 *
 * thisArgs refers to this inside the function
 */

var arr1 = [1, 2, 3, 4, 5];
var arr2 = [5, 6, 7, 4, 3];

function sum() {
  var res = 0;
  for (var i = 0; i < this.length; i++) {
    res += this[i];
  }
  return res;
}

console.log(sum.call(arr1)); // 15
console.log(sum.call(arr2)); // 25

var obj = { a: 1, b: 2 };
function fn() {
  //   "use strict";
  console.log(this.a + this.b);
}

fn.call(obj); // 1 + 2 = 3 (obj.a + obj.b)
console.log(obj); // { a: 1, b: 2 } look the object doesn't have method fn.
var a = 20;
var b = 10;

// in non strict mode thisArgs as null / undefined refers to window object.
fn.call(null); // 30

function test() {
    // Non strict mode: primitive becomes object, undefined & null becomes window object in browser
  console.log(this); 
}

test.call(1); // Number
test.call(true); // Boolean
test.call(undefined); // window
test.call(null); // window
test.call([1, 2, 3]); // [1, 2, 3]

function test2() {
  "use strict"; // in strict mode, this is what it is.
  console.log(this);
}

test2.call(1); // 1
test2.call(true); // true
test2.call(undefined); // undefined
test2.call(null); // null
test2.call([1, 2, 3]); // [1, 2, 3]
