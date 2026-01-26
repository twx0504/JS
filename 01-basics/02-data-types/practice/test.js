/* 1.  */

console.log(parseInt("2.3" + "3.5")); // parseInt('2.33.5') -> 2
console.log(Boolean("false")); // true
console.log(0 / 0); // NaN
console.log(2 / 0); // Infinity

/* 2.  */

var a; // undefined
a = a + 1; // undefined + 1 -> NaN
console.log(a); // NaN

var age = prompt("Enter yoru age: ");
console.log(typeof age); // string
var msg = "Wei Xin is " + age + " years old.";
console.log(msg); // Wei Xin is 25 years old.

var obj = null;
console.log(typeof typeof obj); // typeof "object" -> "string"

console.log(NaN + true + "false"); // NaN + "false" -> "NaNfalse"
