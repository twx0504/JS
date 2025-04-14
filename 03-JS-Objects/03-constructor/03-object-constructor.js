// 1. if val is not passed or val is undefined / null, it returns an empty object.
console.log(new Object());
console.log(new Object(undefined));
console.log(new Object(null));

// 2. if val is primitive, it returns a wrapper object of that primitive.
console.log(new Object(1));
console.log(new Object(true));
console.log(new Object("string"));

// 3. if val is object already, it returns that object.
var obj = {};
var obj2 = new Object(obj);
console.log(obj === obj2); // true
