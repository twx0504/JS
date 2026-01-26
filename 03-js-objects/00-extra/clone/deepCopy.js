function deepCopy(obj, deep = true) {
  var res;
  if (Array.isArray(obj)) {
    res = [];
    if (deep) {
      for (var i = 0; i < obj.length; i++) {
        res.push(deepCopy(obj[i], deep));
      }
    } else {
      return obj.slice();
    }
  } else if (typeof obj === "object") {
    res = {};
    for (var k in obj) {
      if (deep) {
        res[k] = deepCopy(obj[k], deep);
      } else {
        res[k] = obj[k];
      }
    }
  } else {
    // if obj is primitive or functions
    return obj;
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
var newObj = deepCopy(obj, true);
console.log(newObj); // { a: 1, b: 2, c: { x: 1, y: 2, z: 3 } }
newObj.c.x = "I changed";

// obj & newObj is different object now!
console.log(obj, newObj); // { a: 1, b: 2, c: { x: 1, y: 2, z: 3 } } { a: 1, b: 2, c: { x: 'I changed', y: 2, z: 3 } }

console.log(newObj === obj); // false
console.log(newObj.c === obj.c); // false.
