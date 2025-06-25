// Implement template string functionality for regular string.

/* IMPLEMENTATION with FUNCTION CONSTRUCTOR */

function parseString(str, data) {
  //   const reg = /\${(.+?)}/g; // template string version - match ${x}
  const reg = /{{(.+?)}}/g; // Vue version - match {{x}}
  // 1. obtain keys
  const keys = Object.keys(data);
  // 2. obtain values
  const values = Object.values(data);
  str = str.replace(reg, function (_, p1) {
    return new Function(...keys, "return " + p1)(...values); // pass the values, instead of letting it access the values from global variable or maybe its ow nscope.
    /**
     * (function (name, age, arr){ // put prop of data as parameters
     *  return name; // age / arr[0] / etc
     * })(obj.name, obj.age, obj.arr)
     */
  });
  return str;
}
// console.log(parseString("Hi, I am ${name}, I am ${age} years old.", data));
