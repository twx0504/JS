function shallowCopy(obj) {
  var res = {};
  for (var key in obj) {
    res[key] = obj[key];
  }
  return res;
}

var obj = {
  a: 1,
  b: 2,
  c: {
    x: 1,
    y: 2,
    z: 3,
  },
};

var newObj = shallowCopy(obj);
console.log(newObj); // { a: 1, b: 2, c: { x: 1, y: 2, z: 3 } }
newObj.c.x = "I changed";

// Note: Nested layers are not copied, they are still reference to the old one.
console.log(obj, newObj); // { a: 1, b: 2, c: { x: 'I changed', y: 2, z: 3 } } { a: 1, b: 2, c: { x: 'I changed', y: 2, z: 3 } }

console.log(newObj === obj); // false
console.log(newObj.c === obj.c); // true. newObj.c still holds the reference of obj.c.
