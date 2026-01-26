console.log(Object.prototype.toString.call(1)); // [object Number]
console.log(Object.prototype.toString.call(true)); //[object Boolean]
console.log(Object.prototype.toString.call({})); // [object Object]
console.log(Object.prototype.toString.call([])); // [object Array]
console.log(Object.prototype.toString.call(new Date())); // [object Date]
console.log(Object.prototype.toString.call(Math)); // [object Math]
console.log(Object.prototype.toString.call(new Function())); // [object Function]
console.log(Object.prototype.toString.call(new RegExp())); // [object RegExp]
console.log(Object.prototype.toString.call(new Map())); // [object Map]
console.log(Object.prototype.toString.call(new Set())); // [object Set]
console.log(Object.prototype.toString.call(Symbol())); // [object Symbol]

function Person() {}

var person = new Person();
console.log(Object.prototype.toString.call(person)); // [object Object]
