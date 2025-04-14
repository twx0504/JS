var obj = {
  a: 1,
  b: 2,
};

obj.__proto__.c = 3; // Enumerable properties when we define
console.log(obj.hasOwnProperty("a")); // true
console.log(obj.hasOwnProperty("c")); // false

for (var k in obj) {
  if (obj.hasOwnProperty(k)) {
    console.log(k);
  }
}
