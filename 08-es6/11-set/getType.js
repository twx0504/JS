function getType(val) {
  const typeStr = Object.prototype.toString.call(val);
  // -1 excludes the last ].
  return typeStr.split(" ")[1].slice(0, -1).toLowerCase();
}

console.log(getType(1)); // number
console.log(getType([])); // array
console.log(getType({})); // object
console.log(getType(function () {})); // function
console.log(getType(undefined)); // undefined
console.log(getType(null)); // null
console.log(getType(NaN)); // number
